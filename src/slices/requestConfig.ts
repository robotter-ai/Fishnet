import Cookies from "universal-cookie";

interface HeadersConfig {
    headers: {
        [key: string]: string;
    }
}

const cookies = new Cookies();
export const getConfig = (includeAuth = true) => {
    const config: HeadersConfig = {
        headers: {
            "Content-Type": "application/json",
        }
    };
  
    if (includeAuth) {
      const bearerToken = cookies.get("bearerToken");
      config.headers["Authorization"] = `Bearer ${bearerToken}`;
    }
  
    return config;
  };
  
export const getFormConfig = (includeAuth = true) => {
    const config: HeadersConfig = {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    };

    if (includeAuth) {
        const bearerToken = cookies.get("bearerToken");
        config.headers["Authorization"] = `Bearer ${bearerToken}`;
    }

    return config;
};

export const FISHNET_API_URL = import.meta.env.VITE_FISHNET_API_URL;
export const INDEXER_API_URL = import.meta.env.VITE_INDEXER_API_URL;