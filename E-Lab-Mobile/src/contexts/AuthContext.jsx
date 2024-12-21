import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Constants from "expo-constants";

const baseURL = Constants.expoConfig.extra.apiBaseUrl;
export const AuthContext = createContext();

// token yönetimi, kullanıcı login/logout sorumlu
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("accessToken");
        const storedRole = await AsyncStorage.getItem("role");
        if (storedToken && storedRole) {
          setAccessToken(storedToken);
          setRole(storedRole);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error checking auth state", error);
      }
    };
    checkAuth();
  }, []);

  const login = async (formData) => {
    try {
      console.log("Attempting to login with formData:", formData);

      const response = await axios.post(`${baseURL}/account/login`, formData);

      console.log("Login response:", response);

      if (response.data && response.data.data) {
        const { role, accessToken, refreshToken } = response.data.data;

        // token ve rol bilgilerini depola
        await AsyncStorage.setItem("role", role);
        await AsyncStorage.setItem("accessToken", accessToken);
        await AsyncStorage.setItem("refreshToken", refreshToken);

        // kullanıcı rol ve tokenler bilgilerini güncelle
        setRole(role);
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setIsAuthenticated(true);

        return response;
      } else {
        console.error("Unexpected response structure:", response);
      }
    } catch (error) {
      console.error("Login failed:", error);
      if (error.response) {
        console.error("Error response:", error.response); // Log error response if available
      }
      if (error.request) {
        console.error("Error request:", error.request); // Log error request if available
      }
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("role");
      setAccessToken(null);
      setRole(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return <AuthContext.Provider value={{ isAuthenticated, role, accessToken, login, logout }}>{children}</AuthContext.Provider>;
};
