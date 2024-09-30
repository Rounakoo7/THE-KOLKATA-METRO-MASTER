import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:1010",
});

export default API;