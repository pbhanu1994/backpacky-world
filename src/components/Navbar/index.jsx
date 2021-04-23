import React from 'react';
import { Paper, Grid, IconButton, Avatar, TextField } from '@material-ui/core';
import { NotificationsOutlined as NotificationsIcon, Search as SearchIcon } from '@material-ui/icons';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: "1rem"
    },
    logo: {
        paddingLeft: "2rem"
    },
    searchField: {
        display: "flex",
        alignItems: "center",
    },
    searchFieldInput: {
        paddingLeft: "0.5rem"
    },
    notificationAndAccount: {
        width: "10rem",
        display: "flex",
        justifyContent: "space-evenly"
    }
}));

export default function Navbar() {
    const classes = useStyles();

    return (
        <Paper variant="outlined" classes={{ root: classes.root }}> 
            <Grid container direction="row" justify="space-between" alignItems="center"         >

      <Grid item classes={{ item: classes.logo }}><img style={{width: "12rem"}} src="https://travelbook.com/assets/travelbook_frontend/shared/logo-a99994a55cb026557285c2fb1a673f02fc3cccb45a8333d8f64dae8900d38bcd.png" alt="Logo" /></Grid>
      <Grid item classes={{ item: classes.searchField}}><SearchIcon /><TextField className={classes.searchFieldInput} placeholder="Search.." /></Grid>
      <Grid item classes={{ item: classes.notificationAndAccount }}>
           <IconButton aria-label="search" color="inherit">
                <NotificationsIcon />
            </IconButton>
            <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
      </Grid>

</Grid>
        </Paper>
    )
}
