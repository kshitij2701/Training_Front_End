import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", // backend port 5000
});

export const signin = (formdata) => API.post("/user/signin", formdata);