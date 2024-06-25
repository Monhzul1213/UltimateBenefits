import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;
const apiToken = process.env.REACT_APP_API_TOKEN;

const instance = axios.create({
  baseURL: apiUrl,
  headers: {
    ultimateKey: apiKey,
    Authorization: `Bearer ${apiToken}`,
  },
});
export default instance;
