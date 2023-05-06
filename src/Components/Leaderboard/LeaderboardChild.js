import React from "react";
import "../../css/common.css";
import "../../css/leaderboard.css";

const LeaderboardChild = ({leaderboard, place, user}) => {
    if (place <= 5){
        return (
            <div class="leaderboard">
                <div class="leaderboard-header"> 
                    <h1>Leaderboard</h1>
                    <div class="username-wins-label">
                        <h4 class="username-label">Username</h4>
                        <h4 class="wins-label">Wins</h4>
                    </div>
                </div>
                {leaderboard.length > 0 && (
                    <ol class="winners">
                      {leaderboard.map((leader) => (
                        <li key={leader.id}>
                            <p class="username">{leader.attributes['username']}</p>
                            <p class="wins">{leader.attributes['wins']}</p>
                        </li>
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
                    <div class="username-wins-label">
                        <h4 class="username-label">Username</h4>
                        <h4 class="wins-label">Wins</h4>
                    </div>
                </div>
                {leaderboard.length > 0 && (
                    <ol class="winners">
                      {leaderboard.map((leader) => (
                        <li key={leader.id}>
                            <p class="username">{leader.attributes['username']}</p>
                            <p class="wins">{leader.attributes['wins']}</p>
                        </li>
                    ))}
                    <li key={user.id}>
                        <p class="username">{user.attributes['username']}</p>
                        <p class="wins">{user.attributes['wins']}</p>
                    </li>
                    </ol>
                )}
            </div>
        )
    }
}

export default LeaderboardChild;