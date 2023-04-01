import { v4 as uuidv4 } from "uuid";
import { db } from "../../../handlers/firebaseClient";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  query,
  where,
} from "firebase/firestore";
import setAndShowErrorToast from "../config/toast/setAndShowErrorToast";

// TODO: Check with experienced dev (who knows firebase, firestore) if this is a good approach to load the data
// TODO: REFACTOR THE CODE!!!
const loadTravelBudgetItems = () => async (dispatch, getState) => {
  const uid = getState().auth.user.uid;
  try {
    const travelRef = collection(db, "travelBudget");
    const travelQuery = query(travelRef, where("uid", "==", uid));
    const travelBudget = await getDocs(travelQuery);
    const travelBudgetDocsLength = travelBudget.docs.length;

    if (travelBudgetDocsLength === 0) {
      const travelBudgetRef = doc(db, "travelBudget", uid);
      setDoc(travelBudgetRef, {
        uid,
        createdAt: new Date().toISOString(),
        name: "Travel Budget",
      });
      const travelBudgetSectionsRef = collection(
        travelBudgetRef,
        "travelBudgetSections"
      );

      //   Adding the Travel Budget Sample Data
      //   Personal Income
      const personalIncomeRef = doc(travelBudgetSectionsRef, "personalIncome");
      setDoc(personalIncomeRef, {
        uid,
        sectionId: personalIncomeRef.id,
        sectionTitle: "Personal Income",
      });

      const personalIncomeSectionRef = collection(
        personalIncomeRef,
        "travelBudgetItems"
      );
      setDoc(doc(personalIncomeSectionRef, "date"), {
        id: "personalIncomeDate",
        uid,
        sectionId: personalIncomeRef.id,
        date: new Date().toISOString(),
      });
      setDoc(doc(personalIncomeSectionRef, "income"), {
        id: "personalIncomeIncome",
        uid,
        sectionId: personalIncomeRef.id,
        income: 0,
      });
      setDoc(doc(personalIncomeSectionRef, "savings"), {
        id: "personalIncomeSavings",
        uid,
        sectionId: personalIncomeRef.id,
        savings: 0,
      });
      setDoc(doc(personalIncomeSectionRef, "other"), {
        id: "personalIncomeOther",
        uid,
        sectionId: personalIncomeRef.id,
        other: 0,
      });

      // Before I Leave
      const beforeILeaveRef = doc(travelBudgetSectionsRef, "beforeILeave");
      setDoc(beforeILeaveRef, {
        uid,
        sectionId: beforeILeaveRef.id,
        sectionTitle: "Before I Leave",
      });
      // Creating the unique IDs
      const planeTicketUniqueId = uuidv4();
      const travelInsuranceUniqueId = uuidv4();
      const medsVaccinationUniqueId = uuidv4();
      const visaUniqueId = uuidv4();
      const suitCaseBackpackUniqueId = uuidv4();
      const travelGuideUniqueId = uuidv4();
      const cameraUniqueId = uuidv4();
      const chothingShoesUniqueId = uuidv4();
      const passportUniqueId = uuidv4();
      const phoneChargerUniqueId = uuidv4();
      const toiletriesUniqueId = uuidv4();

      const beforeILeaveSectionItemsRef = collection(
        beforeILeaveRef,
        "travelBudgetItems"
      );
      setDoc(doc(beforeILeaveSectionItemsRef, planeTicketUniqueId), {
        id: planeTicketUniqueId,
        uid,
        sectionId: beforeILeaveRef.id,
        name: "Plane Ticket",
        budget: 0,
        actual: 0,
      });
      setDoc(doc(beforeILeaveSectionItemsRef, travelInsuranceUniqueId), {
        id: travelInsuranceUniqueId,
        uid,
        sectionId: beforeILeaveRef.id,
        name: "Travel Insurance",
        budget: 0,
        actual: 0,
      });
      setDoc(doc(beforeILeaveSectionItemsRef, medsVaccinationUniqueId), {
        id: medsVaccinationUniqueId,
        uid,
        sectionId: beforeILeaveRef.id,
        name: "Meds/Vaccination",
        budget: 0,
        actual: 0,
      });
      setDoc(doc(beforeILeaveSectionItemsRef, visaUniqueId), {
        id: visaUniqueId,
        uid,
        sectionId: beforeILeaveRef.id,
        name: "Visa",
        budget: 0,
        actual: 0,
      });
      setDoc(doc(beforeILeaveSectionItemsRef, suitCaseBackpackUniqueId), {
        id: suitCaseBackpackUniqueId,
        uid,
        sectionId: beforeILeaveRef.id,
        name: "Suitcase/Backpack",
        budget: 0,
        actual: 0,
      });
      setDoc(doc(beforeILeaveSectionItemsRef, travelGuideUniqueId), {
        id: travelGuideUniqueId,
        uid,
        sectionId: beforeILeaveRef.id,
        name: "Travel Guide",
        budget: 0,
        actual: 0,
      });
      setDoc(doc(beforeILeaveSectionItemsRef, cameraUniqueId), {
        id: cameraUniqueId,
        uid,
        sectionId: beforeILeaveRef.id,
        name: "Camera",
        budget: 0,
        actual: 0,
      });
      setDoc(doc(beforeILeaveSectionItemsRef, chothingShoesUniqueId), {
        id: chothingShoesUniqueId,
        uid,
        sectionId: beforeILeaveRef.id,
        name: "Clothing/Shoes",
        budget: 0,
        actual: 0,
      });
      setDoc(doc(beforeILeaveSectionItemsRef, passportUniqueId), {
        id: passportUniqueId,
        uid,
        sectionId: beforeILeaveRef.id,
        name: "Passport",
        budget: 0,
        actual: 0,
      });
      setDoc(doc(beforeILeaveSectionItemsRef, phoneChargerUniqueId), {
        id: phoneChargerUniqueId,
        uid,
        sectionId: beforeILeaveRef.id,
        name: "Phone",
        budget: 0,
        actual: 0,
      });
      setDoc(doc(beforeILeaveSectionItemsRef, toiletriesUniqueId), {
        id: toiletriesUniqueId,
        uid,
        sectionId: beforeILeaveRef.id,
        name: "Toiletries",
        budget: 0,
        actual: 0,
      });

      //   Destinations
      const destinationsRef = doc(travelBudgetSectionsRef, "destinations");
      setDoc(destinationsRef, {
        uid,
        sectionId: destinationsRef.id,
        sectionTitle: "Destinations",
      });

      const destinationSectionsRef = collection(
        destinationsRef,
        "destinationSections"
      );
      const destinationOneRef = doc(destinationSectionsRef, "destinationOne");
      setDoc(destinationOneRef, {
        uid,
        sectionId: destinationOneRef.id,
        sectionTitle: "Destination One",
      });
      // Creating the unique IDs
      const mealsUniqueId = uuidv4();
      const transportUniqueId = uuidv4();
      const accommodationUniqueId = uuidv4();
      const activitiesGoingOutUniqueId = uuidv4();
      const purchasesUniqueId = uuidv4();

      const destinationOneSectionItemsRef = collection(
        destinationOneRef,
        "travelBudgetItems"
      );
      setDoc(doc(destinationOneSectionItemsRef, mealsUniqueId), {
        id: mealsUniqueId,
        uid,
        sectionId: destinationOneRef.id,
        name: "Meals",
        budget: 0,
        actual: 0,
      });
      setDoc(doc(destinationOneSectionItemsRef, transportUniqueId), {
        id: transportUniqueId,
        uid,
        sectionId: destinationOneRef.id,
        name: "Transport",
        budget: 0,
        actual: 0,
      });
      setDoc(doc(destinationOneSectionItemsRef, accommodationUniqueId), {
        id: accommodationUniqueId,
        uid,
        sectionId: destinationOneRef.id,
        name: "Accommodation",
        budget: 0,
        actual: 0,
      });
      setDoc(doc(destinationOneSectionItemsRef, activitiesGoingOutUniqueId), {
        id: activitiesGoingOutUniqueId,
        uid,
        sectionId: destinationOneRef.id,
        name: "Activities/Going Out",
        budget: 0,
        actual: 0,
      });
      setDoc(doc(destinationOneSectionItemsRef, purchasesUniqueId), {
        id: purchasesUniqueId,
        uid,
        sectionId: destinationOneRef.id,
        name: "Purchases",
        budget: 0,
        actual: 0,
      });
    }
  } catch (err) {
    console.log("error", err);
    const errorMessage = `Whoops! Could not load the Travel Budget sections & items`;
    dispatch(setAndShowErrorToast(errorMessage));
  }
};

export default loadTravelBudgetItems;
