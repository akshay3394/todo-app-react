import './App.css';
import NavBar from './Components/NavBar'
import TaskList from './Components/TaskList'
import AddIcon from './Components/AddIcon'
import {useState, useEffect} from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import {addAllTaskAction} from './Components/Store/Actions/Actions'

function App() {

  const addAllTasks = useDispatch()

  function fetchTask(){
    axios.get('http://localhost:8090/tasks/')
      .then(response=>response.data)
      .then(allTasks => {
        console.log("fetching taskl list from server");
        addAllTasks(addAllTaskAction(allTasks));
      });

  }

  useEffect(() => {
    fetchTask()
  }, [])

  return (
      <div>
        <NavBar/>
        <TaskList/>
        <AddIcon/>
      </div>
  );
}

export default App;
