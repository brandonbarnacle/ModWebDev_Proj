import React from "react";

/* STATELESS CHILD COMPONENT */
const MainForm = ({ users }) => {
  console.log("in child");
  console.log(users);
  return (
    <div>
      <hr />
      This is the main form child component.
      <div>
        {users.length > 0 && (
          <ul>
            {users.map((user) => (
                <li key={user.id}>{user.attributes['username']}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MainForm;
