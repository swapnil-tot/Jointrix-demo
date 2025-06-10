import axios from "axios";

let axiosInstance = axios.create({
  baseURL: `http://localhost:3001/api`,
  // baseURL: 'https://demo.one24.co/Api/Tracker/',
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
