import Parse from "parse";

// READ operation - get a matchup given an ID
export const getMatchUp = (objectIdArg) => {
    const Matchup = Parse.Object.extend("MatchUp");
    const query = new Parse.Query(Matchup);
    query.equalTo("objectId", objectIdArg);
    return query.find().then((results) => {
        // returns array of Game objects
        return results[0];
    });
};

// READ operation - find an active game with no player 2, otherwise create a new game
export const findAvailableMatchUp = (user) => {
    const Matchup = Parse.Object.extend("MatchUp");
    const query = new Parse.Query(Matchup);
    query._addCondition('activeGame', '$eq', false);
    query._addCondition('playerTwo', '$eq', null);
    return query.find().then((results) => {
        // If there is an available game
        if (results.length > 0)
        {
            results[0].set('playerTwo', user);
            return results[0].save()
            .then(()=>{
                return results[0];
            });
        }
        else
        {
            const newMatchup = new Parse.Object("MatchUp");
            newMatchup.set('playerOne', user);
            newMatchup.set('playerOnePos', 0);
            newMatchup.set('playerTwoPos', 0);
            newMatchup.set('activeGame', false);
            return newMatchup.save()
            .then(()=>{
                console.log(newMatchup);
                return newMatchup;
            });
        }
    });
}

export const setUpSubscription = (matchup) => {

    let client = new Parse.LiveQueryClient({
        applicationId: '2FgDITUa7Ud9aTfc2n9m3mKUNMMXp9juemjAp0Cq',
        serverURL: 'wss://feature6.b4a.io', 
        javascriptKey: 'OEZ1ViibPs3KVyj6TtqbDw7CvYfwF1Bjkiw3aAU9'
    });
    client.open();

    var query = new Parse.Query('Matchup');
    query.equalTo('objectId', matchup.id);

    console.log("in set up:", query);

    let subscription = client.subscribe(query);

    console.log(subscription);

    subscription.on('update', (object) => {
        console.log("Updated in Service!");
    });

    return subscription;
}

export const setPlayerOnePos = (matchup, score) => {
    matchup.set('playerOnePos', score);
    matchup.save();
}

export const setPlayerTwoPos = (matchup, score) => {
    matchup.set('playerTwoPos', score);
    matchup.save();
}

export const setWinner = (matchup, user) => {
    matchup.set('winner', user);
    matchup.save();
}

export const setActive = (matchup, val) => {
    matchup.set('activeGame', val);
    matchup.save();
}

export const testSub = (matchUpArg) => {
    var client = new Parse.LiveQueryClient({
        applicationId: '2FgDITUa7Ud9aTfc2n9m3mKUNMMXp9juemjAp0Cq',
        serverURL: 'wss://feature6.b4a.io', 
        javascriptKey: 'OEZ1ViibPs3KVyj6TtqbDw7CvYfwF1Bjkiw3aAU9'
      });
      client.open();
      
        var query = new Parse.Query('MatchUp');
        query.equalTo("objectId", matchUpArg.id);
        console.log("in the funciton: ", matchUpArg.id);
        console.log(matchUpArg);
        var newSubscriptions = client.subscribe(query);
      
        console.log(query);

        return newSubscriptions;
}