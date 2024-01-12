import './App.css';
import { useState, useEffect } from 'react';
import ToDoRow from './ToDoRow';
import axios from 'axios';
import APIrequest from './APIrequest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarPlus } from '@fortawesome/free-regular-svg-icons';

function App() {

  const [input, setInput] = useState('')
  const [list, setList] = useState([])
  const [error, setError] = useState(null)
  const [todoLeft, setTodoLeft] = useState(null)



  const APIUrl = 'http://localhost:3500/list'

  const getURL = async () => {
    try {
      const response = await axios.get(APIUrl);
      // if (!response.ok) {throw Error('Did not recieve expected data');         
      const data = await response.data;
      setList(data)
      setError(null)
    }
    catch (err) {
      setError(err.message)
    }

  }

  useEffect(() => {
    getURL();
  }, [])

  const checkArray = []

  const checkLeft = () => {
    list.map((item) => {
      if (!item.checked) {
        checkArray.push(item)
      }
      return checkArray
    })
    setTodoLeft(checkArray.length)
  }

  useEffect(() => {
    checkLeft();
    console.log(checkArray)
  })
  const handleChange = (e) => {
    setInput(e);
  }

  const handleAddTodo = async (input) => {
    // check if there is length to list item, if there is then set it to a number next in the succession or define it as 1 
    const newID = list.length + 1
    console.log(newID)
    const id = list.length ? newID.toString() : "1";
    const newTodo = { id, todo: input, checked: false }
    console.log(newTodo)
    setList([...list, newTodo])


    // post request allows to create a new request by adding new data to the json file  
    const postOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTodo)
    }

    const result = await APIrequest(APIUrl, postOptions)
    if (result) setError(result)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // stops users for inputting no data
    if (input === '') {
      return setInput('')
    }
    handleAddTodo(input);
  }

  const handleDelete = async (id) => {
    const removeSelected = list.filter((task) => {
      return task.id !== id
    })
    setList(removeSelected)

    const deleteOptions = {
      method: 'DELETE',
    }
    // this identifys which id row has to be deleted
    const requestURL = `${APIUrl}/${id}`;
    const result = await APIrequest(requestURL, deleteOptions)
    if (result) setError(result)
  }


  const handleChecked = async (id) => {
    // map through list items and checked that item.id matches the id that was clicked, if it does match change key value checked to the opposite of what it currently is; 
    // if it does not match, return item as it is
    const checked = list.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
    setList(checked);

    const updatedObj = checked.filter((item) => item.id === id);

    // had to change id numbers in json to string as json-server does not take in non-strings 

    const updateOptionsRequest = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ checked: updatedObj[0].checked })
    };
    console.log(updateOptionsRequest)
    const requestURL = `${APIUrl}/${id}`;
    const result = await APIrequest(requestURL, updateOptionsRequest);
    if (result) setError(result);


  }





  return (
    <div className="App">
      <header>
        <h1 className='appTitle'>To Do App</h1>
      </header>
      <div className='todoContainer'>
        <div className='addToInput'>
          <form onSubmit={(e) => handleSubmit(e)} className='todoForm'>
            <input
              name='toDoInput'
              placeholder='Enter your new task'
              className='todoInput'
              value={input}
              onChange={(e) => handleChange(e.target.value)}
            />
            <button
              className='btnAddToDo'
            // do not need to add onClick function to the button as a button on a form does this already 
            >
              <FontAwesomeIcon icon={faCalendarPlus} />
            </button>
          </form>
        </div>
        <div className='listOfTodos'>
          {!list.length && !error ? <h1 className='emptyList'>Your list is empty.</h1> : null}
          {error && <h2>Error:{`${error}`}</h2>}
          {list.map((item) => {
            return (
              <ToDoRow key={item.id} todo={item.todo} checked={item.checked} handleDelete={() => handleDelete(item.id)} handleChecked={() => handleChecked(item.id)} />
            )
          })
          }
        </div>
        <div>
          {todoLeft !== 0 ? <h3 className='tasksLeft'>You have {todoLeft} pending tasks.</h3> : null}
        </div>
      </div>
    </div>
  );
}

export default App;
