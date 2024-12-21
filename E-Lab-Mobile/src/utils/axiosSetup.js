import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

const baseURL = Constants.expoConfig.extra.apiBaseUrl;

const axiosInstance = axios.create({
  baseURL,
  timeout: 7000,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("accessToken"); // depolanan jwt'yi al
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`; // API'ye yapılan isteklere ekle
      }
    } catch (error) {
      console.error("Error retrieving token from AsyncStorage:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
