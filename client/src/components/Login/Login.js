import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classes from './Login.module.css';
import logo from '../layout/WASPClogo3FullSize.png';


async function loginUser(credentials) {
  let result = await fetch('http://localhost:3001/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  }).then(data => data.json());
  if (result.message === 'error') {
    alert("Incorrect Username/Password");
  }
  return result;
}



export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [passwordShown, setPasswordShown] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await loginUser({
      username,
      password
    });
    sessionStorage.setItem('user_id', JSON.stringify(response.user_id));
    setToken({ token: response.token });
  }

  const showPassword = () => {
    console.log("show")
    setPasswordShown(!passwordShown);
  }

  return (
    <section>
      <div className={classes.centered}>
        <form onSubmit={handleSubmit} className={classes.loginGrid}>
          <div className={classes.span8}>
            <img src={logo} alt="WASPC logo" height="100%" width="100%" />
          </div>
          <div className={classes.span4}>
            <label htmlFor="username">Username: </label>
            <br></br>
            <input className={classes.maxWidth} type="text" id="username" name="username" onChange={e => setUserName(e.target.value)} />
          </div>
          <div className={classes.span4}>
            <label htmlFor="password">Password: </label>
            <br></br>
            <input className={classes.maxWidth} type={passwordShown ? "text" : "password"} id="password" name="password" onChange={e => setPassword(e.target.value)} />
            <input className={classes.checkmark} type="checkbox" id="showPassword" name="showPassword" value="showPassword" onClick={showPassword} /><label>Show Password</label>
          </div>
          <div className={classes.span4}>
            <input className={classes.submitbutton} type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </section>
  )
}


Login.propTypes = {
  setToken: PropTypes.func.isRequired
}
