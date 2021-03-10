import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'

const API_URL = 'https://mern-todolist-app.herokuapp.com';

const Authc = () => {
  const { register, errors, handleSubmit } = useForm();
  const [ msg, setMsg ] = useState('');

  const onSubmit = async(data) => {
    const fetchUser = await axios.post(`${API_URL}/users/auth`, { username: data.username, password: data.password }); 

    if (fetchUser.data) {
      setMsg(fetchUser.data.message);
      if (fetchUser.data.success) {
        localStorage.setItem('Todotoken', JSON.stringify(fetchUser.data.user.token));
      }
    }
  };

  return (
    <>
    {localStorage.getItem('Todotoken') && <Redirect to="/dashboard/todos/currentTodos" />}
    <div className="d-flex justify-content-center mt-5 container">
      <div className="col-md-4 login-form text-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3>Sign in form</h3>
          { msg || '' }
          <input name="username" ref={register({ required: "Username is required" })} type="text" placeholder="Username" className={`form-control mt-3 ${errors.username ? "is-invalid" : ""}`} />
          <input name="password" ref={register({ required: "Password is required" })} type="password" placeholder="Password"className={`form-control mt-3 ${errors.password ? "is-invalid" : ""}`}/>
          <input className="btn btn-primary mt-3" type="submit" value="Sign in" />
          <hr />
          <p>Test credentials</p> 
					<p>username: 123123123123</p> 
					<p>password: 123123123123</p>
        </form>
        <Link className="nav-link" to="/Register">Dont have account yet? Register.</Link>
      </div>
    </div>
    </>
  )
}

export default Authc
