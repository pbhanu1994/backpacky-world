import React from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../handlers/firebaseClient";
import {
  Document,
  Page,
  View,
  Text,
  // Image,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";

export const generatePdfAndStore = async (
  generatePdfContent,
  storagePath,
  fileName
) => {
  const styles = StyleSheet.create({
    table: { margin: 10 },
    row: { flexDirection: "row" },
    cell: { padding: 5, borderWidth: 1 },
    // logo: { width: 50, height: 50, marginRight: 10 },
  });

  const pdfContent = (
    <Document>
      <Page>
        <View style={styles.table}>
          {/* Add company logo at the top left */}
          <View style={{ flexDirection: "row", marginBottom: 10 }}>
            {/* TODO: Get the Logo Url - Possibly from Storage  */}
            {/* <Image src="[URL HERE]" style={styles.logo} /> */}
            <Text>Backpacky</Text>
          </View>

          {/* Rendering the rest of the PDF document content */}
          {generatePdfContent}
        </View>
      </Page>
    </Document>
  );

  // Converting to Blob
  const generatedPdfBlob = await pdf(pdfContent).toBlob();

  // Upload to Firebase Storage
  const storageRef = ref(storage, storagePath);
  const pdfRef = ref(storageRef, fileName);
  await uploadBytes(pdfRef, generatedPdfBlob);

  // Get download URL
  const downloadURL = await getDownloadURL(pdfRef);

  return { pdfBlob: generatedPdfBlob, downloadURL };
};
