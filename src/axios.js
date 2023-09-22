import axios from "axios";
import store from "./store";

const instance = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 10000,
});

instance.interceptors.request.use(
  (config) => {
    store.dispatch("showLoader");
    return config;
  },
  (error) => {
    store.dispatch("hideLoader");
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    store.dispatch("hideLoader");
    if (response.config.method === "post") {
      store.dispatch("showAlert", {
        Message: "Success!",
        AlertType: "success",
      });
    }

    return response;
  },
  (error) => {
    store.dispatch("hideLoader");
    return Promise.reject(error);
  }
);

export default instance;
