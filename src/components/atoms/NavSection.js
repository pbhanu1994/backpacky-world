import PropTypes from "prop-types";
import { useState } from "react";
import { Icon } from "@iconify/react";
import arrowIosForwardFill from "@iconify/icons-eva/arrow-ios-forward-fill";
import arrowIosDownwardFill from "@iconify/icons-eva/arrow-ios-downward-fill";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { alpha, styled } from "@mui/material/styles";
import {
  Box,
  List,
  Collapse,
  ListItemText,
  ListItemIcon,
  ListSubheader,
  ListItemButton,
} from "@mui/material";
import { useTheme } from "@mui/system";

const ListSubheaderStyle = styled((props) => (
  <ListSubheader disableSticky disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.overline,
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
  paddingLeft: theme.spacing(5),
  color: theme.palette.text.primary,
}));

const ListItemStyle = styled(ListItemButton)(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: "relative",
  textTransform: "capitalize",
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(2.5),
  color: theme.palette.text.secondary,
  justifyContent: "center",
  borderRadius: theme.spacing(1),
  marginBottom: theme.spacing(0.5),
}));

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const NavItem = ({ item, isShow }) => {
  const theme = useTheme();
  const { pathname } = useRouter();
  const { title, path, icon, info, children } = item;
  const isActiveRoot = `${pathname}/`.includes(path);

  const [open, setOpen] = useState(isActiveRoot);

  const handleOpen = () => {
    setOpen(!open);
  };

  const activeRootStyle = {
    color: "primary.main",
    fontWeight: "fontWeightMedium",
    borderRadius: theme.spacing(1),
    bgcolor: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity
    ),
    "&:before": { display: "block" },
  };

  const activeSubStyle = {
    color: "text.primary",
    fontWeight: "fontWeightMedium",
  };

  if (children) {
    return (
      <>
        <ListItemStyle
          onClick={handleOpen}
          sx={{
            ...(isActiveRoot && activeRootStyle),
          }}
        >
          <ListItemIconStyle>{icon && icon}</ListItemIconStyle>

          {isShow && (
            <>
              <ListItemText disableTypography primary={title} />
              {info && info}
              <Box
                component={Icon}
                icon={open ? arrowIosDownwardFill : arrowIosForwardFill}
                sx={{ width: 16, height: 16, ml: 1 }}
              />
            </>
          )}
        </ListItemStyle>

        {isShow && (
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {children.map((item) => {
                const { title, path } = item;
                const isActiveSub = pathname.includes(path);

                return (
                  <NextLink key={item.title} href={item.path} shallow>
                    <ListItemStyle
                      sx={{
                        ...(isActiveSub && activeSubStyle),
                      }}
                    >
                      <ListItemIconStyle>
                        <Box
                          component="span"
                          sx={{
                            width: 4,
                            height: 4,
                            display: "flex",
                            borderRadius: "50%",
                            alignItems: "center",
                            justifyContent: "center",
                            bgcolor: "text.disabled",
                            transition: (theme) =>
                              theme.transitions.create("transform"),
                            ...(isActiveSub && {
                              transform: "scale(2)",
                              bgcolor: "primary.main",
                            }),
                          }}
                        />
                      </ListItemIconStyle>
                      <ListItemText disableTypography primary={title} />
                    </ListItemStyle>
                  </NextLink>
                );
              })}
            </List>
          </Collapse>
        )}
      </>
    );
  }

  return (
    <NextLink href={path} shallow>
      <ListItemStyle
        sx={{
          ...(isActiveRoot && activeRootStyle),
          paddingLeft: isShow ? theme.spacing(2) : theme.spacing(4),
        }}
      >
        <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
        {isShow && (
          <>
            <ListItemText disableTypography primary={title} />
            {info && info}
          </>
        )}
      </ListItemStyle>
    </NextLink>
  );
};

NavItem.propTypes = {
  isShow: PropTypes.bool,
  item: PropTypes.object,
};

const NavSection = ({ navConfig, isShow = true, ...other }) => {
  const theme = useTheme();

  return (
    <Box {...other}>
      {navConfig.map((list) => {
        const { subheader, items } = list;
        return (
          <List
            key={subheader}
            disablePadding
            sx={{
              paddingLeft: theme.spacing(2),
              paddingRight: theme.spacing(2),
            }}
          >
            {isShow && <ListSubheaderStyle>{subheader}</ListSubheaderStyle>}
            {items.map((item) => (
              <NavItem key={item.title} item={item} isShow={isShow} />
            ))}
          </List>
        );
      })}
    </Box>
  );
};

NavSection.propTypes = {
  isShow: PropTypes.bool,
  navConfig: PropTypes.array,
};

export default NavSection;
