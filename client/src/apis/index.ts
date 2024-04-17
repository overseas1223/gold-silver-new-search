import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

API.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    try {
      return Promise.reject(error);
    } catch (e) {
      console.log(error);
    }
  }
);

const ScrapeNews = (type: string) => API.post("/api/v1/scrape", { type: type });

export const apis = {
  ScrapeNews,
};
