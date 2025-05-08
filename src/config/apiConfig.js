const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const apiConfig = {
  baseURL: API_BASE_URL,
  // timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
};

export default apiConfig;
