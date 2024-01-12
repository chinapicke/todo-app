import './App.css';
import { useState } from 'react';
import ToDoRow from './ToDoRow';
import List from './Data/List.json'

function App() {

  const [input, setInput] = useState('')
  const [list, setList] = useState([...List])

  const handleChange=(e)=>{
    setInput(e);
  }

  const handleAddTodo = (input) =>{
        // check if there is length to list item, if there is then set it to a number next in the succession or define it as 1 
    const id = list.length? list[list.length - 1].id + 1 : 1;
    const newTodo = {id, todo:input, checked:false}
    setList([...list, newTodo])
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
