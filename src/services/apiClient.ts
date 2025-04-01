import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://jsonfakery.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
