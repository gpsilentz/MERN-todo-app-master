import React, { useState, useLayoutEffect, useRef } from 'react'
import axios from 'axios'

const API_URL = 'https://mern-todolist-app.herokuapp.com';

const Todos = () => {
  const todo_name = useRef('');
  const todo_description = useRef('');

  const [todos, setTodos] = useState([]);
  const [formAdd, setFormAdd] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    let unmounted = false;
    const source = axios.CancelToken.source();

    (async() => {
      try {
        const token = await JSON.parse(localStorage.getItem('Todotoken'));
        const fetchTodos = await axios.get(`${API_URL}/todos/get`, { headers: { Authorization: token }});
        
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

  const handleCheckbox = async(todoId) => {
    try {
      const token = await JSON.parse(localStorage.getItem('Todotoken'));

      const finishedTodo = await axios.post(`${API_URL}/todos/set/${todoId}`, null, { headers: { Authorization: token, 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }});
      console.log(finishedTodo.data);

      let newTodos = todos.filter((todo) => todo._id !== todoId);

      setTodos(newTodos);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddTodo = async() => {
    try {
      const token = await JSON.parse(localStorage.getItem('Todotoken'));
      const todo = await axios.post(`${API_URL}/todos/save`, { name: todo_name.current.value, description: todo_description.current.value }, { headers: { Authorization: token, 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }});

      if (todo && todo.data.success) {
        let newTodos = [...todos];
      
        newTodos.push({
          _id: Math.random(),
          name: todo_name.current.value,
          description: todo_description.current.value
        });

        setTodos(newTodos);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h4 className="card-title"><button className="btn btn-success btn-sm" onClick={() => setFormAdd(!formAdd)}>+</button> Current todos</h4>
 
      { formAdd ? 
        <div>
          <input type="text" className="form-control mb-2" ref={todo_name} placeholder="Todo name" />
          <input type="description" className="form-control mb-2" ref={todo_description} placeholder="Todo description" />
          <button className="btn btn-success text-center" onClick={() => handleAddTodo()}>Save todo</button>
        </div> : '' }

      <div className="container-fluid tab-content mt-3">
        { isLoading ? 'Loading...' : todos && todos.map((todo) => <div className="row" key={todo._id}><div className="col-10">{todo.name}</div><div className="col-2"><input type="checkbox" className="todo-checkbox" onChange={() => handleCheckbox(todo._id)} /></div><hr /></div>) }
      </div>
    </div>
  )
}

export default Todos
