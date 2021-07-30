import { makeStyles } from "@material-ui/core/styles";

export const navbarStyles = makeStyles((theme) => ({
  root: {
    position: "sticky",
    top: 0,
    padding: "1rem",
    zIndex: 1,
  },
  logo: {
    paddingLeft: "2rem",
  },
  searchField: {
    display: "flex",
    alignItems: "center",
    padding: "0.5rem",
    borderRadius: 30,
    background: theme.palette.grey[500_8],
  },
  searchFieldInput: {
    paddingLeft: "0.5rem",
  },
  notificationAndAccount: {
    width: "10rem",
    display: "flex",
    justifyContent: "space-evenly",
  },
  profileListButton: {
    display: "flex",
    alignItems: "center",
    background: "none",
    cursor: "pointer",
    border: "1px solid rgba(0, 0, 0, 0.12)",
    borderRadius: 20,
  },
  profileAndNotificationList: {
    zIndex: 1,
    position: "fixed",
    right: 0,
    marginRight: "1.2rem",
    marginTop: "-0.5rem",
  },
}));
