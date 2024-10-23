import './App.css';
import {useEffect, useState} from 'react'
import { MdDelete } from "react-icons/md";
import { CiSquareCheck } from "react-icons/ci";


function App() {
  const[iscomplete, setIsComplete]= useState(false);
  const[allTodoList, setAllTodoList]= useState([]);
  const[newTask, setTask] = useState([]);
  const[completedList, setCompletedList]= useState([]);
  
  const handleAddTodoTask = () =>{
    if(newTask.trim() === '')
    {
      alert('task cannot be empty')
      return;
    }
    let newTodoTask = {
        task:newTask
    }
    let updatedTodoTaskArr= [...allTodoList];
    updatedTodoTaskArr.push(newTodoTask);
    setAllTodoList(updatedTodoTaskArr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoTaskArr));
    setTask('');
  };

  

  const handleDeleteList = (index) =>{
    let deleteTodoArr = [...allTodoList];
    deleteTodoArr.splice(index);
    setAllTodoList(deleteTodoArr);
    localStorage.setItem('todolist', JSON.stringify(deleteTodoArr));
  };

  const handleComplete= index => {
    let newCompletedList = {
      ...allTodoList[index]
    }  
    let updateCompletedArr= [...completedList];
    updateCompletedArr.push(newCompletedList);
    setCompletedList(updateCompletedArr);
    handleDeleteList(index)
    localStorage.setItem('completedTodoList', JSON.stringify(updateCompletedArr));
}
 const handleClearCompleted = () =>{
     setCompletedList([]);
     localStorage.setItem('completedTodoList', JSON.stringify([]));
  }
  const handleDeleteCompletedList= (index)=>{
    let completedeleteTodoArr = [...completedList];
    completedeleteTodoArr.splice(index);
    setCompletedList(completedeleteTodoArr);
    localStorage.setItem('completedTodoList', JSON.stringify(completedeleteTodoArr));
  }
  useEffect(()=>{
    let todos= JSON.parse(localStorage.getItem('todolist'));
    let completedTodo = JSON.parse(localStorage.getItem('completedTodoList'))
    if(todos){
      setAllTodoList(todos);
    }
    if(completedTodo){
      setCompletedList(completedTodo);
    }
  },[])

  return (
    <div className="app">
     <h1 style={{color:'black'}}>My ToDo List</h1>
     <div className="todolist-wrapper">
        <div className="todolist-input">
          <div className="todolist-input-item">
            <label htmlFor="title">Task</label>
            <input type="text" value={newTask} onChange={(e) => setTask(e.target.value)} placeholder="Enter your Text" />
          </div>
          <div className="todolist-input-item">
            <button type="button" onClick={handleAddTodoTask} className="primaryBtn">Add Title</button>
          </div>
        </div>
        <div className="todo-btn-area">
          <button className={`secondery-btn ${iscomplete=== false && 'active'}`} onClick={()=> setIsComplete(false)}>All Todo</button>
          <button className={`secondery-btn ${iscomplete=== true && 'active'}`} onClick={()=> setIsComplete(true)}>Completed</button>
        </div>
        <div className="task-counter">
        Total Tasks: {allTodoList.length} |
        Completed Tasks: {completedList.length}
      </div>
        <div className="todo-list">
          {
            iscomplete===false && allTodoList.map((item, index)=>{
              
              return(
                <div className="todolist-item " key={index}>
                  <div>  
                    <p>{item.task}</p>
                  </div>
                  <div>
                    <CiSquareCheck onClick={()=>handleComplete(index)} className='check-icon' />
                    <MdDelete onClick={()=>handleDeleteList(index)} className='del-icon'/>
                  </div>
                </div>
              )
            })
          }
          {
            iscomplete===true && completedList.map((item, index)=>{
              return(
                <div className="todolist-item" key={index}>
                  <div>
                    
                    <p>{item.task}</p>
                  </div>
                  <div>                    
                    <MdDelete onClick={()=>handleDeleteCompletedList(index)} className='del-icon'/>
                  </div>
                </div>
              )
            })
          }
        </div>
        {
          iscomplete===true && completedList.length > 0 && (
            <button onClick={handleClearCompleted} className='clear-completed-btn'>clear Completed</button>
          )
        }
     </div>
    </div>
  );
}

export default App;
