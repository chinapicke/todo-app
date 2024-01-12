import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

const ToDoRow = ({ todo, checked, handleDelete, handleChecked }) => {
  return (
    <div className='todoRowContainer'>
      <input
        className='todoCheckbox '
        type='checkbox'
        value={checked}
        onClick={handleChecked} />
      <h1 className={`todoTitle ${checked ? 'linethrough':''}`}>{todo}</h1>

      <button onClick={handleDelete} className='deleteBtn'>
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
    </div>
  )
}

export default ToDoRow