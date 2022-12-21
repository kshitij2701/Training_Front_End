import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", // backend port 5000
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    const { token } = JSON.parse(localStorage.getItem("profile"));
    console.log("token", token);
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const signin = (formdata) => API.post("/user/signin", formdata);
export const signup = (formdata) => API.post("/user/signup", formdata);
export const googleLogIn = (res) => API.post("/user/googleLogIn", res);

export const createTour = (tourData) => API.post("/tour", tourData);