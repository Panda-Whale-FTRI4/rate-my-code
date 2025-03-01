import React, { useState, useRef } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import classes from './LogInContainer.module.css';

export default function LogInContainer() {
  const [verified, setVerified] = useState(false);
  const [signedup, setSignedup] = useState(false);

  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  function login() {
    const enteredUsername = usernameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const user = {
      username: enteredUsername,
      password: enteredPassword,
    };

    console.log('About to fetch in loginContainer:', user);
    // make fetch request to check login data
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data) {
          setVerified(true);
        }
      })
      .catch((err) => console.log('POST REQUEST ERROR: ', err));
  }

  function signup() {
    const enteredUsername = usernameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const user = {
      username: enteredUsername,
      password: enteredPassword,
    };

    // make fetch request to send new user data
    fetch('/login/createUser', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data) {
          setSignedup(true);
        }
      })
      .catch((err) => console.log('POST REQUEST ERROR: ', err));
  }

  //redirect if login is verified or successfully signedup

  if (verified || signedup) {
    return (
      <Redirect
        to={{
          pathname: '/home',
        }}
      />
    );
  }
//Stretch feature to possibly add a guest link to home page. If user wants to make a post, redirect to sign up
      //  <header>
      //     TEMP NAV BAR: <br />
      //     <Link to="/home">Home</Link>
      //   </header>

  return (
    <Container className={classes.mainContainer}>
      <h1>Rate-My-Code</h1>   
      <Container className={classes.insideContainer}>
        {/* temp bar to delete after development */}
        <h2>Login Page</h2>
        <form>
          <div className={classes.inputContainer}>
            <label htmlFor="username">Username </label>
            <input
              type="text"
              required
              id="username"
              ref={usernameInputRef}
            ></input>
          </div>
          <div className={classes.inputContainer}>
            <label htmlFor="password">Password </label>
            <input
              type="password"
              required
              id="password"
              ref={passwordInputRef}
            ></input>
          </div>
          <div className={classes.buttonContainer}>
            <Button variant="contained" onClick={login}>
              Login
            </Button>
          </div>
          <div className={classes.buttonContainer}>
            <Button variant="outlined" onClick={signup}>
              Signup
            </Button>
          </div>
        </form>
      </Container>
    </Container>
  );
}
