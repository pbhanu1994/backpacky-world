import axios from "axios";

export const http = {
  get(url) {
    return axios.get(url);
  },
  post(url, body) {
    return axios.post(url, body);
  },
  put(url, body) {
    return axios.put(url, body);
  },
  patch(url, body) {
    return axios.patch(url, body);
  },
  delete(url) {
    return axios.delete(url);
  },
};
