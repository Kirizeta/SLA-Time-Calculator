import axios from "axios";

const API = "http://localhost:8713";

axios.defaults.withCredentials = true;

export const loginApi = (login, password) => {
  return axios.post(`${API}/auth/login`, {
    login,
    password
  });
};