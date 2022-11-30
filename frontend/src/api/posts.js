import axios from "axios";

export default axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: "https://truckingjournal-api.onrender.com/",
  withCredentials: true,
});
