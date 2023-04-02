import PropTypes from "prop-types";
import { Popover } from "@mui/material";
import { styled } from "@mui/system";
import { alpha } from "@mui/material/styles";

const Arrow = styled("div")(
  ({ theme }) => `
    [${theme.breakpoints.up("sm")}]: {
      top: -7;
      z-index: 1;
      width: 12;
      right: 20;
      height: 12;
      content: "''";
      position: "absolute";
      border-radius: "0 0 4px 0";
      transform: "rotate(-135deg)";
      background: ${theme.palette.background.paper};
      border-right: "1px solid ${alpha(theme.palette.grey[500], 0.12)}";
      borderBottom: "1px solid ${alpha(theme.palette.grey[500], 0.12)}";
    },
`
);

export const MenuPopover = ({ children, sx, ...other }) => {
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
      <Arrow></Arrow>

      {children}
    </Popover>
  );
};

MenuPopover.propTypes = {
  children: PropTypes.node.isRequired,
  sx: PropTypes.object,
};
