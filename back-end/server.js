import express from "express";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const server = express();
const PORT = process.env.PORT || 5000;
const apiKey = process.env.API_KEY;
const apiURL = "https://the-one-api.dev/v2";

const axiosInstance = axios.create({
  baseURL: apiURL,
  headers: {
    Authorization: `Bearer ${apiKey}`,
  },
});

server.get("/character", (req, res) => {
  axiosInstance
    .get("/character")
    .then((response) => {
      console.log("Fetched:", response.data);
      res.json(response.data);
    })
    .catch((error) => {
      console.error("Error fetching:", error);
      res.status(500).json({ error: "Failed to fetch data from API" });
    });
});

server.get("/quote", (req, res) => {
  axiosInstance
    .get("/quote")
    .then((response) => {
      console.log("Fetched:", response.data);
      res.json(response.data);
    })
    .catch((error) => {
      console.error("Error fetching:", error);
      res.status(500).json({ error: "Failed to fetch data from API" });
    });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
