import Parse from "parse";
import React, {useEffect, useState} from "react";
import LeaderboardChild from "./LeaderboardChild";

const Leaderboard = () => {

    // set variables to see if current user is on leader board
    var currentUser = Parse.User.current();

    // variables to pass down
    const [winners, setWinners] = useState([]);
    const [user, setUser] = useState();
    const [place, setPlace] = useState();

    // search
    useEffect(() => {
        // get all users
        var query = new Parse.Query("User");

        query.descending("wins").find().then((results) => {
            // leaderboard players
            var leaderboard = [];

            for(var iter = 0; iter < results.length; iter++){
                if (iter < 5){
                    if (leaderboard.length < 5){
                        leaderboard.push(results[iter]);
                    }
                }
                if (currentUser.getUsername() === results[iter].get('username')){
                    setPlace(iter+1);
                    setUser(results[iter]);
                }
            }
            setWinners(leaderboard);
        }); 
    }, [currentUser]);

    return (
        <LeaderboardChild leaderboard={winners} place={place} user={user}/>
    );

    
}

export default Leaderboard;