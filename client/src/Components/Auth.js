import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = 'https://mern-todolist-app.herokuapp.com';

const Auth = () => {
  const username = useRef(null);
  const password = useRef(null);

  const [isSignedIn, setSignedIn] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    let unmounted = false;

    (async() => {
      try {
        const token = localStorage.getItem('Todotoken');

        if (token && !unmounted) {
          setSignedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    })();

    return () => { 
      unmounted = true;
    };
  }, []);
  
  const signAction = async() => {
    const fetchUser = await axios.post(`${API_URL}/users/auth`, { username: username.current.value, password: password.current.value }); 

    if (fetchUser.data) {
      setMsg(fetchUser.data.message);

      if (fetchUser.data.success) {
        localStorage.setItem('Todotoken', JSON.stringify(fetchUser.data.user.token));
        setSignedIn(true);
      }
    }
  };

  const registerAction = async() => {
    const registerUser = await axios.post(`${API_URL}/users/save`, { username: username.current.value, password: password.current.value }); 

    if (registerUser.data) {
      setMsg(registerUser.data.message);
    }
  };

  const handleSignOut = () => {
    setSignedIn(false);
    localStorage.removeItem('Todotoken');
  };

  return (
    <div>
      <h6 className="text-center">{msg}</h6>
      {isSignedIn ? 
      <div className="text-center">
        <h4 className="card-title">Already logged in</h4>
        <button className="btn btn-sm btn-danger" onClick={() => handleSignOut()}>Sign out</button>
      </div> : 
      <div>
        <h4 className="card-title text-center">Sign in/Register</h4>
        <div className="sign-in-form tab-content mt-3 text-center">
          <input type="text" className="sign-in-form-input form-control" ref={username} placeholder="Username" />
          <input type="password" className="sign-in-form-input form-control" ref={password} placeholder="Password" />
          <button className="btn btn-success sign-in-form-button" onClick={() => signAction()}>Sign in</button>
          <button className="btn btn-success sign-in-form-button" onClick={() => registerAction()}>Register</button>
        </div>
      </div>}
    </div>
  )
}

export default Auth
