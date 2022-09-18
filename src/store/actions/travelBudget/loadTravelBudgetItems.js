import { v4 as uuidv4 } from "uuid";
import { db } from "../../../handlers/firebaseClient";
import setAndShowErrorToast from "../config/toast/setAndShowErrorToast";

// TODO: Check with experienced dev (who knows firebase, firestore) if this is a good approach to load the data
// TODO: REFACTOR THE CODE!!!
const loadTravelBudgetItems = () => async (dispatch, getState) => {
  const uid = getState().auth.user.uid;
  try {
    const travelBudget = await db
      .collection("travelBudget")
      .where("uid", "==", uid)
      .get();
    const travelBudgetDocsLength = travelBudget.docs.length;

    if (travelBudgetDocsLength === 0) {
      const travelBudgetRef = db.collection("travelBudget").doc(uid);
      travelBudgetRef.set({
        uid,
        createdAt: new Date().toISOString(),
        name: "Travel Budget",
      });

      const travelBudgetSectionsRef = travelBudgetRef.collection(
        "travelBudgetSections"
      );

      //   Adding the Travel Budget Sample Data
      //   Personal Income
      const personalIncomeRef = travelBudgetSectionsRef.doc("personalIncome");
      personalIncomeRef.set({
        uid,
        sectionId: personalIncomeRef.id,
        sectionTitle: "Personal Income",
      });

      const personalIncomeSectionRef =
        personalIncomeRef.collection("travelBudgetItems");
      personalIncomeSectionRef.doc("date").set({
        id: "personalIncomeDate",
        uid,
        sectionId: personalIncomeRef.id,
        date: new Date().toISOString(),
      });
      personalIncomeSectionRef.doc("income").set({
        id: "personalIncomeIncome",
        uid,
        sectionId: personalIncomeRef.id,
        income: "",
      });
      personalIncomeSectionRef.doc("savings").set({
        id: "personalIncomeSavings",
        uid,
        sectionId: personalIncomeRef.id,
        savings: "",
      });
      personalIncomeSectionRef.doc("other").set({
        id: "personalIncomeOther",
        uid,
        sectionId: personalIncomeRef.id,
        other: "",
      });

      // Before I Leave
      const beforeILeaveRef = travelBudgetSectionsRef.doc("beforeILeave");
      beforeILeaveRef.set({
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

      const beforeILeaveSectionItemsRef =
        beforeILeaveRef.collection("travelBudgetItems");
      beforeILeaveSectionItemsRef.doc(planeTicketUniqueId).set({
        id: planeTicketUniqueId,
        uid,
        sectionId: beforeILeaveRef.id,
        name: "Plane Ticket",
        budget: "",
        actual: "",
      });
      beforeILeaveSectionItemsRef.doc(travelInsuranceUniqueId).set({
        id: travelInsuranceUniqueId,
        uid,
        sectionId: beforeILeaveRef.id,
        name: "Travel Insurance",
        budget: "",
        actual: "",
      });
      beforeILeaveSectionItemsRef.doc(medsVaccinationUniqueId).set({
        id: medsVaccinationUniqueId,
        uid,
        sectionId: beforeILeaveRef.id,
        name: "Meds/Vaccination",
        budget: "",
        actual: "",
      });
      beforeILeaveSectionItemsRef.doc(visaUniqueId).set({
        id: visaUniqueId,
        uid,
        sectionId: beforeILeaveRef.id,
        name: "Visa",
        budget: "",
        actual: "",
      });
      beforeILeaveSectionItemsRef.doc(suitCaseBackpackUniqueId).set({
        id: suitCaseBackpackUniqueId,
        uid,
        sectionId: beforeILeaveRef.id,
        name: "Suitcase/Backpack",
        budget: "",
        actual: "",
      });
      beforeILeaveSectionItemsRef.doc(travelGuideUniqueId).set({
        id: travelGuideUniqueId,
        uid,
        sectionId: beforeILeaveRef.id,
        name: "Travel Guide",
        budget: "",
        actual: "",
      });
      beforeILeaveSectionItemsRef.doc(cameraUniqueId).set({
        id: cameraUniqueId,
        uid,
        sectionId: beforeILeaveRef.id,
        name: "Camera",
        budget: "",
        actual: "",
      });
      beforeILeaveSectionItemsRef.doc(chothingShoesUniqueId).set({
        id: chothingShoesUniqueId,
        uid,
        sectionId: beforeILeaveRef.id,
        name: "Clothing/Shoes",
        budget: "",
        actual: "",
      });
      beforeILeaveSectionItemsRef.doc(passportUniqueId).set({
        id: passportUniqueId,
        uid,
        sectionId: beforeILeaveRef.id,
        name: "Passport",
        budget: "",
        actual: "",
      });
      beforeILeaveSectionItemsRef.doc(phoneChargerUniqueId).set({
        id: phoneChargerUniqueId,
        uid,
        sectionId: beforeILeaveRef.id,
        name: "Phone",
        budget: "",
        actual: "",
      });
      beforeILeaveSectionItemsRef.doc(toiletriesUniqueId).set({
        id: toiletriesUniqueId,
        uid,
        sectionId: beforeILeaveRef.id,
        name: "Toiletries",
        budget: "",
        actual: "",
      });

      //   Destinations
      const destinationsRef = travelBudgetSectionsRef.doc("destinations");
      destinationsRef.set({
        uid,
        sectionId: destinationsRef.id,
        sectionTitle: "Destinations",
      });

      const destinationSectionsRef = destinationsRef.collection(
        "destinationSections"
      );
      const destinationOneRef = destinationSectionsRef.doc("destinationOne");
      destinationOneRef.set({
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

      const destinationOneSectionItemsRef =
        destinationOneRef.collection("travelBudgetItems");
      destinationOneSectionItemsRef.doc(mealsUniqueId).set({
        id: mealsUniqueId,
        uid,
        sectionId: destinationOneRef.id,
        name: "Meals",
        budget: "",
        actual: "",
      });
      destinationOneSectionItemsRef.doc(transportUniqueId).set({
        id: transportUniqueId,
        uid,
        sectionId: destinationOneRef.id,
        name: "Transport",
        budget: "",
        actual: "",
      });
      destinationOneSectionItemsRef.doc(accommodationUniqueId).set({
        id: accommodationUniqueId,
        uid,
        sectionId: destinationOneRef.id,
        name: "Accommodation",
        budget: "",
        actual: "",
      });
      destinationOneSectionItemsRef.doc(activitiesGoingOutUniqueId).set({
        id: activitiesGoingOutUniqueId,
        uid,
        sectionId: destinationOneRef.id,
        name: "Activities/Going Out",
        budget: "",
        actual: "",
      });
      destinationOneSectionItemsRef.doc(purchasesUniqueId).set({
        id: purchasesUniqueId,
        uid,
        sectionId: destinationOneRef.id,
        name: "Purchases",
        budget: "",
        actual: "",
      });
    }
  } catch (err) {
    console.log("error", err);
    const errorMessage = `Whoops! Could not load the Travel Budget sections & items`;
    dispatch(setAndShowErrorToast(errorMessage));
  }
};

export default loadTravelBudgetItems;
