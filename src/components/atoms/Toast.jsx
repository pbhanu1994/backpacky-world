import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Alert, Slide, Snackbar } from "@mui/material";
import withPortal from "../../hoc/withPortal";
import closeToast from "../../store/actions/config/toast/closeToast";

function MuiAlert(props) {
  return <Alert elevation={6} variant="filled" {...props} />;
}

// TODO: Try to put the Toast in App.js (ask the experienced dev about that if that's a good approach)
const Toast = () => {
  const { toast } = useSelector((state) => state.config);
  const dispatch = useDispatch();

  // On Toast Close
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(closeToast());
  };

  return (
    //TODO: I think using Portal is unnecessary for Toast - Check with the experienced dev
    <Snackbar
      open={toast.open}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <div>
        <MuiAlert onClose={handleClose} severity={toast.color}>
          {toast.message}
        </MuiAlert>
      </div>
    </Snackbar>
  );
};

export default withPortal(Toast);
