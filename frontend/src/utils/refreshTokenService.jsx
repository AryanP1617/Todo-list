import { useEffect } from "react";
import { refreshAccessToken } from "./refresh.js";

export const useTokenRefresher = () => {
  useEffect(() => {
    
    refreshAccessToken();

    
    const interval = setInterval(() => {
      refreshAccessToken();
    }, 14 * 60 * 1000); 

    return () => clearInterval(interval);
  }, []);
};
