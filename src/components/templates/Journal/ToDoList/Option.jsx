import React, { useState } from "react";
import {
  Grid,
  ListItem,
  ListItemIcon,
  Checkbox,
  Divider,
  IconButton,
  MenuItem,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { EditSectionText } from "/src/components/atoms/EditSectionText";
import Iconify from "/src/components/atoms/Iconify";
import { MenuPopover } from "/src/components/atoms/MenuPopover";
import { useTheme } from "@mui/system";
import { listStyles, CustomListItemText } from "./listStyles";

export const Option = ({
  sectionId,
  item,
  checked,
  onUpdateitem,
  onDeleteItem,
}) => {
  const [mouseHoverOnItem, setMouseHoverOnItem] = useState(false);
  const [showitemInput, setShowitemInput] = useState(false);
  const [itemId, setitemId] = useState(null);
  const [open, setOpen] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const labelId = `checkbox-list-label-${item.name}`;
  const checkboxChecked = checked !== false;
  const classes = listStyles({ checkboxChecked });

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const ICON = {
    mr: 2,
    width: 20,
    height: 20,
  };

  return (
    <>
      <ListItem
        key={item.id}
        role={undefined}
        dense
        disableRipple
        disableTouchRipple
        sx={classes.listItem}
        onMouseOver={() => setMouseHoverOnItem(true)}
        onMouseLeave={() => setMouseHoverOnItem(false)}
        button
      >
        <Grid
          container
          direction="row"
          alignItems="center"
          onClick={() =>
            !showitemInput && onUpdateitem(sectionId, item, true, null)
          }
        >
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={checkboxChecked}
              tabIndex={-1}
              // classes={{
              // root: classes.checkbox,
              // checked: classes.checkboxChecked,
              // }}
              inputProps={{ "aria-labelledby": labelId }}
            />
          </ListItemIcon>
          {(!showitemInput || itemId !== item.id) && (
            <CustomListItemText
              id={labelId}
              checked={checkboxChecked}
              primary={item.name}
            />
          )}
          {showitemInput && itemId === item.id && (
            <EditSectionText
              sectionId={sectionId}
              inputText={item.name}
              onAddItem={(sectionId, itemText) =>
                onUpdateitem(sectionId, item, null, itemText)
              }
              edit={showitemInput}
              onHandleEdit={(edit) => setShowitemInput(edit)}
              styles={{ width: "80%" }}
            />
          )}
        </Grid>
        {!isMobile && (
          <span
            style={{
              display: "flex",
              visibility: mouseHoverOnItem ? "visible" : "hidden", //TODO: Check this with experienced dev, if it's a good approach
            }}
          >
            <IconButton
              aria-label="Edit Item Name"
              color="secondary"
              size="medium"
              onClick={() => {
                setShowitemInput(true);
                setitemId(item.id);
              }}
            >
              {/* TODO: Check the colors of Edit - Secondary or black, etc. on hover with a designer */}
              <Iconify icon={"eva:edit-fill"} />
            </IconButton>
            <IconButton
              aria-label="Delete Item"
              sx={classes.deleteSectionButton}
              size="medium"
              onClick={() => onDeleteItem(sectionId, item)}
            >
              {/* TODO: Check the colors of error or black on hover with a designer */}
              <Iconify icon={"eva:trash-2-outline"} />
            </IconButton>
          </span>
        )}
        {isMobile && (
          <span>
            <IconButton size="large" onClick={handleOpen}>
              <Iconify icon={"eva:more-vertical-fill"} width={20} height={20} />
            </IconButton>

            <MenuPopover
              open={Boolean(open)}
              anchorEl={open}
              onClose={handleClose}
              anchorOrigin={{ vertical: "top", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              arrow="right-top"
              sx={{
                mt: -0.5,
                width: "auto",
                "& .MuiMenuItem-root": {
                  p: 1,
                  typography: "body2",
                  borderRadius: 0.75,
                },
              }}
            >
              <Stack sx={{ p: 1 }}>
                <MenuItem
                  onClick={() => {
                    if (!showitemInput) {
                      onUpdateitem(sectionId, item, true, null);
                      handleClose();
                    }
                  }}
                >
                  <Iconify
                    icon={"eva:checkmark-circle-2-fill"}
                    sx={{ ...ICON }}
                  />
                  {checked ? "Mark Incomplete" : "Mark Complete"}
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    setShowitemInput(true);
                    setitemId(item.id);
                    handleClose();
                  }}
                >
                  <Iconify icon={"eva:edit-fill"} sx={{ ...ICON }} />
                  Edit
                </MenuItem>

                <Divider sx={{ my: 1 }} />

                <MenuItem
                  sx={{ color: "error.main" }}
                  onClick={() => onDeleteItem(sectionId, item)}
                >
                  <Iconify icon={"eva:trash-2-outline"} sx={{ ...ICON }} />
                  Delete
                </MenuItem>
              </Stack>
            </MenuPopover>
          </span>
        )}
      </ListItem>
      <Divider light />
    </>
  );
};
