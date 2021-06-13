import { makeStyles } from "@material-ui/core/styles";

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
      backgroundColor: theme.palette.primary.extraLight,
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
    backgroundColor: `${theme.palette.primary.extraLight} !important`,
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
