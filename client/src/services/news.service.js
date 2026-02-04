import axios from "../api/axios";

export const getCyberNews = () => {
  return axios.get("/news/cyber");
};
