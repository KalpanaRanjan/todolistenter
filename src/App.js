import './App.css';
import {useEffect, useState} from 'react';
import { MdDelete } from "react-icons/md";
import { CiSquareCheck } from "react-icons/ci";

function App() {
  const[iscomplete, setIsComplete] = useState(false);
  const[isDeletedView, setIsDeletedView] = useState(false);
  const[allTodoList, setAllTodoList] = useState([]);
  const[newTask, setTask] = useState('');
  const[completedList, setCompletedList] = useState([]);
  const[deletedList, setDeletedList] = useState([]);  // New state for deleted tasks
  
  const handleAddTodoTask = () => {
    if (newTask.trim() === '') {
      alert('task cannot be empty');
      return;
    }
    let newTodoTask = { task: newTask };
    let updatedTodoTaskArr = [...allTodoList];
    updatedTodoTaskArr.push(newTodoTask);
    setAllTodoList(updatedTodoTaskArr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoTaskArr));
    setTask('');
  };

  const handleDeleteList = (index) => {
    let taskToDelete = allTodoList[index];  // Task to be moved to deletedList
    let updatedTodoList = [...allTodoList];
    updatedTodoList.splice(index, 1);
    setAllTodoList(updatedTodoList);
    
    let updatedDeletedList = [...deletedList, taskToDelete];
    setDeletedList(updatedDeletedList);
    
    localStorage.setItem('todolist', JSON.stringify(updatedTodoList));
    localStorage.setItem('deletedTodoList', JSON.stringify(updatedDeletedList));
  };

  const handleComplete = (index) => {
    let newCompletedList = { ...allTodoList[index] };
    let updatedCompletedArr = [...completedList];
    updatedCompletedArr.push(newCompletedList);
    setCompletedList(updatedCompletedArr);
    // handleDeleteList(index);  // Moves the task to deletedList
    let updatedTodoLists = [...allTodoList];
    updatedTodoLists.splice(index, 1);
    setAllTodoList(updatedTodoLists);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoLists))
    localStorage.setItem('completedTodoList', JSON.stringify(updatedCompletedArr));
  };

  const handleClearCompleted = () => {
    setCompletedList([]);
    localStorage.setItem('completedTodoList', JSON.stringify([]));
  };

  const handleDeleteCompletedList = (index) => {
    let completedeleteTodoArr = [...completedList];
    completedeleteTodoArr.splice(index, 1);
    setCompletedList(completedeleteTodoArr);
    localStorage.setItem('completedTodoList', JSON.stringify(completedeleteTodoArr));
  };

  const handleDeleteStoreList = (index) =>{
    let deleteStoreList = [...deletedList];
    deleteStoreList.splice(index);
    setDeletedList(deleteStoreList);
    localStorage.setItem('deletedTodoList', JSON.stringify(deleteStoreList));
  }
  useEffect(() => {
    let todos = JSON.parse(localStorage.getItem('todolist'));
    let completedTodo = JSON.parse(localStorage.getItem('completedTodoList'));
    let deletedTodos = JSON.parse(localStorage.getItem('deletedTodoList'));  // Load deleted tasks
    if (todos) {
      setAllTodoList(todos);
    }
    if (completedTodo) {
      setCompletedList(completedTodo);
    }
    if (deletedTodos) {
      setDeletedList(deletedTodos);
    }
  }, []);

  return (
    <div className="app">
      <h1 style={{color: 'black'}}>My ToDo List</h1>
      <div className="todolist-wrapper">
        <div className="todolist-input">
          <div className="todolist-input-item">
            <label htmlFor="title">Task</label>
            <input type="text" value={newTask} onChange={(e) => setTask(e.target.value)} placeholder="Enter your Task" />
          </div>
          <div className="todolist-input-item">
            <button type="button" onClick={handleAddTodoTask} className="primaryBtn">Add Task</button>
          </div>
        </div>

        <div className="todo-btn-area">
          <button className={`secondery-btn ${iscomplete === false && isDeletedView === false && 'active'}`} onClick={() => { setIsComplete(false); setIsDeletedView(false); }}>All Todo</button>
          <button className={`secondery-btn ${iscomplete === true && 'active'}`} onClick={() => { setIsComplete(true); setIsDeletedView(false); }}>Completed</button>
          <button className={`secondery-btn ${isDeletedView === true && 'active'}`} onClick={() => { setIsComplete(false); setIsDeletedView(true); }}>Deleted</button>  {/* New button for Deleted List */}
        </div>

        <div className="task-counter">
          Total Tasks: {allTodoList.length} | Completed Tasks: {completedList.length} | Deleted Tasks: {deletedList.length}
        </div>

        <div className="todo-list">
          {iscomplete === false && isDeletedView === false && allTodoList.map((item, index) => {
            return (
              <div className="todolist-item" key={index}>
                <div>
                  <p>{item.task}</p>
                </div>
                <div>
                  <CiSquareCheck onClick={() => handleComplete(index)} className='check-icon' />
                  <MdDelete onClick={() => handleDeleteList(index)} className='del-icon' />
                </div>
              </div>
            );
          })}

          {iscomplete === true && completedList.map((item, index) => {
            return (
              <div className="todolist-item" key={index}>
                <div>
                  <p>{item.task}</p>
                </div>
                <div>
                  <MdDelete onClick={() => handleDeleteCompletedList(index)} className='del-icon' />
                </div>
              </div>
            );
          })}

          {isDeletedView === true && deletedList.map((item, index) => {
            return (
              <div className="todolist-item" key={index}>
                <div>
                  <p>{item.task}</p>
                </div>
                <div>
                  <MdDelete onClick={() => handleDeleteStoreList(index)} className='del-icon' />
                </div>
              </div>
            );
          })}
        </div>

        {iscomplete === true && completedList.length > 0 && (
          <button onClick={handleClearCompleted} className='clear-completed-btn'>Clear Completed</button>
        )}
      </div>
    </div>
  );
}

export default App;
