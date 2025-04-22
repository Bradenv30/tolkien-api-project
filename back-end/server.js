//Node.js server built with Express. Fetches APIs and connects the APIs to the front end
//Import dependencies
import express from "express";
import dotenv from "dotenv";
import axios from "axios";

//Load environmental variables
dotenv.config();

//Create Express server and define PORT
const server = express();
const PORT = process.env.PORT || 5000;
const apiKey = process.env.API_KEY;
const apiURL = "https://the-one-api.dev/v2";

//Create Axios instance with default config and connect to the external API
const axiosInstance = axios.create({
  baseURL: apiURL,
  headers: {
    Authorization: `Bearer ${apiKey}`,
  },
});

//Endpoint to fetch character data from API
server.get("/character", (req, res) => {
  axiosInstance
    .get("/character")
    .then((response) => {
      console.log("Fetched:", response.data);
      res.json(response.data); //return data retrieved (response.json) in json format
    })
    .catch((error) => {
      console.error("Error fetching:", error);
      res.status(500).json({ error: "Failed to fetch data from API" });
    });
});

//Endpoint to fetch quote data from API
server.get("/quote", (req, res) => {
  axiosInstance
    .get("/quote")
    .then((response) => {
      console.log("Fetched:", response.data);
      res.json(response.data); //return data retrieved (response.data) in json format
    })
    .catch((error) => {
      console.error("Error fetching:", error);
      res.status(500).json({ error: "Failed to fetch data from API" });
    });
});

//start server and listen on the defined port
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
