import React, { useState, useLayoutEffect, useRef, useEffect } from 'react'
import axios from 'axios'

const API_URL = 'https://mern-todolist-app.herokuapp.com';

const FinishedTodos = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    let unmounted = false;
    const source = axios.CancelToken.source();

    (async() => {
      try {
        const token = await JSON.parse(localStorage.getItem('Todotoken'));
        const fetchTodos = await axios.get(`${API_URL}/todos/getcompleted`, { headers: { Authorization: token } });

        if (fetchTodos && !unmounted) {
          setTodos(fetchTodos.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    })();

    return () => {
      unmounted = true;
      source.cancel();
    }
  }, []);

  const handleDeleteClick = async(todoId) => {
    try {
      const token = await JSON.parse(localStorage.getItem('Todotoken'));

      const finishedTodo = await axios.post(`${API_URL}/todos/delete/${todoId}`, null, { headers: { Authorization: token, 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }});
      console.log(finishedTodo.data);

      let newTodos = todos.filter((todo) => todo._id !== todoId);
      
      setTodos(newTodos);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h4 className="card-title">Completed todos</h4>
      <div className="container-fluid tab-content mt-3">
        { isLoading ? 'Loading...' : todos.map((todo) => <div className="row" key={todo._id}><div className="col-10">{todo.name}</div><div className="col-2"><button className="btn btn-danger btn-delete" onClick={() => handleDeleteClick(todo._id)}>x</button></div><hr /></div>) }
      </div>
    </div>
  )
}

export default FinishedTodos
