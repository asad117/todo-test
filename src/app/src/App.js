import React from 'react';
import './App.css';
import { useState,useEffect} from 'react';

// import logo from './logo.svg';



export function App() {
  const[todo, setTodo] = useState();
  const [data, setData] = useState();

  
  useEffect(()=>{
    getData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const getData =()=>{
    fetch("http://localhost:8000/todos/")
    .then(res =>res.json())
    .then((data=> setData(data))
    )
  }

  const submitHandler = async (event)=>{
    event.preventDefault()
    let data = {todo}
    const url = "http://localhost:8000/todos/"
    const result = await fetch(url,{
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json"
       },
      body: JSON.stringify(data),
    })
    setTodo("")
    getData()
  }


  return (
    <div className="App">
      <div>
        <h1>List of TODOs </h1>
        {data? data.map(item=> <li>{item}</li> ):null}
      </div>
      <div>
        <h1>Create a ToDo</h1>
        <form onSubmit = {(event)=>submitHandler(event)}>
          <div>
            <label for="todo">ToDo: </label>
            <input  name="todo" id="todo" value={todo} onChange={(e)=>(setTodo(e.target.value))} type="text" />
          </div>
          <div style={{"marginTop": "5px"}}>
            <button  type= "submit">Add ToDo!</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
