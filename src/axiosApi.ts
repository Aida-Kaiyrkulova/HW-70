import axios from "axios";

const axiosApi = axios.create({
  baseURL:
    "https://phonebook-9b06a-default-rtdb.europe-west1.firebasedatabase.app/",
});

export default axiosApi;
