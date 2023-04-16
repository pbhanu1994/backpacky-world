import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ListComponent from "../../src/components/templates/Journal/ToDoList";
import getBucketListItems from "../../src/store/actions/journal/bucketList/getBucketListItems";
import addBucketListSection from "../../src/store/actions/journal/bucketList/addBucketListSection";
import updateBucketListSection from "../../src/store/actions/journal/bucketList/updateBucketListSection";
import deleteBucketListSection from "../../src/store/actions/journal/bucketList/deleteBucketListSection";
import addBucketListItem from "../../src/store/actions/journal/bucketList/addBucketListItem";
import updateBucketListItem from "../../src/store/actions/journal/bucketList/updateBucketListItem";
import deleteBucketListItem from "../../src/store/actions/journal/bucketList/deleteBucketListItem";

const BucketList = ({ userId }) => {
  const dispatch = useDispatch();
  const bucketListItems = useSelector((state) => state.journal.bucketListItems);

  useEffect(() => {
    dispatch(getBucketListItems());
  }, []);

  const pageTitle = "Journal - Bucket List | BackpackyWorld";
  const heading = "Bucket List";

  const handleAddSection = (position) => {
    dispatch(addBucketListSection(position));
  };

  const handleUpdateSectionTitle = (sectionId, sectionTitle) => {
    dispatch(updateBucketListSection(sectionId, sectionTitle));
  };

  const handleDeleteSection = (sectionId) => {
    dispatch(deleteBucketListSection(sectionId));
  };

  const handleAddItem = (sectionId, bucketListItem) => {
    dispatch(addBucketListItem(sectionId, bucketListItem));
  };

  const handleUpdateItem = (
    sectionId,
    bucketListItem,
    toggle,
    editItemName
  ) => {
    dispatch(
      updateBucketListItem(sectionId, bucketListItem, toggle, editItemName)
    );
  };

  const handleDeleteItem = (sectionId, bucketListItem) => {
    dispatch(deleteBucketListItem(sectionId, bucketListItem));
  };

  return (
    <ListComponent
      userId={userId}
      pageTitle={pageTitle}
      heading={heading}
      items={bucketListItems}
      onAddSection={handleAddSection}
      onUpdateSectionTitle={handleUpdateSectionTitle}
      onDeleteSection={handleDeleteSection}
      onAddItem={handleAddItem}
      onUpdateItem={handleUpdateItem}
      onDeleteItem={handleDeleteItem}
    />
  );
};

export default BucketList;
