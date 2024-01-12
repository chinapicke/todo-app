import React from 'react'

const ToDoRow = ({todo, checked, handleDelete, handleChecked}) => {
  return (
    <div className='todoRowContainer'>
       <h1 className='todoTitle'>{todo}</h1>
       <input 
       className='todoCheckbox '
       type='checkbox'
       value={checked}
       onClick={handleChecked}/>
       <button onClick={handleDelete}>Trash</button>
    </div>
  )
}

export default ToDoRow