import { v4 as uuidv4 } from "uuid";
import { db } from "../../../../handlers/firebaseClient";
import setAndShowErrorToast from "../../config/toast/setAndShowErrorToast";

// TODO: Check with experienced dev (who knows firebase, firestore) if this is a good approach to load the data
const loadPackItems = () => async (dispatch, getState) => {
  const uid = getState().auth.user.uid;
  try {
    const pack = await db
      .collection("journal")
      .doc(uid)
      .collection("pack")
      .where("uid", "==", uid)
      .get();
    const packLength = pack.docs.length;

    if (packLength === 0) {
      const journalRef = db.collection("journal").doc(uid);
      journalRef.set({
        uid,
        createdAt: new Date().toISOString(),
        name: "journal",
      });

      const packRef = journalRef.collection("pack").doc(uid);
      packRef.set({ uid, name: "pack" });

      const sectionsRef = packRef.collection("packSections");

      //   Adding the Pack Sample Data
      // Documents
      const documentsRef = sectionsRef.doc("documents");
      documentsRef.set({
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

      const documentSectionItemsRef =
        documentsRef.collection("packSectionItems");
      documentSectionItemsRef.doc(passportUniqueId).set({
        id: passportUniqueId,
        uid,
        sectionId: documentsRef.id,
        name: "Passport",
        checked: false,
      });
      documentSectionItemsRef.doc(flightTicketUniqueId).set({
        id: flightTicketUniqueId,
        uid,
        sectionId: documentsRef.id,
        name: "Flight Ticket",
        checked: false,
      });
      documentSectionItemsRef.doc(visaUniqueId).set({
        id: visaUniqueId,
        uid,
        sectionId: documentsRef.id,
        name: "Visa",
        checked: true,
      });
      documentSectionItemsRef.doc(healthRecordsUniqueId).set({
        id: healthRecordsUniqueId,
        uid,
        sectionId: documentsRef.id,
        name: "Health Records",
        checked: false,
      });
      documentSectionItemsRef.doc(driversLicenseUniqueId).set({
        id: driversLicenseUniqueId,
        uid,
        sectionId: documentsRef.id,
        name: "Drivers License",
        checked: false,
      });

      // Electronics
      const electronicsRef = sectionsRef.doc("electronics");
      electronicsRef.set({
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

      const electronicsSectionItemsRef =
        electronicsRef.collection("packSectionItems");
      electronicsSectionItemsRef.doc(phoneChargerUniqueId).set({
        id: phoneChargerUniqueId,
        uid,
        sectionId: electronicsRef.id,
        name: "Phone + Charger",
        checked: false,
      });
      electronicsSectionItemsRef.doc(cameraChargerUniqueId).set({
        id: cameraChargerUniqueId,
        uid,
        sectionId: electronicsRef.id,
        name: "Camera + Charger",
        checked: false,
      });
      electronicsSectionItemsRef.doc(headPhonesUniqueId).set({
        id: headPhonesUniqueId,
        uid,
        sectionId: electronicsRef.id,
        name: "Headphones",
        checked: true,
      });
      electronicsSectionItemsRef.doc(laptopUniqueId).set({
        id: laptopUniqueId,
        uid,
        sectionId: electronicsRef.id,
        name: "Laptop",
        checked: false,
      });
      electronicsSectionItemsRef.doc(selfieStickUniqueId).set({
        id: selfieStickUniqueId,
        uid,
        sectionId: electronicsRef.id,
        name: "Selfie Stick",
        checked: false,
      });

      // Clothing
      const clothingRef = sectionsRef.doc("clothing");
      clothingRef.set({
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

      const clothingSectionItemsRef =
        clothingRef.collection("packSectionItems");
      clothingSectionItemsRef.doc(tShirtsUniqueId).set({
        id: tShirtsUniqueId,
        uid,
        sectionId: clothingRef.id,
        name: "T-Shirts",
        checked: false,
      });
      clothingSectionItemsRef.doc(jeansUniqueId).set({
        id: jeansUniqueId,
        uid,
        sectionId: clothingRef.id,
        name: "Jeans",
        checked: false,
      });
      clothingSectionItemsRef.doc(scarfUniqueId).set({
        id: scarfUniqueId,
        uid,
        sectionId: clothingRef.id,
        name: "Scarf",
        checked: true,
      });
      clothingSectionItemsRef.doc(rainJacketUniqueId).set({
        id: rainJacketUniqueId,
        uid,
        sectionId: clothingRef.id,
        name: "Rain Jacket",
        checked: false,
      });
      clothingSectionItemsRef.doc(pajamasUniqueId).set({
        id: pajamasUniqueId,
        uid,
        sectionId: clothingRef.id,
        name: "Pajamas",
        checked: false,
      });

      // Toiletries
      const toiletriesRef = sectionsRef.doc("toiletries");
      toiletriesRef.set({
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

      const toiletriesSectionItemsRef =
        toiletriesRef.collection("packSectionItems");
      toiletriesSectionItemsRef.doc(shampooConditionerUniqueId).set({
        id: shampooConditionerUniqueId,
        uid,
        sectionId: toiletriesRef.id,
        name: "Shampoo + Conditioner",
        checked: false,
      });
      toiletriesSectionItemsRef.doc(toothPasteBrushUniqueId).set({
        id: toothPasteBrushUniqueId,
        uid,
        sectionId: toiletriesRef.id,
        name: "Toothpaste + Brush",
        checked: false,
      });
      toiletriesSectionItemsRef.doc(sunscreenUniqueId).set({
        id: sunscreenUniqueId,
        uid,
        sectionId: toiletriesRef.id,
        name: "Sunscreen",
        checked: true,
      });
      toiletriesSectionItemsRef.doc(bodyWashUniqueId).set({
        id: bodyWashUniqueId,
        uid,
        sectionId: toiletriesRef.id,
        name: "Body Wash",
        checked: false,
      });
      toiletriesSectionItemsRef.doc(deodrantUniqueId).set({
        id: deodrantUniqueId,
        uid,
        sectionId: toiletriesRef.id,
        name: "Deodrant",
        checked: false,
      });

      // Shoes
      const shoesRef = sectionsRef.doc("shoes");
      shoesRef.set({
        uid,
        sectionId: shoesRef.id,
        sectionTitle: "Shoes",
        placeholderText: "Add Item.. e.g. Running Shoes",
      });
      // Creating the uniqueIds
      const sandalsUniqueId = uuidv4();
      const tennisShoesUniqueId = uuidv4();
      const ankleBootsUniqueId = uuidv4();

      const shoesSectionItemsRef = shoesRef.collection("packSectionItems");
      shoesSectionItemsRef.doc(sandalsUniqueId).set({
        id: sandalsUniqueId,
        uid,
        sectionId: shoesRef.id,
        name: "Sandals",
        checked: false,
      });
      shoesSectionItemsRef.doc(tennisShoesUniqueId).set({
        id: tennisShoesUniqueId,
        uid,
        sectionId: shoesRef.id,
        name: "Tennis Shoes",
        checked: false,
      });
      shoesSectionItemsRef.doc(ankleBootsUniqueId).set({
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
