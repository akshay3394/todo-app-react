import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, makeStyles, TextField, MenuItem, Grid} from '@material-ui/core';
import {RadioButtonUnchecked, NoteAddOutlined, FlagOutlined, StarOutlined} from '@material-ui/icons';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers'
import Slide from '@material-ui/core/Slide';
import React from 'react'
import {useState} from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {addTaskAction} from './Store/Actions/Actions'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const AddNewTask = ({open, setOpen})=>{
 
    const handleCloseAddNewTask = ()=>{
        setOpen(false)
    }

    const priorities = [3,2,1]

    const [title, setTitle] = useState("")
    const [note, setNote] = useState("")
    const [priority, setPriority] = useState(3)
    const [dueDate, setDueDate] = useState("")
    
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

    const dispactAction = useDispatch()    

    const afterAddTask = (newTask)=>{
        
        dispactAction(addTaskAction(newTask))

        setTitle("")
        setNote("")
        setPriority(1)
        setDueDate("")
    }

    const addNewTaskHandler = ()=>{

        if(title == "")
            return

        let newTask = {
            id: Math.floor(Math.random() * 10000),
            title:title,
            note:note,
            priority:priority,
            subtasks:[],
            completed:false,
            dueDate:dueDate
        }

        axios.post("http://localhost:8090/tasks/",newTask)
            .then(response=>response.data)
            .then(taskData=>{
               afterAddTask(taskData)
            })

    }


    return (
        <Dialog open={open} onClose={handleCloseAddNewTask} aria-labelledby="form-dialog-title" TransitionComponent={Transition}>
            <DialogTitle id="form-dialog-title">Add new task</DialogTitle>
            <DialogContent>
                <Grid container spacing={1} alignItems="flex-end" >
                    <Grid item xs={1}>
                        <RadioButtonUnchecked/>
                    </Grid>
                    <Grid item xs={11}>
                        <TextField fullWidth autoFocus margin="dense" id="title" label="Title" fullWidth value={title} onChange={onChangeTitile}/>
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

                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item xs={4}>
                        <Grid item>
                            <TextField
                                id="priority"
                                select
                                value={priority}
                                onChange={priorityHandler}
                                margin="normal"
                                fullWidth
                                >
                                {priorities.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        { Array(option).fill(option).map((value, index)=>{ return <StarOutlined key={option+index}/> }) }
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>

                    <Grid item xs={8}>
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
                </Grid>                

            </DialogContent>
            <DialogActions>
                <Button onClick={addNewTaskHandler} color="primary">
                    Add
                </Button>
                <Button onClick={handleCloseAddNewTask} color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddNewTask