import _ from "lodash";
import { db } from "../../../../handlers/firebaseClient";
import { collectionGroup, query, where, getDocs } from "firebase/firestore";
import deleteBucketListSection from "./deleteBucketListSection";
import setAndShowErrorToast from "../../config/toast/setAndShowErrorToast";
import { GET_BUCKET_LIST_ITEMS } from "../../../actionTypes/journal";

const getBucketListItems = () => async (dispatch, getState) => {
  const uid = getState().auth.user.uid;
  const bucketListSectionItemsResultArr = [];

  try {
    const bucketListSectionItemsRef = collectionGroup(
      db,
      "bucketListSectionItems"
    );
    const bucketListSectionItemsQuery = query(
      bucketListSectionItemsRef,
      where("uid", "==", uid)
    );
    const bucketListSectionItems = await getDocs(bucketListSectionItemsQuery);

    bucketListSectionItems.docs.map((doc) =>
      bucketListSectionItemsResultArr.push(doc.data())
    );

    const bucketListSectionItemsGrouped = _.groupBy(
      bucketListSectionItemsResultArr,
      "sectionId"
    );

    Object.keys(bucketListSectionItemsGrouped).map(
      (bucketListItem) =>
        (bucketListSectionItemsGrouped[bucketListItem] = {
          sectionItems: [...bucketListSectionItemsGrouped[bucketListItem]],
        })
    );

    const bucketListSectionsRef = collectionGroup(db, "bucketListSections");
    const bucketListSectionsQuery = query(
      bucketListSectionsRef,
      where("uid", "==", uid)
    );
    const bucketListSections = await getDocs(bucketListSectionsQuery);

    bucketListSections.docs.map(
      (doc) =>
        (bucketListSectionItemsGrouped[doc.data().sectionId] = {
          ...bucketListSectionItemsGrouped[doc.data().sectionId],
          ...doc.data(),
        })
    );

    // Converting the Object to Array
    const bucketListSectionItemsGroupedArray = _.values(
      bucketListSectionItemsGrouped
    );

    // Deleting the Sections with no Bucket List Items.
    const sectionsWithoutItems = bucketListSectionItemsGroupedArray.filter(
      (bucketListSectionItem) => !bucketListSectionItem.sectionItems
    );
    sectionsWithoutItems.length > 0 &&
      sectionsWithoutItems.map((sectionWithoutItems) =>
        dispatch(deleteBucketListSection(sectionWithoutItems.sectionId))
      );

    // Taking only the sections with bucketListItems available
    const sectionsWithItems = bucketListSectionItemsGroupedArray.filter(
      (bucketListSectionItem) => bucketListSectionItem.sectionItems
    );

    dispatch({
      type: GET_BUCKET_LIST_ITEMS,
      payload: sectionsWithItems,
    });
  } catch (err) {
    console.log("error", err);
    const errorMessage = `Whoops! Could not fetch the bucket list sections & items`;
    dispatch(setAndShowErrorToast(errorMessage));
  }
};

export default getBucketListItems;
