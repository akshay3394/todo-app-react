
import { Grid, makeStyles, Paper } from "@material-ui/core";
import Task from "./Task";

const useStyle = makeStyles(()=>(
    {
        taskList: {
            "padding-top": "10px"
        },
    }
))


const TaskList = ()=>{

    const classes = useStyle();

    return(
        <Grid container className={classes.taskList}>
          
            { 
                [1,2,3,7,8,9,].map( t=> ( <Task taskId={t}/> )
                ) 
            } 
        </Grid>
    )
}

export default TaskList;