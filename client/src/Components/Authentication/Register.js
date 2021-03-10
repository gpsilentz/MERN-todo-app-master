import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Link } from 'react-router-dom'

const API_URL = 'https://mern-todolist-app.herokuapp.com';

const Register = () => {
  const { register, errors, handleSubmit } = useForm();
  const [ msg, setMsg ] = useState('');

  const onSubmit = async(data) => {
    const fetchUser = await axios.post(`${API_URL}/users/save`, { username: data.username, password: data.password }); 

    if (fetchUser.data) {
      setMsg(fetchUser.data.message);
    }
  };

  return (
    <div className="d-flex justify-content-center mt-5 container">
      <div className="col-md-4 login-form text-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3>Register form</h3>
          { msg || '' }
          <input name="username" ref={register({ required: "Username is required" })} type="text" placeholder="Username" className={`form-control mt-3 ${errors.username ? "is-invalid" : ""}`} />
          <input name="password" ref={register({ required: "Password is required" })} type="password" placeholder="Password"className={`form-control mt-3 ${errors.password ? "is-invalid" : ""}`}/>
          <input className="btn btn-primary mt-3" type="submit" value="Register" />
          <hr />
        </form>
				<Link className="nav-link" to="/Authc">Alreay have an account? Sign In.</Link>
      </div>
    </div>
  )
}


export default Register
