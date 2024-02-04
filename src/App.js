
import './App.css';
import { useState, useEffect } from 'react'


function App() {
  const MOCK_API_URL = 'https://65bbef7f52189914b5bd5dd3.mockapi.io/user'


  const [users, setUsers] = useState([{}])


const [newTaskName, setNewTaskName] = useState('')
const [newTaskDate, setnewTaskDate] = useState('') 
const [newTaskDeadline, setnewTaskDeadline] = useState('') 
const [newTaskActivity, setnewTaskActivity] = useState('')
const [newTaskDescription, setnewTaskDescription] = useState('')

const [updatedTaskName, setupdatedTaskName] = useState('')
const [updatedTaskDate, setupdatedTaskDate] = useState('')
const [updatedTaskDeadline, setupdatedTaskDeadline] = useState('')
const [updatedTaskActivity, setupdatedTaskActivity] = useState('')
const [updatedTaskDescription, setupdatedTaskDescription] =useState('')

function getUsers(){
  fetch(MOCK_API_URL)
  .then(data => data.json())
  .then(data => setUsers(data))
}

useEffect (() => {
  getUsers()
  console.log(users)
}, [])

function deleteUser(id){
  fetch(`${MOCK_API_URL}/${id}`, {
    method: 'DELETE'
  }).then(() => getUsers())
}

function postNewUser(e){
  e.preventDefault()

  fetch(MOCK_API_URL, {
    method: 'POST',
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify({
      name: newTaskName,
      date: newTaskDate,
      deadline: newTaskDeadline,
      activity: newTaskActivity,
      description: newTaskDescription,
    })
  }).then(() => getUsers())
}

function updateUser(e, userObject){
  e.preventDefault()

  let updatedUserObject = {
   ...userObject,
   
    name: updatedTaskName,
    date: updatedTaskDate,
    deadline: updatedTaskDeadline,
    activity: updatedTaskActivity,
    description: updatedTaskDescription,
     
  }

  fetch(`${MOCK_API_URL}/${userObject.id}`, {
    method: 'PUT',
    body: JSON.stringify(updatedUserObject),
    headers: { "Content-Type": "application/json" }
  }).then(() => getUsers())
}


return (
  <div className="App">

    <form className='userHead'>
      <h3 className='userTitle'> ☺☻☺ Task Master ☺☻☺ </h3>
      <label className='userName'>Task Name</label>
      <input className='inputName' onChange={(e) => setNewTaskName(e.target.value)} placeholder='Enter New Task Name'></input>

      <label className='userDate'>Task Date</label>
      <input className='inputDate' onChange={(e) => setnewTaskDate(e.target.value)} placeholder='Enter New Task Date'></input>

      <label className='userDeadline'>Task Deadline</label>
      <input className='inputDeadline' onChange={(e) => setnewTaskDeadline(e.target.value)} placeholder='Enter New Task Deadline'></input>

      <label className='userActivity'>Task Activity</label>
      <input className='inputActivity' onChange={(e) => setnewTaskActivity(e.target.value)} placeholder='Enter New Task Activity'></input>

      <label className='userDescription'>Task Description</label>
      <input className='inputDescription' onChange={(e) => setnewTaskDescription(e.target.value)} placeholder='Enter New Task Description'></input>
      <button className='logBtn' onClick={(e) => postNewUser(e)}>Log</button>
    </form>
{users.map((user, index) => (
  <div className='userContainer' key={index}>
    <div className='taskUsers'>
      Task Name: {user.name}<br></br>
      Task Date: {user.date}<br></br>
      Task Deadline: {user.deadline}<br></br>
      Task Activity: {user.activity}<br></br>
      Task Description: {user.description}<br></br>
      <button className='deletebtn' onClick={() => deleteUser(user.id)}>  🗑  </button>
    </div>
    <form>
      <h3>Update Task Info</h3>
      <label className='updTName'>Update Task Name</label>
      <input onChange={(e) => setupdatedTaskName(e.target.value)} placeholder='Updated Task Name'></input><br></br>

      <label className='updTDate'>Update Task Date</label>
      <input onChange={(e) => setupdatedTaskDate(e.target.value)} placeholder='Updated Task Date'></input><br></br>

      <label className='updTDeadline'>Update Task Deadline</label>
      <input onChange={(e) => setupdatedTaskDeadline(e.target.value)} placeholder='Updated Task Deadline'></input><br></br>

      <label className='updTActivity'>Update Task Activity</label>
      <input onChange={(e) => setupdatedTaskActivity(e.target.value)} placeholder='Updated Task Activity'></input><br></br>

      <label className='updTDescription'>Update Task Description</label>
      <input onChange={(e) => setupdatedTaskDescription(e.target.value)} placeholder='Updated Task Description'></input><br></br>
      <button className='updUBtn' onClick={(e) => updateUser(e, user)}>Update</button>
    </form>
  </div>
    ))}
</div>
  )
}

export default App;