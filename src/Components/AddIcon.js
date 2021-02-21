import { Fab, makeStyles } from '@material-ui/core';
import Add from '@material-ui/icons/Add'

const useStyle = makeStyles(theme=>({
    fab: {
        bottom: "10px",
        right: "10px",
        zIndex: "100",
        backgroundColor: "#607d8b",
        position: "fixed"
    
      }
}))


const AddIcon = ()=>{

    const classes = useStyle();

    return(
        <Fab aria-label="add" className={classes.fab}>
            <Add/>
      </Fab>
    )
}

export default AddIcon;