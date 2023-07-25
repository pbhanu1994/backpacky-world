const functions = require("firebase-functions");
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

// Getting the Environment Variable of Google Places API
const GOOGLE_PLACES_API_KEY = functions.config().google.places_api_key;

app.use(cors());

app.get("/places", async (req, res) => {
  try {
    const { input } = req.query;
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${GOOGLE_PLACES_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error proxying request");
  }
});

exports.default = functions.https.onRequest(app);
