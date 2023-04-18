import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useTheme } from "@mui/material/styles";
import NextLink from "next/link";
import { alpha, styled } from "@mui/material/styles";
import {
  Box,
  Stack,
  Avatar,
  Drawer,
  Tooltip,
  Typography,
  CardActionArea,
} from "@mui/material";
import { Icon } from "@iconify/react";
import chevronLeftFill from "@iconify/icons-eva/chevron-left-fill";
import chevronRightFill from "@iconify/icons-eva/chevron-right-fill";
import useCollapseDrawer from "../../../hooks/useCollapseDrawer";
import Scrollbar from "../../atoms/Scrollbar";
import NavSection from "../../atoms/NavSection";
import { MHidden } from "../../@material-extend";
import sidebarConfig from "./SidebarConfig";

const DRAWER_WIDTH = 280;
const COLLAPSE_WIDTH = 102;

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    flexShrink: 0,
    transition: theme.transitions.create("width", {
      duration: theme.transitions.duration.complex,
    }),
  },
}));

const AccountStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[500_12],
}));

IconCollapse.propTypes = {
  onToggleCollapse: PropTypes.func,
  collapseClick: PropTypes.bool,
};

function IconCollapse({
  onToggleCollapse,
  isCollapse,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) {
  const theme = useTheme();
  return (
    <Tooltip
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <CardActionArea
        onClick={onToggleCollapse}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxSizing: "border-box",
          width: "unset",
          WebkitTapHighlightColor: "transparent",
          outline: 0,
          margin: 0,
          cursor: "pointer",
          borderRadius: "50%",
          overflow: "visible",
          color: theme.palette.grey[600],
          transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          fontSize: "1.125rem",
          padding: "4px",
          top: "32px",
          position: "fixed",
          zIndex: 1101,
          left: isCollapse ? "88px" : "265px",
          border: `1px solid ${theme.palette.grey[500_24]}`,
          backdropFilter: "blur(6px)",
          backgroundColor: "#fff",
        }}
      >
        {isCollapse ? (
          <Icon icon={chevronRightFill} />
        ) : (
          <Icon icon={chevronLeftFill} />
        )}
      </CardActionArea>
    </Tooltip>
  );
}

const DashboardSidebar = ({ isOpenSidebar, onCloseSidebar }) => {
  const [mouseEnter, setMouseEnter] = useState(false);
  const { pathname } = useRouter();
  const {
    user: { displayName },
  } = useSelector((state) => state.auth);

  const { isCollapse, collapseClick, collapseHover, onToggleCollapse } =
    useCollapseDrawer();

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: "100%",
        overflow: mouseEnter ? "hidden" : "visible", //TODO: Check if this is a good approach to hide the scrollbar
        "& .simplebar-content": {
          height: "100%",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Stack
        spacing={3}
        sx={{
          px: 2.5,
          pt: 3,
          pb: 2,
          ...(isCollapse && {
            alignItems: "center",
          }),
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <NextLink href="/">
            <Box sx={{ display: "inline-flex", cursor: "pointer" }}>
              <img
                style={{ width: "12rem" }}
                src="https://travelbook.com/assets/travelbook_frontend/shared/logo-a99994a55cb026557285c2fb1a673f02fc3cccb45a8333d8f64dae8900d38bcd.png"
                alt="Logo"
              />
            </Box>
          </NextLink>

          <MHidden width="lgDown">
            <IconCollapse
              isCollapse={isCollapse}
              onToggleCollapse={onToggleCollapse}
              collapseClick={collapseClick}
              onMouseEnter={() => setMouseEnter(true)}
              onMouseLeave={() => setMouseEnter(false)}
              onClick={() => setMouseEnter(false)}
            />
          </MHidden>
        </Stack>

        {isCollapse ? (
          <Avatar alt="My Avatar" src="/images/avatar_default.jpg" />
        ) : (
          <AccountStyle>
            <Avatar alt="My Avatar" src="/images/avatar_default.jpg" />
            <Box sx={{ ml: 2 }}>
              <Typography
                variant="subtitle2"
                sx={{ color: "text.primary", textTransform: "capitalize" }}
              >
                {displayName}
              </Typography>
              <NextLink href="/profile" shallow>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", cursor: "pointer" }}
                >
                  View Profile
                </Typography>
              </NextLink>
            </Box>
          </AccountStyle>
        )}
      </Stack>

      <NavSection navConfig={sidebarConfig} isShow={!isCollapse} />
    </Scrollbar>
  );

  return (
    <RootStyle
      sx={{
        width: {
          lg: isCollapse ? COLLAPSE_WIDTH : DRAWER_WIDTH,
        },
        ...(collapseClick && {
          position: "absolute",
        }),
      }}
    >
      <MHidden width="lgUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>

      <MHidden width="lgDown">
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: "background.default",
              ...(isCollapse && {
                width: COLLAPSE_WIDTH,
              }),
              ...(collapseHover && {
                borderRight: 0,
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
                boxShadow: (theme) => theme.customShadows.z20,
                bgcolor: (theme) =>
                  alpha(theme.palette.background.default, 0.88),
              }),
            },
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  );
};

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default DashboardSidebar;
