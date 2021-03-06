import {Fab, makeStyles} from '@material-ui/core';
import Add from '@material-ui/icons/Add'
import {useState} from 'react'
import React from 'react'
import AddNewTask from './AddNewTask';


const useStyle = makeStyles(theme=>({
    fab: {
        bottom: "10px",
        right: "10px",
        zIndex: "100",
        backgroundColor: "#607d8b",
        position: "fixed"
    
      }
}))


const AddIcon = ({taskList, setTaskList})=>{

    const [open, setOpen] = useState(false)
    
    const openAddNewTask = ()=>{
        setOpen(true)
    }

    const classes = useStyle();

    return(
        <div>
            <Fab aria-label="add" className={classes.fab}>
                <Add onClick={openAddNewTask}/>
            </Fab>
            <AddNewTask open={open} setOpen={setOpen} taskList={taskList} setTaskList={setTaskList}/>
        </div>
    )
}

export default AddIcon;