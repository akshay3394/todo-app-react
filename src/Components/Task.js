import { Grid, makeStyles, Paper } from "@material-ui/core";
import { Delete, CheckCircle, RadioButtonUnchecked } from "@material-ui/icons";


const useStyle = makeStyles(()=>(
    {
        task: {
            background: "#455a64",
            color: "#eceff1",
            padding: "10px",
            marginBottom: "2px"
        },
        
        completed: {
            textDecoration: "line-through",
            opacity: 0.7,
        }
    }
))


const Task = ({taskId})=>{
    
    const classes = useStyle();
    
    return(
        <Grid item xs={12}>
            <Paper elevation={3} square className={classes.task}>
                <Grid container>
                    <Grid xs={1}>
                        {
                            (taskId%2==0) ? <CheckCircle className={classes.completed}/> : <RadioButtonUnchecked/>
                        }
                    </Grid>
                    <Grid xs={10} className={`${taskId%2==0 ?classes.completed :""}`}>
                        Task {taskId}
                    </Grid>
                    <Grid xs={1}>
                        <Delete/>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default Task;