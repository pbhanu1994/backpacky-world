import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Divider,
  List,
  Paper,
  Grid,
  Typography,
  IconButton,
} from "@material-ui/core";
import {
  EditOutlined as EditIcon,
  DeleteOutline as DeleteOutlineIcon,
} from "@material-ui/icons";
import { useTheme } from "@material-ui/core/styles";
import { GiLightBackpack } from "react-icons/gi";
import { Sidebar } from "../../../organisms/Sidebar";
import { Navbar } from "../../../organisms/Navbar";
import { PackOption } from "./PackOption";
import { PackInput } from "./PackInput";
import { AddPackSection } from "./AddPackSection";
import getPackItems from "../../../../store/actions/journal/pack/getPackItems";
import addPackSection from "../../../../store/actions/journal/pack/addPackSection";
import updatePackSection from "../../../../store/actions/journal/pack/updatePackSection";
import deletePackSection from "../../../../store/actions/journal/pack/deletePackSection";
import addPackItem from "../../../../store/actions/journal/pack/addPackItem";
import updatePackItem from "../../../../store/actions/journal/pack/updatePackItem";
import deletePackItem from "../../../../store/actions/journal/pack/deletePackItem";
import { packStyles } from "./packStyles";

export default function Pack() {
  const [selectedHoverSectionId, setSelectedHoverSectionId] = useState(null);
  const [mouseHoverOnSection, setMouseHoverOnSection] = useState(false);
  const [editSectionId, setEditSectionId] = useState(null);
  const [showSectionUpdateInput, setShowSectionUpdateInput] = useState(false);
  const packItems = useSelector((state) => state.journal.packItems);

  const theme = useTheme();
  const dispatch = useDispatch();
  const classes = packStyles();

  useEffect(() => {
    dispatch(getPackItems());
  }, []);

  const handleAddSection = (position) => {
    dispatch(addPackSection(position));
  };

  const handleUpdateSectionTitle = (sectionId, sectionTitle) => {
    dispatch(updatePackSection(sectionId, sectionTitle));
  };

  const handleDeleteSection = (sectionId) => {
    dispatch(deletePackSection(sectionId));
  };

  const handleAddItem = (sectionId, packItem) => {
    dispatch(addPackItem(sectionId, packItem));
  };

  const handleUpdatePackItem = (sectionId, packItem, toggle, editItemName) => {
    dispatch(updatePackItem(sectionId, packItem, toggle, editItemName));
  };

  const handleDeleteItem = (sectionId, packItem) => {
    dispatch(deletePackItem(sectionId, packItem));
  };

  return (
    <>
      <Navbar />
      <Grid container spacing={4}>
        <Grid item xs={2} md={3}>
          <Sidebar />
        </Grid>
        <Grid item xs={10} md={9}>
          <Typography
            component="h1"
            variant="h3"
            align="center"
            color="primary"
            gutterBottom
            style={{
              display: "flex",
              marginTop: "2rem",
            }}
          >
            <GiLightBackpack color={theme.palette.primary.main} />
            Things to pack..
          </Typography>
          <AddPackSection onAddSection={() => handleAddSection("start")} />
          {packItems.map((packItem) => (
            <Paper
              variant="outlined"
              classes={{ root: classes.listPaper }}
              key={packItem.sectionId}
            >
              <Grid
                container
                justify="space-between"
                style={{ padding: "0.8rem 1rem" }}
                onMouseOver={() => {
                  setSelectedHoverSectionId(packItem.sectionId);
                  setMouseHoverOnSection(true);
                }}
                onMouseLeave={() => {
                  setSelectedHoverSectionId(null);
                  setMouseHoverOnSection(false);
                }}
              >
                {(!showSectionUpdateInput ||
                  editSectionId !== packItem.sectionId) && (
                  <Typography
                    component="h6"
                    variant="h6"
                    color="secondary"
                    className={classes.sectionTitle}
                    style={{
                      width:
                        mouseHoverOnSection &&
                        selectedHoverSectionId === packItem.sectionId
                          ? "100%"
                          : "fit-content", // TODO: Check with the experienced dev if it's a good approach
                    }}
                  >
                    {packItem.sectionTitle} &nbsp;
                    {selectedHoverSectionId === packItem.sectionId && (
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
                            setEditSectionId(packItem.sectionId);
                          }}
                        >
                          <EditIcon />
                        </IconButton>{" "}
                        &nbsp;
                        <IconButton
                          aria-label="Delete section"
                          size="small"
                          className={classes.deleteSectionButton}
                          onClick={() => {
                            handleDeleteSection(packItem.sectionId);
                          }}
                        >
                          <DeleteOutlineIcon color="error" />
                        </IconButton>
                      </span>
                    )}
                  </Typography>
                )}
                {showSectionUpdateInput &&
                  editSectionId === packItem.sectionId && (
                    <PackInput
                      sectionId={packItem.sectionId}
                      inputText={packItem.sectionTitle}
                      onAddItem={handleUpdateSectionTitle}
                      edit={showSectionUpdateInput}
                      onHandleEdit={(edit) => setShowSectionUpdateInput(edit)}
                    />
                  )}
                {/* TODO: Check with the designer if hiding the completed items on hover is a good idea */}
                {(!mouseHoverOnSection ||
                  selectedHoverSectionId !== packItem.sectionId) && (
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
                      packItem.sectionItems.filter((item) => item.checked)
                        .length
                    }{" "}
                    /{packItem.sectionItems?.length}
                  </Typography>
                )}
                {/* <h3 style={{ fontWeight: 400 }}>Total: 31 Items</h3> */}
              </Grid>
              <Divider />
              <List>
                {packItem.sectionItems?.map((sectionItem) => (
                  <PackOption
                    key={sectionItem.name}
                    sectionId={packItem.sectionId}
                    packItem={sectionItem}
                    checked={sectionItem.checked}
                    onUpdatePackItem={handleUpdatePackItem}
                    onDeleteItem={handleDeleteItem}
                  />
                ))}
                {packItem.sectionItems?.length === 0 && (
                  <h3 style={{ fontWeight: 400, textAlign: "center" }}>
                    No items found
                  </h3>
                )}
              </List>
              <PackInput
                sectionId={packItem.sectionId}
                placeholderText={packItem.placeholderText}
                onAddItem={handleAddItem}
              />
            </Paper>
          ))}
          <AddPackSection onAddSection={() => handleAddSection("end")} />
        </Grid>
      </Grid>
    </>
  );
}
