const functions = require("firebase-functions");
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/places", async (req, res) => {
  try {
    const { input } = req.query;
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=AIzaSyBVc4HiK4WQXZJ6TVbws1TkepSbzRIHXzs`
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error proxying request");
  }
});

exports.default = functions.https.onRequest(app);
