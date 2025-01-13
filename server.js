import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const apiKey = process.env.API_KEY;
const apiURL = "https://the-one-api.dev/v2";

const axiosInstance = axios.create({
  baseURL: apiURL,
  headers: {
    Authorization: `Bearer ${apiKey}`,
  },
});

axiosInstance
  .get("/chapter")
  .then((response) => {
    console.log("Fetched:", response.data);
  })
  .catch((error) => {
    console.error("Error fetching:", error);
  });
