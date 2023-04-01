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
const loadPackItems = () => async (dispatch, getState) => {
  const uid = getState().auth.user.uid;
  try {
    const packRef = collection(db, "journal", uid, "pack");
    const packQuery = query(packRef, where("uid", "==", uid));
    const pack = await getDocs(packQuery);
    const packLength = pack.docs.length;

    if (packLength === 0) {
      const journalRef = doc(db, "journal", uid);
      setDoc(journalRef, {
        uid,
        createdAt: new Date().toISOString(),
        name: "journal",
      });

      const packRef = doc(journalRef, "pack", uid);
      setDoc(packRef, { uid, name: "pack" });

      const sectionsRef = collection(packRef, "packSections");

      // Adding the Pack Sample Data
      // Documents
      const documentsRef = doc(sectionsRef, "documents");
      setDoc(documentsRef, {
        uid,
        sectionId: documentsRef.id,
        sectionTitle: "Documents",
        placeholderText: "Add Item: e.g. Hotel Booking Info",
      });
      // Creating the uniqueIds
      const passportUniqueId = uuidv4();
      const flightTicketUniqueId = uuidv4();
      const visaUniqueId = uuidv4();
      const healthRecordsUniqueId = uuidv4();
      const driversLicenseUniqueId = uuidv4();

      const documentSectionItemsRef = collection(
        documentsRef,
        "packSectionItems"
      );
      setDoc(doc(documentSectionItemsRef, passportUniqueId), {
        id: passportUniqueId,
        uid,
        sectionId: documentsRef.id,
        name: "Passport",
        checked: false,
      });
      setDoc(doc(documentSectionItemsRef, flightTicketUniqueId), {
        id: flightTicketUniqueId,
        uid,
        sectionId: documentsRef.id,
        name: "Flight Ticket",
        checked: false,
      });
      setDoc(doc(documentSectionItemsRef, visaUniqueId), {
        id: visaUniqueId,
        uid,
        sectionId: documentsRef.id,
        name: "Visa",
        checked: true,
      });
      setDoc(doc(documentSectionItemsRef, healthRecordsUniqueId), {
        id: healthRecordsUniqueId,
        uid,
        sectionId: documentsRef.id,
        name: "Health Records",
        checked: false,
      });
      setDoc(doc(documentSectionItemsRef, driversLicenseUniqueId), {
        id: driversLicenseUniqueId,
        uid,
        sectionId: documentsRef.id,
        name: "Drivers License",
        checked: false,
      });

      // Electronics
      const electronicsRef = doc(sectionsRef, "electronics");
      setDoc(electronicsRef, {
        uid,
        sectionId: electronicsRef.id,
        sectionTitle: "Electronics",
        placeholderText: "Add Item.. e.g. iPad",
      });
      // Creating the uniqueIds
      const phoneChargerUniqueId = uuidv4();
      const cameraChargerUniqueId = uuidv4();
      const headPhonesUniqueId = uuidv4();
      const laptopUniqueId = uuidv4();
      const selfieStickUniqueId = uuidv4();

      const electronicsSectionItemsRef = collection(
        electronicsRef,
        "packSectionItems"
      );
      setDoc(doc(electronicsSectionItemsRef, phoneChargerUniqueId), {
        id: phoneChargerUniqueId,
        uid,
        sectionId: electronicsRef.id,
        name: "Phone + Charger",
        checked: false,
      });
      setDoc(doc(electronicsSectionItemsRef, cameraChargerUniqueId), {
        id: cameraChargerUniqueId,
        uid,
        sectionId: electronicsRef.id,
        name: "Camera + Charger",
        checked: false,
      });
      setDoc(doc(electronicsSectionItemsRef, headPhonesUniqueId), {
        id: headPhonesUniqueId,
        uid,
        sectionId: electronicsRef.id,
        name: "Headphones",
        checked: true,
      });
      setDoc(doc(electronicsSectionItemsRef, laptopUniqueId), {
        id: laptopUniqueId,
        uid,
        sectionId: electronicsRef.id,
        name: "Laptop",
        checked: false,
      });
      setDoc(doc(electronicsSectionItemsRef, selfieStickUniqueId), {
        id: selfieStickUniqueId,
        uid,
        sectionId: electronicsRef.id,
        name: "Selfie Stick",
        checked: false,
      });

      // Clothing
      const clothingRef = doc(sectionsRef, "clothing");
      setDoc(clothingRef, {
        uid,
        sectionId: clothingRef.id,
        sectionTitle: "Clothing",
        placeholderText: "Add Item.. e.g. Shorts",
      });
      // Creating the uniqueIds
      const tShirtsUniqueId = uuidv4();
      const jeansUniqueId = uuidv4();
      const scarfUniqueId = uuidv4();
      const rainJacketUniqueId = uuidv4();
      const pajamasUniqueId = uuidv4();

      const clothingSectionItemsRef = collection(
        clothingRef,
        "packSectionItems"
      );
      setDoc(doc(clothingSectionItemsRef, tShirtsUniqueId), {
        id: tShirtsUniqueId,
        uid,
        sectionId: clothingRef.id,
        name: "T-Shirts",
        checked: false,
      });
      setDoc(doc(clothingSectionItemsRef, jeansUniqueId), {
        id: jeansUniqueId,
        uid,
        sectionId: clothingRef.id,
        name: "Jeans",
        checked: false,
      });
      setDoc(doc(clothingSectionItemsRef, scarfUniqueId), {
        id: scarfUniqueId,
        uid,
        sectionId: clothingRef.id,
        name: "Scarf",
        checked: true,
      });
      setDoc(doc(clothingSectionItemsRef, rainJacketUniqueId), {
        id: rainJacketUniqueId,
        uid,
        sectionId: clothingRef.id,
        name: "Rain Jacket",
        checked: false,
      });
      setDoc(doc(clothingSectionItemsRef, pajamasUniqueId), {
        id: pajamasUniqueId,
        uid,
        sectionId: clothingRef.id,
        name: "Pajamas",
        checked: false,
      });

      // Toiletries
      const toiletriesRef = doc(sectionsRef, "toiletries");
      setDoc(toiletriesRef, {
        uid,
        sectionId: toiletriesRef.id,
        sectionTitle: "Toiletries",
        placeholderText: "Add Item.. e.g. Comb",
      });
      // Creating the uniqueIds
      const shampooConditionerUniqueId = uuidv4();
      const toothPasteBrushUniqueId = uuidv4();
      const sunscreenUniqueId = uuidv4();
      const bodyWashUniqueId = uuidv4();
      const deodrantUniqueId = uuidv4();

      const toiletriesSectionItemsRef = collection(
        toiletriesRef,
        "packSectionItems"
      );
      setDoc(doc(toiletriesSectionItemsRef, shampooConditionerUniqueId), {
        id: shampooConditionerUniqueId,
        uid,
        sectionId: toiletriesRef.id,
        name: "Shampoo + Conditioner",
        checked: false,
      });
      setDoc(doc(toiletriesSectionItemsRef, toothPasteBrushUniqueId), {
        id: toothPasteBrushUniqueId,
        uid,
        sectionId: toiletriesRef.id,
        name: "Toothpaste + Brush",
        checked: false,
      });
      setDoc(doc(toiletriesSectionItemsRef, sunscreenUniqueId), {
        id: sunscreenUniqueId,
        uid,
        sectionId: toiletriesRef.id,
        name: "Sunscreen",
        checked: true,
      });
      setDoc(doc(toiletriesSectionItemsRef, bodyWashUniqueId), {
        id: bodyWashUniqueId,
        uid,
        sectionId: toiletriesRef.id,
        name: "Body Wash",
        checked: false,
      });
      setDoc(doc(toiletriesSectionItemsRef, deodrantUniqueId), {
        id: deodrantUniqueId,
        uid,
        sectionId: toiletriesRef.id,
        name: "Deodrant",
        checked: false,
      });

      // Shoes
      const shoesRef = doc(sectionsRef, "shoes");
      setDoc(shoesRef, {
        uid,
        sectionId: shoesRef.id,
        sectionTitle: "Shoes",
        placeholderText: "Add Item.. e.g. Running Shoes",
      });
      // Creating the uniqueIds
      const sandalsUniqueId = uuidv4();
      const tennisShoesUniqueId = uuidv4();
      const ankleBootsUniqueId = uuidv4();

      const shoesSectionItemsRef = collection(shoesRef, "packSectionItems");
      setDoc(doc(shoesSectionItemsRef, sandalsUniqueId), {
        id: sandalsUniqueId,
        uid,
        sectionId: shoesRef.id,
        name: "Sandals",
        checked: false,
      });
      setDoc(doc(shoesSectionItemsRef, tennisShoesUniqueId), {
        id: tennisShoesUniqueId,
        uid,
        sectionId: shoesRef.id,
        name: "Tennis Shoes",
        checked: false,
      });
      setDoc(doc(shoesSectionItemsRef, ankleBootsUniqueId), {
        id: ankleBootsUniqueId,
        uid,
        sectionId: shoesRef.id,
        name: "Ankle Boots",
        checked: true,
      });
    }
  } catch (err) {
    console.log("error", err);
    const errorMessage = `Whoops! Could not load the pack sections & items`;
    dispatch(setAndShowErrorToast(errorMessage));
  }
};

export default loadPackItems;
