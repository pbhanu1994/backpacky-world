import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { CircularProgress, Typography, Box } from "@mui/material";
import signOutUser from "../src/store/actions/auth/signOutUser";
import { PAGE_PATH } from "../src/constants/navigationConstants";

// TODO: Check with an experienced developer if it's good to have logout screen -
// - maybe try to eliminate this screen later.
const Logout = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const handleSignOut = async () => {
      // Dispatch the SIGN_OUT action
      await dispatch(signOutUser());

      // Redirect to the landing page
      setTimeout(() => {
        router.push(PAGE_PATH.LANDING);
      }, 500);
    };

    handleSignOut();
  }, [dispatch]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        bgcolor: "background.paper",
      }}
    >
      <CircularProgress />
      <Typography variant="h6" sx={{ mt: 2 }}>
        Logging out
      </Typography>
    </Box>
  );
};

export default Logout;
