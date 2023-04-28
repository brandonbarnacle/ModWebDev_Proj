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

// READ operation - find an active game with no player 2
export const findAvailableMatchUp = (user) => {
    const Matchup = Parse.Object.extend("MatchUp");
    const query = new Parse.Query(Matchup);
    query._addCondition('activeGame', '$eq', false);
    query._addCondition('playerTwo', '$eq', null);
    return query.find().then((results) => {
        // If there is an available game
        if (results.length > 0)
        {
            console.log("I'm dumb!");
            results[0].set('playerTwo', user);
            results[0].save();
            return results[0];
        }
        else
        {
            const newMatchup = new Parse.Object("MatchUp");
            console.log('user: ' + user);
            newMatchup.set('playerOne', user);
            newMatchup.set('playerOnePos', 0);
            newMatchup.set('playerTwoPos', 0);
            newMatchup.set('activeGame', false);
            newMatchup.save();
            return results[0];
        }
    });
}