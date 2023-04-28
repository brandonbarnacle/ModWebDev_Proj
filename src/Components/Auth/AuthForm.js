import React from "react";
import '../../css/auth-form.css';

const AuthForm = ({ user, isLogin, onChange, onSubmit }) => {

  return (
    <form onSubmit={onSubmit} autoComplete="off" class="authform">
    {!isLogin ? 
    <div>
        <div className="form-group">
          <label>First Name</label>
          <br />
          <input
            type="text"
            className="form-control"
            id="first-name-input"
            value={user.firstName}
            onChange={onChange}
            name="firstName"
            placeholder="first name"
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <br />
          <input
            type="text"
            className="form-control"
            id="last-name-input"
            value={user.lastName}
            onChange={onChange}
            name="lastName"
            placeholder="last name"
            required
          />
        </div>
        <div className="form-group">
          <label>Username</label>
          <br />
          <input
            type="text"
            className="form-control"
            id="username-input"
            value={user.username}
            onChange={onChange}
            name="username"
            placeholder="username"
            required
          />
        </div>{" "}
        </div> : <></>}
        <div>
        <div className="form-group">
          <label>Email</label>
          <br />
          <input
            type="email"
            className="form-control"
            id="email-input"
            value={user.email}
            onChange={onChange}
            name="email"
            placeholder="email@email.com"
            required
          />
        </div>{" "}
        <div className="form-group">
          <label>Password</label>
          <br />
          <input
            type="password"
            className="form-control"
            id="password-input"
            value={user.password}
            onChange={onChange}
            name="password"
            min="0"
            required
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary" onSubmit={onSubmit}>
            Submit
          </button>
        </div>
    </div>
  </form>
  );
};

export default AuthForm;