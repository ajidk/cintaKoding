import axios, { AxiosRequestConfig } from "axios";
import { server } from "./server";

const connection = axios.create({
  baseURL: server,
});

connection.interceptors.request.use(
  async (config: any) => {
    const userData = window.localStorage.getItem("user_session");

    let tokenData = null;
    let lang = "id";
    if (userData) {
      const transformedData = JSON.parse(userData);
      const { token, data } = transformedData;
      tokenData = token;
      lang = data ? data.language : "id";
    }
    config.headers = {
      "Content-Type": "multipart/form-data",
      Accept: "*/*",
      Authorization: "Bearer " + tokenData,
      lang: lang,
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default connection;
