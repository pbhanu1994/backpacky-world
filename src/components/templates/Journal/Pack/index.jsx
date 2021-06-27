import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { Divider, List, Paper, Grid, Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { GiLightBackpack } from "react-icons/gi";
import { Sidebar } from "../../../organisms/Sidebar";
import { Navbar } from "../../../organisms/Navbar";
import { PackOption } from "./PackOption";
import { PackInput } from "./PackInput";
import getPackItems from "../../../../store/actions/journal/pack/getPackItems";
import addPackItem from "../../../../store/actions/journal/pack/addPackItem";
import updatePackItem from "../../../../store/actions/journal/pack/updatePackItem";
import deletePackItem from "../../../../store/actions/journal/pack/deletePackItem";
import { packStyles } from "./packStyles";

export default function Pack() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const classes = packStyles();
  const packItems = useSelector((state) => state.journal.packItems);

  console.log("packItems", packItems);

  useEffect(() => {
    dispatch(getPackItems());
  }, []);

  const handleToggle = (sectionId, packItem) => {
    dispatch(updatePackItem(sectionId, packItem));
  };

  const handleAddItem = (sectionId, packItem) => {
    dispatch(addPackItem(sectionId, packItem));
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
            color="textPrimary"
            gutterBottom
            style={{
              display: "flex",
              marginTop: "2rem",
            }}
          >
            <GiLightBackpack color={theme.palette.primary.main} />
            <span className={classes.packHeadingText}>Things to pack..</span>
          </Typography>
          {packItems.map((packItem) => (
            <Paper
              variant="outlined"
              classes={{ root: classes.listPaper }}
              key={packItem.id}
            >
              <Grid
                container
                justify="space-between"
                style={{ padding: "0 1rem" }}
              >
                <h3
                  style={{
                    fontWeight: 800,
                    // color: `${theme.palette.primary.main}`,
                  }}
                >
                  {packItem.sectionTitle}
                </h3>
                <h3 style={{ fontWeight: 400 }}>
                  Completed:{" "}
                  {packItem.sectionItems.filter((item) => item.checked).length}{" "}
                  /{packItem.sectionItems?.length}
                </h3>
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
                    onHandleToggle={handleToggle}
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
        </Grid>
      </Grid>
    </>
  );
}
