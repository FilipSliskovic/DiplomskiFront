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
    if (
      response.config.method === "post" ||
      response.config.method === "put" ||
      response.config.method === "delete"
    ) {
      store.dispatch("showAlert", {
        Message: "Success!",
        AlertType: "success",
      });
    }

    return response;
  },
  (error) => {
    store.dispatch("hideLoader");
    error.response.data.errors.forEach((e) => {
      store.dispatch("showAlert", {
        Message: e.error,
        AlertType: "error",
      });
    });

    return Promise.reject(error);
  }
);

export default instance;
