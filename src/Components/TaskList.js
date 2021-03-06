
import { Grid, makeStyles } from "@material-ui/core";
import Task from "./Task";
import TaskDetails from "./TaskDetails"
import store from "./Store/Store"
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Link, Switch, useParams } from "react-router-dom";


const useStyle = makeStyles(()=>(
    {
        taskList: {
            "padding-top": "10px"
        },
    }
))


const TaskList = ()=>{

    const classes = useStyle();
    
    const tasks = useSelector((state)=>{
        return state.taskList;
    })

    return(
        <Grid container className={classes.taskList}>
            <Router>
                <Switch>          
                    
                    <Route path="/:id">
                        <TaskDetails/>
                    </Route>      
                    
                    <Route path="/" >
                        {
                            tasks
                            .sort((task1,task2)=>(task1.creationTime>task2.creationTime? 1: -1))
                            .map( task=> (                         
                                    <Task key={task.id} task={task}/> 
                                )
                            )
                        }
                    </Route>
                </Switch>
            </Router>
        </Grid>
    )
}


export default TaskList;