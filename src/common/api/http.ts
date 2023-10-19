import axios from "axios";

axios.interceptors.request.use(
  (config) => {
    config.headers!.Authorization = `Bearer ${localStorage.getItem("token")}`;
    config.baseURL = process.env.REACT_APP_API_URL;

    return config;
  },
  (err) => Promise.reject(err),
);

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
};

export default http;
