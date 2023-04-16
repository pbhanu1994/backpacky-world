import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Divider, List, Paper, Grid, IconButton } from "@mui/material";
import {
  EditOutlined as EditIcon,
  DeleteOutline as DeleteOutlineIcon,
} from "@mui/icons-material";
import { Container, Typography } from "@mui/material";
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
                    style={{ padding: "0.8rem 1rem", height: "3.7rem" }}
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
                        {selectedHoverSectionId === item.sectionId && (
                          <span
                            style={{
                              display: "flex",
                            }}
                          >
                            {/* TODO: Check the colors of Edit & Delete Icons (outlined or filled etc...) */}
                            <IconButton
                              aria-label="Edit section name"
                              size="small"
                              color="secondary"
                              onClick={() => {
                                setShowSectionUpdateInput(true);
                                setEditSectionId(item.sectionId);
                              }}
                            >
                              <EditIcon />
                            </IconButton>{" "}
                            &nbsp;
                            <IconButton
                              aria-label="Delete section"
                              size="small"
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
                              <DeleteOutlineIcon color="error" />
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
                    {(!mouseHoverOnSection ||
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
