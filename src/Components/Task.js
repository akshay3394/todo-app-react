import { Grid, makeStyles, Paper } from "@material-ui/core";
import { Delete, CheckCircle, RadioButtonUnchecked, StarOutlined, StarOutlineOutlined } from "@material-ui/icons";
import axios from "axios";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import {deleteTaskAcion, updateTaskAction} from "./Store/Actions/Actions"


const useStyle = makeStyles(()=>(
    {
        task: {
            background: "#1a2327",
            color: "#eceff1",
            padding: "10px",
            marginBottom: "2px"
        },
        
        completed: {
            textDecoration: "line-through",
            opacity: 0.7,
        },

        links:{
            color: "#eceff1",
            textDecoration:'none'
        }
    }
))


const Task = ({task})=>{
    
    const classes = useStyle();

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
        <Grid item xs={12}>
            <Paper elevation={3} square className={classes.task}>
                <Grid container>
                    <Grid item xs={1}>
                        {
                            (task.completed) ? <CheckCircle className={classes.completed} onClick={toggleTaskStatus}/> : <RadioButtonUnchecked  onClick={toggleTaskStatus}/>
                        }
                    </Grid>
                    <Grid item xs={7} className={`${task.completed ?classes.completed :""}`}>
                        <NavLink className={classes.links} to={`/${task.id}`} exact>
                            {task.title}
                        </NavLink>
                    </Grid>
                    <Grid item xs={3}  className={`${task.completed ?classes.completed :""}`}>
                        { Array(task.priority)
                            .fill(task.priority)
                            .map((value, index)=>{ 
                                return <StarOutlined key={index+1} onClick={()=>updatePriority(index+1)}/> 
                                }) 
                        }
                        
                        { Array(3-task.priority)
                            .fill(task.priority)
                            .map((value, index)=>{
                                 return <StarOutlineOutlined key={task.priority+index+1} onClick={()=>updatePriority(task.priority+index+1)}/>
                            })
                        }
                    </Grid>
                    <Grid item xs={1}>
                        <Delete onClick={deleteTask}/>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default Task;