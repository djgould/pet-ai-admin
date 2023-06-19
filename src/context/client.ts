import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { useEffect } from "react";

export function useClient() {
  const { getToken } = useAuth();

  const client = axios.create({
    baseURL: "https://pet-ai-backend.onrender.com",
  });

  client.interceptors.request.use(
    async (config) => {
      try {
        // Retrieve the token asynchronously
        const token = await getToken();

        // Modify the request config to add the header
        config.headers["Authorization"] = `Bearer ${token}`;

        return config;
      } catch (error) {
        // Handle errors
        console.error(error);
        return Promise.reject(error);
      }
    },
    (error) => {
      // Handle request errors
      return Promise.reject(error);
    }
  );

  return client;
}
