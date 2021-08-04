import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import withPortal from "../../hoc/withPortal";
import setAndShowToastMessage from "../../store/actions/config/setAndShowToastMessage";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// TODO: Try to put the Toast in App.js (ask the experienced dev about that if that's a good approach)
export const Toast = () => {
  const { toast } = useSelector((state) => state.config);
  const dispatch = useDispatch();

  // On Toast Close
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setAndShowToastMessage(false));
  };

  return (
    //TODO: I think using Portal is unnecessary for Toast - Check with the experienced dev
    <Snackbar open={toast.open} autoHideDuration={5000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={toast.color}>
        {toast.message}
      </Alert>
    </Snackbar>
  );
};

export default withPortal(Toast);
