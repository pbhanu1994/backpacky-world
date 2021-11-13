import { makeStyles } from "@mui/styles";
import { alpha } from "@mui/material/styles";

export const sidebarStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "90vh",
    position: "fixed",
    maxWidth: 260,
    [theme.breakpoints.down("sm")]: {
      maxWidth: 90,
    },
    padding: "1rem",
    backgroundColor: theme.palette.background.paper,
    borderRight: `1px solid ${theme.palette.divider}`,
    borderRadius: 20,
    marginLeft: "1rem",
  },
  settings: {
    marginTop: "auto",
  },
  item: {
    marginBottom: "1rem",
    marginTop: ({ item }) => {
      return item === "/logout" && "1rem";
    },
    "&:hover": {
      backgroundColor: alpha(
        theme.palette.primary.main,
        theme.palette.action.selectedOpacity
      ),
      borderRadius: 20,
      color: theme.palette.primary.main,
    },
    "&:hover $icon": {
      color: theme.palette.primary.main,
    },
  },
  selected: {
    borderRadius: 20,
    color: theme.palette.primary.main,
    backgroundColor: `${alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity
    )} !important`,
  },
  icon: {
    color: ({ active }) => {
      return active ? theme.palette.primary.main : "";
    },
  },
  text: {
    fontWeight: 900,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));
