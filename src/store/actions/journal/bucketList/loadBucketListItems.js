import { v4 as uuidv4 } from "uuid";
import { db } from "../../../../handlers/firebaseClient";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  query,
  where,
} from "firebase/firestore";
import setAndShowErrorToast from "../../config/toast/setAndShowErrorToast";

// TODO: Check with experienced dev (who knows firebase, firestore) if this is a good approach to load the data
const loadBucketListItems = () => async (dispatch, getState) => {
  const uid = getState().auth.user.uid;
  try {
    const bucketListRef = collection(db, "journal", uid, "bucketList");
    const bucketListQuery = query(bucketListRef, where("uid", "==", uid));
    const bucketList = await getDocs(bucketListQuery);
    const bucketListLength = bucketList.docs.length;

    if (bucketListLength === 0) {
      const journalRef = doc(db, "journal", uid);
      setDoc(journalRef, {
        uid,
        createdAt: new Date().toISOString(),
        name: "journal",
      });

      const bucketListRef = doc(journalRef, "bucketList", uid);
      setDoc(bucketListRef, { uid, name: "bucketList" });

      const sectionsRef = collection(bucketListRef, "bucketListSections");

      // Adding the bucket list Sample Data
      // Australia
      const australiaRef = doc(sectionsRef, "australia");
      setDoc(australiaRef, {
        uid,
        sectionId: australiaRef.id,
        sectionTitle: "Australia",
        placeholderText: "Add Item: e.g. Yarra Valley",
      });
      // Creating the uniqueIds
      const greatBarrierReefUniqueId = uuidv4();
      const melbourneUniqueId = uuidv4();
      const greatOceanRoadUniqueId = uuidv4();
      const sydneyOperaHouseUniqueId = uuidv4();
      const whitSundaysUniqueId = uuidv4();

      const australiaSectionItemsRef = collection(
        australiaRef,
        "bucketListSectionItems"
      );
      setDoc(doc(australiaSectionItemsRef, greatBarrierReefUniqueId), {
        id: greatBarrierReefUniqueId,
        uid,
        sectionId: australiaRef.id,
        name: "Great Barrier Reef",
        checked: false,
      });
      setDoc(doc(australiaSectionItemsRef, melbourneUniqueId), {
        id: melbourneUniqueId,
        uid,
        sectionId: australiaRef.id,
        name: "Melbourne",
        checked: false,
      });
      setDoc(doc(australiaSectionItemsRef, greatOceanRoadUniqueId), {
        id: greatOceanRoadUniqueId,
        uid,
        sectionId: australiaRef.id,
        name: "Great Ocean Road",
        checked: true,
      });
      setDoc(doc(australiaSectionItemsRef, sydneyOperaHouseUniqueId), {
        id: sydneyOperaHouseUniqueId,
        uid,
        sectionId: australiaRef.id,
        name: "Sydney Opera House",
        checked: false,
      });
      setDoc(doc(australiaSectionItemsRef, whitSundaysUniqueId), {
        id: whitSundaysUniqueId,
        uid,
        sectionId: australiaRef.id,
        name: "Whitsundays",
        checked: false,
      });

      // New York
      const newYorkRef = doc(sectionsRef, "newyork");
      setDoc(newYorkRef, {
        uid,
        sectionId: newYorkRef.id,
        sectionTitle: "New York",
        placeholderText: "Add Item.. e.g. Grand Central",
      });
      // Creating the uniqueIds
      const statueOfLibertyUniqueId = uuidv4();
      const empireStateBuildingUniqueId = uuidv4();
      const rockefellerCenterUniqueId = uuidv4();
      const madisonSquareGardenUniqueId = uuidv4();
      const centralParkUniqueId = uuidv4();

      const newYorkSectionItemsRef = collection(
        newYorkRef,
        "bucketListSectionItems"
      );
      setDoc(doc(newYorkSectionItemsRef, statueOfLibertyUniqueId), {
        id: statueOfLibertyUniqueId,
        uid,
        sectionId: newYorkRef.id,
        name: "Statue of Liberty",
        checked: false,
      });
      setDoc(doc(newYorkSectionItemsRef, empireStateBuildingUniqueId), {
        id: empireStateBuildingUniqueId,
        uid,
        sectionId: newYorkRef.id,
        name: "Empire State Building",
        checked: false,
      });
      setDoc(doc(newYorkSectionItemsRef, rockefellerCenterUniqueId), {
        id: rockefellerCenterUniqueId,
        uid,
        sectionId: newYorkRef.id,
        name: "Rockefeller Center",
        checked: true,
      });
      setDoc(doc(newYorkSectionItemsRef, madisonSquareGardenUniqueId), {
        id: madisonSquareGardenUniqueId,
        uid,
        sectionId: newYorkRef.id,
        name: "Madison Square Garden",
        checked: true,
      });
      setDoc(doc(newYorkSectionItemsRef, centralParkUniqueId), {
        id: centralParkUniqueId,
        uid,
        sectionId: newYorkRef.id,
        name: "Central Park",
        checked: true,
      });

      // France
      const franceRef = doc(sectionsRef, "france");
      setDoc(franceRef, {
        uid,
        sectionId: franceRef.id,
        sectionTitle: "France",
        placeholderText: "Add Item.. e.g. Bordeaux",
      });
      // Creating the uniqueIds
      const frenchRivieraUniqueId = uuidv4();
      const parisUniqueId = uuidv4();
      const loireValleyUniqueId = uuidv4();
      const saintTropezUniqueId = uuidv4();
      const cannesUniqueId = uuidv4();

      const franceSectionItemsRef = collection(
        franceRef,
        "bucketListSectionItems"
      );
      setDoc(doc(franceSectionItemsRef, frenchRivieraUniqueId), {
        id: frenchRivieraUniqueId,
        uid,
        sectionId: franceRef.id,
        name: "French Riviera",
        checked: false,
      });
      setDoc(doc(franceSectionItemsRef, parisUniqueId), {
        id: parisUniqueId,
        uid,
        sectionId: franceRef.id,
        name: "Paris",
        checked: false,
      });
      setDoc(doc(franceSectionItemsRef, loireValleyUniqueId), {
        id: loireValleyUniqueId,
        uid,
        sectionId: franceRef.id,
        name: "Loire Valley",
        checked: true,
      });
      setDoc(doc(franceSectionItemsRef, saintTropezUniqueId), {
        id: saintTropezUniqueId,
        uid,
        sectionId: franceRef.id,
        name: "Saint-Tropez",
        checked: false,
      });
      setDoc(doc(franceSectionItemsRef, cannesUniqueId), {
        id: cannesUniqueId,
        uid,
        sectionId: franceRef.id,
        name: "Cannes",
        checked: false,
      });

      // Amsterdam
      const amsterdamRef = doc(sectionsRef, "amsterdam");
      setDoc(amsterdamRef, {
        uid,
        sectionId: amsterdamRef.id,
        sectionTitle: "Amsterdam",
        placeholderText: "Add Item.. e.g. Moco Museum",
      });
      // Creating the uniqueIds
      const rijksMuseumUniqueId = uuidv4();
      const vanGoghMuseumUniqueId = uuidv4();
      const anneFrankHouseUniqueId = uuidv4();
      const ourLordInTheAtticChurchUniqueId = uuidv4();
      const begijnhofUniqueId = uuidv4();

      const amsterdamSectionItemsRef = collection(
        amsterdamRef,
        "bucketListSectionItems"
      );
      setDoc(doc(amsterdamSectionItemsRef, rijksMuseumUniqueId), {
        id: rijksMuseumUniqueId,
        uid,
        sectionId: amsterdamRef.id,
        name: "Rijksmuseum",
        checked: false,
      });
      setDoc(doc(amsterdamSectionItemsRef, vanGoghMuseumUniqueId), {
        id: vanGoghMuseumUniqueId,
        uid,
        sectionId: amsterdamRef.id,
        name: "Van Gogh Museum",
        checked: false,
      });
      setDoc(doc(amsterdamSectionItemsRef, anneFrankHouseUniqueId), {
        id: anneFrankHouseUniqueId,
        uid,
        sectionId: amsterdamRef.id,
        name: "Anne Frank House",
        checked: true,
      });
      setDoc(doc(amsterdamSectionItemsRef, ourLordInTheAtticChurchUniqueId), {
        id: ourLordInTheAtticChurchUniqueId,
        uid,
        sectionId: amsterdamRef.id,
        name: "Our Lord in the Attic Church",
        checked: false,
      });
      setDoc(doc(amsterdamSectionItemsRef, begijnhofUniqueId), {
        id: begijnhofUniqueId,
        uid,
        sectionId: amsterdamRef.id,
        name: "Begijnhof",
        checked: false,
      });

      // London
      const londonRef = doc(sectionsRef, "london");
      setDoc(londonRef, {
        uid,
        sectionId: londonRef.id,
        sectionTitle: "London",
        placeholderText: "Add Item.. e.g. Tower of London",
      });
      // Creating the uniqueIds
      const buckinghamPalaceUniqueId = uuidv4();
      const theLondonEyeUniqueId = uuidv4();
      const stPaulsCathedralUniqueId = uuidv4();
      const wimbledonTennisUniqueId = uuidv4();
      const oxfordStreetUniqueId = uuidv4();

      const londonSectionItemsRef = collection(
        londonRef,
        "bucketListSectionItems"
      );
      setDoc(doc(londonSectionItemsRef, buckinghamPalaceUniqueId), {
        id: buckinghamPalaceUniqueId,
        uid,
        sectionId: londonRef.id,
        name: "Buckingham Palace",
        checked: false,
      });
      setDoc(doc(londonSectionItemsRef, theLondonEyeUniqueId), {
        id: theLondonEyeUniqueId,
        uid,
        sectionId: londonRef.id,
        name: "The London Eye",
        checked: false,
      });
      setDoc(doc(londonSectionItemsRef, stPaulsCathedralUniqueId), {
        id: stPaulsCathedralUniqueId,
        uid,
        sectionId: londonRef.id,
        name: "St. Paul's Cathedral",
        checked: true,
      });
      setDoc(doc(londonSectionItemsRef, wimbledonTennisUniqueId), {
        id: wimbledonTennisUniqueId,
        uid,
        sectionId: londonRef.id,
        name: "Wimbledon Tennis",
        checked: false,
      });
      setDoc(doc(londonSectionItemsRef, oxfordStreetUniqueId), {
        id: oxfordStreetUniqueId,
        uid,
        sectionId: londonRef.id,
        name: "Oxford Street",
        checked: false,
      });
    }
  } catch (err) {
    console.log("error", err);
    const errorMessage = `Whoops! Could not load the bucket list sections & items`;
    dispatch(setAndShowErrorToast(errorMessage));
  }
};

export default loadBucketListItems;
