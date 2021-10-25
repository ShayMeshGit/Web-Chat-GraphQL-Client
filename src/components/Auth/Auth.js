import React from "react";

import { useState, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";

//components
import Chat from "../Chat";
import Login from "../Login";
import Signup from "../Signup";
import ErrorHandler from "../ErrorHandler";

const SIGNUP_MUTATION = gql`
  mutation Signup($email: String!, $username: String!, $password: String!) {
    signup(
      SignupInput: { email: $email, username: $username, password: $password }
    ) {
      _id
      email
      username
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(LoginInput: { email: $email, password: $password }) {
      token
      userId
    }
  }
`;

const Auth = (props) => {
  const history = useHistory();
  const [isAuth, setIsAuth] = useState(false);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);

  const [signup, { loading: signupLoading }] = useMutation(SIGNUP_MUTATION, {
    ignoreResults: true,
  });
  const [login, { loading: loginLoading }] = useMutation(LOGIN_MUTATION, {
    errorPolicy: "all",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expiryDate = localStorage.getItem("expiryDate");

    if (token && expiryDate) {
      if (new Date(expiryDate) <= new Date()) {
        logoutHandler();
      } else {
        const userId = localStorage.userId;
        const remainingMilliseconds =
          new Date(expiryDate).getTime() - new Date().getTime();
        setIsAuth(true);
        setToken(token);
        setUserId(userId);
        autoLogoutHandler(remainingMilliseconds);
      }
    }
  }, []);

  const onLoginSubmit = async (event, authData) => {
    event.preventDefault();
    const { email, password } = authData;
    try {
      const { data } = await login({
        variables: {
          email,
          password,
        },
      });
      const { token, userId } = data.login;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      setToken(token);
      setUserId(userId);
      setIsAuth(true);
      const remainingMilliseconds = 60 * 60 * 1000;
      const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
      localStorage.setItem("expiryDate", expiryDate.toISOString());

      autoLogoutHandler(remainingMilliseconds);
    } catch (error) {
      setError(error);
    }
  };

  const onSignupSubmit = async (event, authData) => {
    event.preventDefault();
    const { email, username, password } = authData;
    try {
      await signup({
        variables: {
          email,
          username,
          password,
        },
      });
      history.push("login");
    } catch (error) {
      setError(error);
    }
  };

  const onErrorHandler = () => {
    setError(null);
  };

  const logoutHandler = () => {
    setIsAuth(false);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expiryDate");
  };

  const autoLogoutHandler = (remainingMilliseconds) => {
    return setTimeout(() => {
      logoutHandler();
    }, remainingMilliseconds);
  };

  const routes = isAuth ? (
    <Switch>
      <Route path="/chat">
        <Chat token={token} userId={userId} />
      </Route>
      <Redirect to="/chat" />
    </Switch>
  ) : (
    <Switch>
      <Route exact path="/signup">
        <Signup disabled={signupLoading} onSignupSubmit={onSignupSubmit} />
      </Route>
      <Route path="/">
        <Login disabled={loginLoading} onLoginSubmit={onLoginSubmit} />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
  return (
    <React.Fragment>
      <ErrorHandler error={error} onHandle={onErrorHandler} />
      {routes}
    </React.Fragment>
  );
};

export default Auth;
