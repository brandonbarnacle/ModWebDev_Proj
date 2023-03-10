import Parse from "parse";
/* SERVICE FOR PARSE SERVER OPERATIONS */

// READ operation - get all games in Parse class Game
export const getAllGames = () => {
  const Game = Parse.Object.extend("Game");
  const query = new Parse.Query(Game);
  return query.find().then((results) => {
    // returns array of Game objects
    return results;
  });
};

// READ operation - get the game with user-set game_id
export const getGame = (game_id) => {
  const Game = Parse.Object.extend("Game");
  const query = new Parse.Query(Game);
  query.equalTo("game_id", game_id);
  return query.find().then((results) => {
    // returns one Game object
    return results[0];
  });
};

// READ operation - get the game with default id value
export const getGameById = (id) => {
  const Game = Parse.Object.extend("Game");
  const query = new Parse.Query(Game);
  return query.get(id).then((result) => {
    // returns one Game objects
    return result;
  });
};