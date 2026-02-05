import axios from "axios";

const instance = axios.create({
  baseURL: "https://cybergram-server.onrender.com/api",
  withCredentials: false
});

// ✅ ALWAYS ATTACH TOKEN (LOCAL + SESSION)
instance.interceptors.request.use((config) => {

  const token =
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ✅ BETTER ERROR DEBUGGING
instance.interceptors.response.use(
  res => res,
  err => {
    console.log("API ERROR:", err?.response?.data || err.message);
    return Promise.reject(err);
  }
);

export default instance;
