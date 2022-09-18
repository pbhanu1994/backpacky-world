import _ from "lodash";
import { db } from "../../../handlers/firebaseClient";
import { GET_BUDGET_ITEMS } from "../../actionTypes/travelBudget";
import setAndShowErrorToast from "../config/toast/setAndShowErrorToast";

const updateTravelBudgetItems =
  (personalIncomeSection) => (dispatch, getState) => {
    const uid = getState().auth.user.uid;
    const oldState = getState().travelBudget;
    const { personalIncome, beforeILeave, destinations } =
      personalIncomeSection;
    const { date, income, savings, other } = personalIncome;
    const personalIncomeKeys = Object.keys(personalIncome);
    const personalIncomeArray = personalIncomeKeys.map((key) => {
      if (key === "date") {
        return {
          date: new Date(date).toISOString(),
          uid,
          id: "personalIncomeDate",
          sectionId: "personalIncome",
        };
      }
      if (key === "income") {
        return {
          income,
          uid,
          id: "personalIncomeIncome",
          sectionId: "personalIncome",
        };
      }
      if (key === "savings") {
        return {
          savings,
          uid,
          id: "personalIncomeSavings",
          sectionId: "personalIncome",
        };
      }
      if (key === "other") {
        return {
          other,
          uid,
          id: "personalIncomeOther",
          sectionId: "personalIncome",
        };
      }
    });

    // Converting the Object to Array
    const destinationsArray = _.values(destinations);
    const oldDestinationsArray = _.values(oldState.destinations);

    // Personal Income
    const personalIncomeSectionId = "personalIncome";
    const beforeILeaveSectionId = "beforeILeave";
    const destinationsSectionId = "destinations";

    try {
      const batch = db.batch();
      const personalIncomeSectionRef = db
        .collection("travelBudget")
        .doc(uid)
        .collection("travelBudgetSections")
        .doc(personalIncomeSectionId)
        .collection("travelBudgetItems");

      const personalIncomeDateRef = personalIncomeSectionRef.doc("date");
      const personalIncomeIncomeRef = personalIncomeSectionRef.doc("income");
      const personalIncomeSavingsRef = personalIncomeSectionRef.doc("savings");
      const personalIncomeOtherRef = personalIncomeSectionRef.doc("other");

      batch.set(
        personalIncomeDateRef,
        {
          date: new Date(date).toISOString(),
        },
        { merge: true }
      );
      batch.set(
        personalIncomeIncomeRef,
        {
          income,
        },
        { merge: true }
      );
      batch.set(
        personalIncomeSavingsRef,
        {
          savings,
        },
        { merge: true }
      );
      batch.set(
        personalIncomeOtherRef,
        {
          other,
        },
        { merge: true }
      );

      // Before I Leave
      const beforeILeaveSectionRef = db
        .collection("travelBudget")
        .doc(uid)
        .collection("travelBudgetSections")
        .doc(beforeILeaveSectionId)
        .collection("travelBudgetItems");

      // Delete the deleted beforeIleave items
      const beforeILeaveDeletedItems = _.differenceBy(
        oldState.beforeILeave,
        beforeILeave,
        "id"
      );

      beforeILeaveDeletedItems.length > 0 &&
        beforeILeaveDeletedItems.map((beforeILeaveItem) => {
          const beforeILeaveDeletedDocRef = beforeILeaveSectionRef.doc(
            beforeILeaveItem.id
          );
          batch.delete(beforeILeaveDeletedDocRef);
        });

      // Set / Update the beforeILeave items
      beforeILeave.map((beforeILeaveItem) => {
        const beforeIleaveDocRef = beforeILeaveSectionRef.doc(
          beforeILeaveItem.id
        );

        batch.set(beforeIleaveDocRef, { ...beforeILeaveItem }, { merge: true });
      });

      // Destinations
      const destinationSectionsRef = db
        .collection("travelBudget")
        .doc(uid)
        .collection("travelBudgetSections")
        .doc(destinationsSectionId)
        .collection("destinationSections");

      // Delete the deleted Destination Sections
      const destinationDeletedSections = _.differenceBy(
        oldDestinationsArray,
        destinationsArray,
        "sectionId"
      );

      destinationDeletedSections.length > 0 &&
        destinationDeletedSections.map((destinationSection) => {
          const destinationSectionRef = destinationSectionsRef.doc(
            destinationSection.sectionId
          );
          const destinationSectionItemsRef = destinationSectionsRef
            .doc(destinationSection.sectionId)
            .collection("travelBudgetItems");

          const sectionItems = destinationSection.sectionItems;
          sectionItems &&
            sectionItems.map((sectionItem) => {
              const deleteSectionItemRef = destinationSectionItemsRef.doc(
                sectionItem.id
              );
              batch.delete(deleteSectionItemRef);
            });

          batch.delete(destinationSectionRef);
        });

      destinationsArray.map((destination) => {
        const { sectionId, sectionItems } = destination;
        const { sectionItems: oldDestinationSectionItems } =
          oldDestinationsArray.find((obj) => obj.sectionId === sectionId) || {};

        const destinationDeletedSectionItems = _.differenceBy(
          oldDestinationSectionItems,
          sectionItems,
          "id"
        );
        const destinationSectionRef = destinationSectionsRef.doc(sectionId);
        const destinationSectionItemsRef =
          destinationSectionRef.collection("travelBudgetItems");

        destinationDeletedSectionItems.map((sectionItem) => {
          const destinationItemRef = destinationSectionItemsRef.doc(
            sectionItem.id
          );
          batch.delete(destinationItemRef);
        });
      });

      // Set / Update the destination section & items
      destinationsArray.map((destination) => {
        const { uid, sectionId, sectionTitle, sectionItems } = destination;
        const destinationSectionRef = destinationSectionsRef.doc(sectionId);
        const destinationDocRef =
          destinationSectionRef.collection("travelBudgetItems");

        batch.set(
          destinationSectionRef,
          { uid, sectionId, sectionTitle },
          { merge: true }
        );

        sectionItems.map((sectionItem) => {
          const destinationItemRef = destinationDocRef.doc(sectionItem.id);
          batch.set(destinationItemRef, { ...sectionItem }, { merge: true });
        });
      });

      batch.commit().then(() => {
        dispatch({
          type: GET_BUDGET_ITEMS,
          payload: {
            personalIncome: personalIncomeArray,
            beforeILeave,
            destinations: destinationsArray,
          },
        });
      });
    } catch (err) {
      console.log("error", err);
      const errorMessage =
        "Whoops! Could not add the Personal Income Section. Please try again.";
      dispatch(setAndShowErrorToast(errorMessage));
      dispatch({
        type: GET_BUDGET_ITEMS,
        payload: oldState,
      });
    }
  };

export default updateTravelBudgetItems;
