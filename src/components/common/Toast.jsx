import React, { useState } from 'react';
import {
    Snackbar,
    Slide
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}


export default function Toast({ toastColor, toastMessage }) {
    const [open, setOpen] = useState(true);
    // const [transition, setTransition] = useState(undefined);
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };

    return (<Snackbar open={open} autoHideDuration={6000} TransitionComponent={TransitionUp} key="" onClose={handleClose}>
        <Alert onClose={handleClose} severity={toastColor}>
          {toastMessage}
        </Alert>
      </Snackbar>);
}