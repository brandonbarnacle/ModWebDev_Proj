import Parse from "parse";
/* SERVICE FOR PARSE SERVER OPERATIONS */

// READ operation - get all lessons in Parse class Lesson
export const getAllUsers = () => {
  const User = Parse.Object.extend("User");
  const query = new Parse.Query(User);
  return query.find().then((results) => {
    // returns array of Lesson objects
    return results;
  });
};
