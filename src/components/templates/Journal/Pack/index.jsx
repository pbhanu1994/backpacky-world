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

  const handleToggle = (packItem) => {
    dispatch(updatePackItem(packItem));
  };

  const handleAddItem = (packItem) => {
    dispatch(addPackItem(packItem));
  };

  const handleDeleteItem = (packItem) => {
    dispatch(deletePackItem(packItem));
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
          <Paper variant="outlined" classes={{ root: classes.listPaper }}>
            <Grid
              container
              justify="space-between"
              style={{ padding: "0 1rem" }}
            >
              <h3 style={{ fontWeight: 400 }}>Completed: 7 Items</h3>
              <h3 style={{ fontWeight: 400 }}>Total: 31 Items</h3>
            </Grid>
            <Divider />
            <List>
              {packItems.map((packItem) => (
                <PackOption
                  key={packItem.name}
                  packItem={packItem}
                  checked={packItem.checked}
                  onHandleToggle={handleToggle}
                  onDeleteItem={handleDeleteItem}
                />
              ))}
              {packItems.length === 0 && (
                <h3 style={{ fontWeight: 400, textAlign: "center" }}>
                  No items found
                </h3>
              )}
            </List>
            <PackInput onAddItem={handleAddItem} />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
