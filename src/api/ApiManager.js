import axios from "axios"

const ApiManager = axios.create({
    baseURl:"http://127.0.0.1:8000/",
    responseType:'json',
    withCredentials:true,
});

export default ApiManager;