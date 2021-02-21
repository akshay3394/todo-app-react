import {AppBar, Typography, Toolbar, InputBase, Grid} from '@material-ui/core';
import {makeStyles, fade} from '@material-ui/core/styles'
import {Search, Check} from '@material-ui/icons';
import deepPurple from '@material-ui/core/colors/deepPurple'

const useStyle = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
            width: '20ch',
        },
        },
    },
    navbar:{
        background: "#37474f"
    } 
  }));
  

const NavBar = ()=>{

    const classes = useStyle();

    return(
        <div >
            <AppBar position="static" className={classes.navbar}>
                <Toolbar>
                    <Grid container>
                        <Grid item xs={6}>
                            <Typography variant="h6">
                                <Check/>
                                TO DO  
                            </Typography>
                        </Grid>
                        <Grid item xs={6} >
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <Search />
                                </div>
                                <InputBase
                                    placeholder="Search…"
                                    classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </div>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default NavBar;