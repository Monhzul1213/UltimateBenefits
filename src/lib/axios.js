import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

const instance = axios.create({
  baseURL: apiUrl,
  headers: {
    ultimateKey: apiKey,
  },
});
export default instance;
