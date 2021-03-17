import { useState } from 'react';
import { useContext } from "react";
import { userContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './loginManager';

// if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig);
// }
// else {
//     firebase.app();
// }

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignIn : false,
    name : '',
    email : '',
    password : '',
    photo : ''
  })

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
      handleGoogleSignIn()
      .then (res => {
        handleResponse(res, true);
      })
  }

  const fbSignIn = () => {
      handleFbSignIn()
      .then (res => {
        handleResponse(res, true);
      })
  }

  const signOut = () => {
      handleSignOut()
      .then (res => {
          handleResponse(res, false);
      })
  }

  const handleResponse = (res, redirect) => {
    setUser (res);
    setLoggedInUser(res);
    if (redirect) {
        history.replace(from);
    }
  }

  const handleBlur = (e) => {
    let isFieldValid = true;
    if (e.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      let newUserInfo = {...user};
      newUserInfo [e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }

  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then (res => {
        handleResponse(res, true);
      })
    }

    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password)
      .then (res => {
        handleResponse(res, true);
      })
    }
    e.preventDefault();
  }

  return (
    <div style = {{textAlign: "center"}}>
      {user.isSignIn ? <button onClick = {signOut}>sign out</button> : <button onClick = {googleSignIn}>sign in</button>}
      <br/>
      <button onClick = {fbSignIn}>sign in using facebook</button>
      {
        user.isSignIn && 
        <div>
          <h1>welcome, {user.name}</h1>
          <h3>your email is, {user.email}</h3>
          <h3>your photo: </h3>
          <img src={user.photo} alt=""/>
        </div>
      }

      <div>
        <h1>our own authentication</h1>
        <input type="checkbox" onChange={() => setNewUser(!newUser)} name="" id=""/>
        <label htmlFor="newUser">new user sign up</label>
        <form onSubmit={handleSubmit}>
          {newUser && <input onBlur={handleBlur} type="text" name="name" placeholder="enter your name" required/>}
          <br/>
          <input onBlur={handleBlur} type="text" name="email" placeholder="enter your email" required/>
          <br/>
          <input onBlur={handleBlur} type="password" name="password" placeholder="enter your password" required/>
          <br/>
          <input type="submit" value={newUser ? "sign up" : "sign in"}/>
        </form>
        <p style={{color: "red"}}>{user.error}</p>
        {
          user.success && <p style={{color: "green"}}>user {newUser ? 'created' : 'logged in'} successfully</p>
        }
      </div>
    </div>
  );
}

export default Login;
