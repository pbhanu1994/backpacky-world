import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ListComponent from "../../src/components/templates/Journal/ToDoList";
import getPackItems from "../../src/store/actions/journal/pack/getPackItems";
import addPackSection from "../../src/store/actions/journal/pack/addPackSection";
import updatePackSection from "../../src/store/actions/journal/pack/updatePackSection";
import deletePackSection from "../../src/store/actions/journal/pack/deletePackSection";
import addPackItem from "../../src/store/actions/journal/pack/addPackItem";
import updatePackItem from "../../src/store/actions/journal/pack/updatePackItem";
import deletePackItem from "../../src/store/actions/journal/pack/deletePackItem";

const Pack = ({ userId }) => {
  const dispatch = useDispatch();
  const packItems = useSelector((state) => state.journal.packItems);

  useEffect(() => {
    dispatch(getPackItems());
  }, []);

  const pageTitle = "Journal - Pack | BackpackyWorld";
  const heading = "Things to pack";

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
    <ListComponent
      userId={userId}
      pageTitle={pageTitle}
      heading={heading}
      items={packItems}
      onAddSection={handleAddSection}
      onUpdateSectionTitle={handleUpdateSectionTitle}
      onDeleteSection={handleDeleteSection}
      onAddItem={handleAddItem}
      onUpdateItem={handleUpdatePackItem}
      onDeleteItem={handleDeleteItem}
    />
  );
};

export default Pack;
