import axios from "axios";

const API = axios.create({
  baseURL: " http://192.168.55.104:8000/api",
  withCredentials: true,
});

export default API;
