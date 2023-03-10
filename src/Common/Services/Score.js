import Parse from "parse";
/* SERVICE FOR PARSE SERVER OPERATIONS */

// READ operation - get all games in Parse class Score
export const getAllScores = () => {
  const Score = Parse.Object.extend("Score");
  const query = new Parse.Query(Score);
  return query.find().then((results) => {
    // returns array of Score objects
    return results;
  });
};

// READ operation - get all scores which correspond to the game with the given default id value
export const getScoresByGame = (fk_game_id) => {
    const Game = Parse.Object.extend("Game");
    const query = new Parse.Query(Game);
    return query.get(fk_game_id).then((game) => {

        const Score = Parse.Object.extend("Score");
        const scoreQuery = new Parse.Query(Score);
        scoreQuery.equalTo("fk_game_id", game);
        return scoreQuery.find().then((results) => {
            // returns array of Score objects
            return results;
        });
    });
};

// READ operation - get all scores which correspond to the user with the given default id value
export const getScoresByUser = (fk_user_id) => {
  const User = Parse.Object.extend("User");
  const query = new Parse.Query(User);
  return query.get(fk_user_id).then((user) => {

      const Score = Parse.Object.extend("Score");
      const scoreQuery = new Parse.Query(Score);
      scoreQuery.equalTo("fk_user_id", user);
      return scoreQuery.find().then((results) => {
          // returns array of Score objects
          return results;
      });
  });
};

// READ operation - get the score with given default id value
export const getScoreById = (id) => {
  const Score = Parse.Object.extend("Score");
  const query = new Parse.Query(Score);
  return query.get(id).then((result) => {
    // returns one Score object
    return result;
  });
};