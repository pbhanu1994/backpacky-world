import React, { useState } from 'react';
import {
    Snackbar
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Toast({ toastOpen, toastColor, toastMessage, onHandleClose }) {
    return (<Snackbar open={toastOpen} autoHideDuration={5000} onClose={onHandleClose}>
        <Alert onClose={onHandleClose} severity={toastColor}>
          {toastMessage}
        </Alert>
      </Snackbar>);
}