import './App.css';
import { useState, useEffect } from 'react';
import ToDoRow from './ToDoRow';
import axios from 'axios';
import APIrequest from './APIrequest';

function App() {

  const [input, setInput] = useState('')
  const [list, setList] = useState([])
  const [error, setError]= useState(null)

  const APIUrl = 'http://localhost:3500/list'

  const getURL = async()=>{
    try{
      const response = await axios.get(APIUrl);
      // if (!response.ok) {throw Error('Did not recieve expected data');         
      const data = await response.data;
      setList(data)
      setError(null)
    }
    catch(err){
      setError(err.message)
    }

  }

  useEffect(()=>{
getURL()
  },[])

  const handleChange=(e)=>{
    setInput(e);
  }

  const handleAddTodo = async (input) =>{
        // check if there is length to list item, if there is then set it to a number next in the succession or define it as 1 
    const id = list.length? list[list.length - 1].id + 1 : 1;
    const newTodo = {id, todo:input, checked:false}
    console.log(newTodo)
    setList([...list, newTodo])

    const postOptions= {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(newTodo)
    }

    const result = await APIrequest(APIUrl, postOptions)
    if (result) setError(result)
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    // stops users for inputting no data
    if(input === ''){
      return setInput('')
    }
    handleAddTodo(input);
  }

  const handleDelete = (id) =>{
   const removeSelected = list.filter((task)=>{
    return task.id !== id
   })
   setList(removeSelected)
  }

  const handleChecked = (id)=>{
    // map through list items and checked that item.id matches the id that was clicked, if it does match change key value checked to the opposite of what it currently is; 
    // if it does not match, return item as it is
    const checked = list.map((item)=> item.id === id ? {...item, checked:!item.checked} :{...item})
    console.log(checked)
    setList(checked)
  }

  return (
    <div className="App">
      <header>
      <h1>To Do App</h1>
      </header>
      <div className='addToInput'>
        <form onSubmit={(e)=>handleSubmit(e)}>
        <input 
        name='toDoInput'
        placeholder='Enter a todo'
        className='todoInput'
        value={input}
        onChange={(e)=>handleChange(e.target.value)}
        />
        <button
        className='btnAddToDo'
        // do not need to add onClick function to the button as a button on a form does this already 
        >+</button>
        </form>
      </div>
      <div className='listOfTodos'>
        {!list.length && !error ? <h1>Your list is empty.</h1>:null}
        {error && <h1>Error:{`${error}`}</h1>}
        {list.map((item)=>{
          return(
            <ToDoRow key={item.id}todo={item.todo} checked={item.checked} handleDelete={()=>handleDelete(item.id)} handleChecked={()=>handleChecked(item.id)}/>
          )
        })
        }
      </div>
    </div>
  );
}

export default App;
