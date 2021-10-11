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
      const documentSectionItemsRef =
        documentsRef.collection("packSectionItems");
      documentSectionItemsRef.add({
        uid,
        sectionId: documentsRef.id,
        name: "Passport",
        checked: false,
      });
      documentSectionItemsRef.add({
        uid,
        sectionId: documentsRef.id,
        name: "Flight Ticket",
        checked: false,
      });
      documentSectionItemsRef.add({
        uid,
        sectionId: documentsRef.id,
        name: "Visa",
        checked: true,
      });
      documentSectionItemsRef.add({
        uid,
        sectionId: documentsRef.id,
        name: "Health Records",
        checked: false,
      });
      documentSectionItemsRef.add({
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
      const electronicsSectionItemsRef =
        electronicsRef.collection("packSectionItems");
      electronicsSectionItemsRef.add({
        uid,
        sectionId: electronicsRef.id,
        name: "Phone + Charger",
        checked: false,
      });
      electronicsSectionItemsRef.add({
        uid,
        sectionId: electronicsRef.id,
        name: "Camera + Charger",
        checked: false,
      });
      electronicsSectionItemsRef.add({
        uid,
        sectionId: electronicsRef.id,
        name: "Headphones",
        checked: true,
      });
      electronicsSectionItemsRef.add({
        uid,
        sectionId: electronicsRef.id,
        name: "Laptop",
        checked: false,
      });
      electronicsSectionItemsRef.add({
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
      const clothingSectionItemsRef =
        clothingRef.collection("packSectionItems");
      clothingSectionItemsRef.add({
        uid,
        sectionId: clothingRef.id,
        name: "T-Shirts",
        checked: false,
      });
      clothingSectionItemsRef.add({
        uid,
        sectionId: clothingRef.id,
        name: "Jeans",
        checked: false,
      });
      clothingSectionItemsRef.add({
        uid,
        sectionId: clothingRef.id,
        name: "Scarf",
        checked: true,
      });
      clothingSectionItemsRef.add({
        uid,
        sectionId: clothingRef.id,
        name: "Rain Jacket",
        checked: false,
      });
      clothingSectionItemsRef.add({
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
      const toiletriesSectionItemsRef =
        toiletriesRef.collection("packSectionItems");
      toiletriesSectionItemsRef.add({
        uid,
        sectionId: toiletriesRef.id,
        name: "Shampoo + Conditioner",
        checked: false,
      });
      toiletriesSectionItemsRef.add({
        uid,
        sectionId: toiletriesRef.id,
        name: "Toothpaste + Brush",
        checked: false,
      });
      toiletriesSectionItemsRef.add({
        uid,
        sectionId: toiletriesRef.id,
        name: "Sunscreen",
        checked: true,
      });
      toiletriesSectionItemsRef.add({
        uid,
        sectionId: toiletriesRef.id,
        name: "Body Wash",
        checked: false,
      });
      toiletriesSectionItemsRef.add({
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
      const shoesSectionItemsRef = shoesRef.collection("packSectionItems");
      shoesSectionItemsRef.add({
        uid,
        sectionId: shoesRef.id,
        name: "Sandals",
        checked: false,
      });
      shoesSectionItemsRef.add({
        uid,
        sectionId: shoesRef.id,
        name: "Tennis Shoes",
        checked: false,
      });
      shoesSectionItemsRef.add({
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
