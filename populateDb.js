import mysql from "mysql2/promise";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const apiKey = process.env.API_KEY;
const apiURL = "https://the-one-api.dev/v2";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

async function fetchData(apiUrl) {
  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    });
    console.log(response.data.docs);
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
}
const endpoint = "/character";
fetchData(`${apiURL}${endpoint}`);
