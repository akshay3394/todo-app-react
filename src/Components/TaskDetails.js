import DateFnsUtils from "@date-io/date-fns";
import { Grid, makeStyles, MenuItem, TextField } from "@material-ui/core";
import { NoteAddOutlined, RadioButtonUnchecked, StarOutlined, StarOutlineOutlined } from "@material-ui/icons";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { deleteTaskAcion, updateTaskAction } from "./Store/Actions/Actions";


const useStyle = makeStyles(()=>(
    {
        task: {
            background: "#1a2327",
            color: "#eceff1",
            padding: "20px",
            marginBottom: "2px"
        },
        
        completed: {
            textDecoration: "line-through",
            opacity: 0.7,
        }
    }
))

const TaskDetails = ()=>{
    const classes = useStyle();

    const {id} = useParams()

    const taskList = useSelector(state=>state.taskList)
    const task = taskList.filter(task=>id==task.id)[0]
 
    const [title, setTitle] = useState(task.title)
    const [note, setNote] = useState(task.note)
    const [priority, setPriority] = useState(task.priority)
    const [dueDate, setDueDate] = useState(task.dueDate)
    const [completed, setCompleted] = useState(task.completed)

    const priorityHandler = (event)=>{
        setPriority(event.target.value)
    }

    const onChangeTitile = (event)=>{
        setTitle(event.target.value)
    }

    const onChangeNote = (event)=>{
        setNote(event.target.value)
    }

    const handleDateChange = (date)=>{
        setDueDate((new Date(date).getTime()))    
    }

    const handleCompletedChange = ()=>{
        setCompleted(!completed)    
    }

    
    const actionDispatcher = useDispatch()

    const deleteTask = ()=>{
        axios.delete("http://localhost:8090/tasks/"+task.id)
            .then(respose=>{
                const deleteAction = deleteTaskAcion(task.id)
                actionDispatcher(deleteAction)
            })
            .catch(err=>{
               console.error(err) 
            })
    }
    
    const toggleTaskStatus = ()=>{
        let updateTask = {
            ...task,
            completed:!task.completed
        }

        axios.put("http://localhost:8090/tasks/"+task.id, updateTask)
            .then(response=>response.data)
            .then(updatedTaskResponse=>{
                const updateAction = updateTaskAction(updatedTaskResponse)
                actionDispatcher(updateAction)
            })
            .catch(err=>{
                console.log(err);
            })
    }

    const updatePriority = (newPriority)=>{

        if(task.completed)
            return

        let updateTask = {
            ...task,
            priority:newPriority
        }

        axios.put("http://localhost:8090/tasks/"+task.id, updateTask)
            .then(response=>response.data)
            .then(updatedTaskResponse=>{
                const updateAction = updateTaskAction(updatedTaskResponse)
                actionDispatcher(updateAction)
            })
            .catch(err=>{
                console.log(err);
            })
    }



    return(
        <Grid container spacing={2} className={classes.task}>
            <Grid container spacing={1} alignItems="flex-end" >
                <Grid item xs={1}>
                    <RadioButtonUnchecked/>
                </Grid>
                <Grid item xs={11}>
                    <TextField fullWidth autoFocus margin="dense" id="title" label="Title" fullWidth value={title} onChange={onChangeTitile}/>
                </Grid>
            </Grid>

            <Grid container spacing={1} alignItems="flex-end">
                <Grid item xs={4}>
                    { 
                        console.log(priority)
                    }
                    
                    {
                    Array(priority)
                        .fill(priority)
                        .map((value, index)=>{ 
                            return <StarOutlined key={index+1} onClick={()=>updatePriority(index+1)}/> 
                            }) 
                    }
                    
                    { Array(3-priority)
                        .fill(priority)
                        .map((value, index)=>{
                                return <StarOutlineOutlined key={priority+index+1} onClick={()=>updatePriority(priority+index+1)}/>
                        })
                    }
                </Grid>
            </Grid>

            <Grid container >
                <Grid item>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            error={false}
                            margin="normal"
                            id="due-date"
                            label="Due date"
                            format="MM/dd/yyyy"
                            value={dueDate}
                            onChange={handleDateChange}
                            helperText=""
                            KeyboardButtonProps={{
                            'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
            </Grid>   

            <Grid container spacing={1} alignItems="flex-end">
                <Grid item xs={1}>
                    <NoteAddOutlined/>
                </Grid>
                <Grid item xs={11}>
                    <TextField margin="dense" id="note" label="Note" fullWidth value={note} onChange={onChangeNote}/>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default TaskDetails;
