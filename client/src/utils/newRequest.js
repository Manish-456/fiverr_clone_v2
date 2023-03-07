import axios from "axios";

const newRequest = axios.create({
    baseURL : "https://fiverrclone-web-v2.onrender.com/api",
    withCredentials : true
});

export default newRequest;