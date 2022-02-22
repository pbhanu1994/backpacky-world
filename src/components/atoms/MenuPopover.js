import PropTypes from "prop-types";
import { Popover } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { alpha } from "@mui/material/styles";

const useStyles = makeStyles((theme) => ({
  arrow: {
    [theme.breakpoints.up("sm")]: {
      top: -7,
      zIndex: 1,
      width: 12,
      right: 20,
      height: 12,
      content: "''",
      position: "absolute",
      borderRadius: "0 0 4px 0",
      transform: "rotate(-135deg)",
      background: theme.palette.background.paper,
      borderRight: `1px solid ${alpha(theme.palette.grey[500], 0.12)}`,
      borderBottom: `1px solid ${alpha(theme.palette.grey[500], 0.12)}`,
    },
  },
}));

export const MenuPopover = ({ children, sx, ...other }) => {
  const classes = useStyles();

  return (
    <Popover
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      PaperProps={{
        sx: {
          mt: 1.5,
          ml: 0.5,
          overflow: "inherit",
          boxShadow: (theme) => theme.customShadows.z20,
          border: (theme) => `solid 1px ${theme.palette.grey[500_8]}`,
          width: 200,
          ...sx,
        },
      }}
      {...other}
    >
      {/* FIXME: Fix the arrow down */}
      <div className={classes.arrow}></div>

      {children}
    </Popover>
  );
};

MenuPopover.propTypes = {
  children: PropTypes.node.isRequired,
  sx: PropTypes.object,
};
