import React from "react";
import "../../css/common.css";
import "../../css/leaderboard.css";

const LeaderboardChild = ({leaderboard, place, user}) => {
    if (place <= 5){
        return (
            <div class="leaderboard">
                <div class="leaderboard-header"> 
                    <h1>Leaderboard</h1>
                    <h4>Rank Name Wins</h4>
                </div>
                {leaderboard.length > 0 && (
                    <ol class="winners">
                      {leaderboard.map((leader) => (
                        <li key={leader.id}>{leader.attributes['username']} {leader.attributes['wins']}</li>
                    ))}
                    </ol>
                )}
            </div>
        )
    }
    else {
        return (
            <div class="leaderboard">
                <div class="leaderboard-header"> 
                    <h1>Leaderboard</h1>
                    <h4>Rank Name Wins</h4>
                </div>
                {leaderboard.length > 0 && (
                    <ol class="winners">
                      {leaderboard.map((leader) => (
                        <li key={leader.id}>{leader.attributes['username']} {leader.attributes['wins']}</li>
                    ))}
                    </ol>
                )}
                <p class="winners">Your Place</p>
                {user && (
                    <p class="winners">{place}. {user.attributes['username']} {user.attributes['wins']}</p>
                )}
            </div>
        )
    }
}

export default LeaderboardChild;