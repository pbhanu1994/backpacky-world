import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Divider, List, Paper, Grid, IconButton } from "@mui/material";
import {
  Container,
  Typography,
  MenuItem,
  Stack,
  useMediaQuery,
} from "@mui/material";
// import { GiLightBackpack } from "react-icons/gi";
import Page from "../../../atoms/Page";
import DashboardLayout from "../../../layouts/dashboard";
import useSettings from "../../../../hooks/useSettings";
import { Option } from "./Option";
import { EditSectionText } from "/src/components/atoms/EditSectionText";
import { AddSection } from "./AddSection";
import { PAGE_PATH } from "../../../../constants/navigationConstants";
import HeaderBreadcrumbs from "../../../atoms/HeaderBreadCrumbs";
import setAndShowDeleteDialog from "../../../../store/actions/config/dialog/setAndShowDeleteDialog";
import Iconify from "/src/components/atoms/Iconify";
import { MenuPopover } from "/src/components/atoms/MenuPopover";
import { useTheme } from "@mui/system";
import { listStyles } from "./listStyles";

export default function ToDoList({
  pageTitle,
  heading,
  items,
  onAddSection,
  onUpdateSectionTitle,
  onDeleteSection,
  onAddItem,
  onUpdateItem,
  onDeleteItem,
}) {
  const [selectedHoverSectionId, setSelectedHoverSectionId] = useState(null);
  const [mouseHoverOnSection, setMouseHoverOnSection] = useState(false);
  const [editSectionId, setEditSectionId] = useState(null);
  const [showSectionUpdateInput, setShowSectionUpdateInput] = useState(false);
  const [open, setOpen] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const handleOpen = (e, id) => {
    setOpen({ anchorEl: e.currentTarget, id });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const ICON = {
    mr: 2,
    width: 20,
    height: 20,
  };

  const dispatch = useDispatch();
  const { themeStretch } = useSettings();
  const classes = listStyles();

  return (
    <DashboardLayout>
      <Page title={pageTitle}>
        <Container maxWidth={themeStretch ? false : "xl"}>
          <HeaderBreadcrumbs
            heading={heading}
            links={[
              { name: "Journal", href: PAGE_PATH.JOURNAL },
              { name: heading },
            ]}
          />
          {items.length === 0 && (
            <div>
              <Typography align="center" component="h3" gutterBottom>
                No items available.
              </Typography>
              <AddSection onAddSection={() => onAddSection("start")} />
            </div>
          )}
          {items.length > 0 && (
            <>
              <AddSection onAddSection={() => onAddSection("start")} />
              {items.map((item) => (
                <Paper
                  key={item.sectionId}
                  variant="outlined"
                  sx={classes.listPaper}
                >
                  <Grid
                    container
                    justifyContent="space-between"
                    style={{
                      padding: "0.8rem 1rem",
                      height: "3.7rem",
                      flexWrap: "nowrap",
                    }}
                    onMouseOver={() => {
                      setSelectedHoverSectionId(item.sectionId);
                      setMouseHoverOnSection(true);
                    }}
                    onMouseLeave={() => {
                      setSelectedHoverSectionId(null);
                      setMouseHoverOnSection(false);
                    }}
                  >
                    {(!showSectionUpdateInput ||
                      editSectionId !== item.sectionId) && (
                      <Typography
                        component="h6"
                        variant="h6"
                        color="secondary"
                        sx={classes.sectionTitle}
                        style={{
                          width:
                            mouseHoverOnSection &&
                            selectedHoverSectionId === item.sectionId
                              ? "100%"
                              : "fit-content", // TODO: Check with the experienced dev if it's a good approach
                        }}
                      >
                        {item.sectionTitle} &nbsp;
                        {!isMobile &&
                          selectedHoverSectionId === item.sectionId && (
                            <span
                              style={{
                                display: "flex",
                              }}
                            >
                              {/* TODO: Check the colors of Edit & Delete Icons (outlined or filled etc...) */}
                              <IconButton
                                aria-label="Edit section name"
                                size="medium"
                                color="secondary"
                                onClick={() => {
                                  setShowSectionUpdateInput(true);
                                  setEditSectionId(item.sectionId);
                                }}
                              >
                                <Iconify icon={"eva:edit-fill"} />
                              </IconButton>{" "}
                              &nbsp;
                              <IconButton
                                aria-label="Delete section"
                                size="medium"
                                sx={classes.deleteSectionButton}
                                onClick={() => {
                                  dispatch(
                                    setAndShowDeleteDialog(
                                      item.sectionTitle,
                                      () => onDeleteSection(item.sectionId) // Storing function reference (callback?) in the store to use later
                                    )
                                  );
                                }}
                              >
                                <Iconify icon={"eva:trash-2-outline"} />
                              </IconButton>
                            </span>
                          )}
                      </Typography>
                    )}
                    {showSectionUpdateInput &&
                      editSectionId === item.sectionId && (
                        <EditSectionText
                          sectionId={item.sectionId}
                          inputText={item.sectionTitle}
                          onAddItem={onUpdateSectionTitle}
                          edit={showSectionUpdateInput}
                          onHandleEdit={(edit) =>
                            setShowSectionUpdateInput(edit)
                          }
                          styles={{ width: "80%" }}
                        />
                      )}
                    {/* TODO: Check with the designer if hiding the completed items on hover is a good idea */}
                    {!isMobile &&
                      (!mouseHoverOnSection ||
                        selectedHoverSectionId !== item.sectionId) && (
                        <Typography
                          component="h6"
                          variant="body1"
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          Completed:{" "}
                          {
                            item.sectionItems?.filter((item) => item.checked)
                              .length
                          }{" "}
                          / {item.sectionItems?.length}
                        </Typography>
                      )}
                    {isMobile && (
                      <span>
                        <IconButton
                          size="large"
                          onClick={(event) => handleOpen(event, item.sectionId)}
                        >
                          <Iconify
                            icon={"eva:more-vertical-fill"}
                            width={20}
                            height={20}
                          />
                        </IconButton>
                        <MenuPopover
                          id={`menu-popover-${item.sectionId}`}
                          open={open?.id === item.sectionId}
                          anchorEl={open?.anchorEl}
                          onClose={handleClose}
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
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
                            <Typography
                              variant="body2"
                              sx={{ color: "text.secondary", py: 0.5 }}
                              noWrap
                            >
                              {item.sectionTitle}
                            </Typography>

                            <MenuItem
                              onClick={() => {
                                setShowSectionUpdateInput(true);
                                setEditSectionId(item.sectionId);
                                handleClose();
                              }}
                            >
                              <Iconify
                                icon={"eva:edit-fill"}
                                sx={{ ...ICON }}
                              />
                              Edit
                            </MenuItem>

                            <Divider sx={{ my: 1 }} />

                            <MenuItem
                              sx={{ color: "error.main" }}
                              onClick={() => {
                                dispatch(
                                  setAndShowDeleteDialog(
                                    item.sectionTitle,
                                    () => onDeleteSection(item.sectionId) // Storing function reference (callback?) in the store to use later
                                  )
                                );
                                handleClose();
                              }}
                            >
                              <Iconify
                                icon={"eva:trash-2-outline"}
                                sx={{ ...ICON }}
                              />
                              Delete
                            </MenuItem>
                          </Stack>
                        </MenuPopover>
                      </span>
                    )}
                    {/* <h3 style={{ fontWeight: 400 }}>Total: 31 Items</h3> */}
                  </Grid>
                  <Divider />
                  <List>
                    {item.sectionItems?.map((sectionItem) => (
                      <Option
                        key={sectionItem.id}
                        sectionId={item.sectionId}
                        item={sectionItem}
                        checked={sectionItem.checked}
                        onUpdateitem={onUpdateItem}
                        onDeleteItem={onDeleteItem}
                      />
                    ))}
                    {item.sectionItems?.length === 0 && (
                      <h3 style={{ fontWeight: 400, textAlign: "center" }}>
                        No items found
                      </h3>
                    )}
                  </List>
                  <EditSectionText
                    sectionId={item.sectionId}
                    placeholderText={item.placeholderText}
                    onAddItem={onAddItem}
                    styles={{ width: "80%", margin: "0.4rem 3.7rem" }}
                  />
                </Paper>
              ))}
              <AddSection onAddSection={() => onAddSection("end")} />
            </>
          )}
        </Container>
      </Page>
    </DashboardLayout>
  );
}
