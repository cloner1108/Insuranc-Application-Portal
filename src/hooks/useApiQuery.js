import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../services/axiosInterceptor";

/**
 * Custom hook for fetching data using React Query and Axios.
 * @param {string} key - Unique query key.
 * @param {string} url - API endpoint (relative to baseURL).
 * @param {object} options - Optional React Query options.
 */
const useApiQuery = (key, url, options = {}) => {
  return useQuery({
    queryKey: [key, url],
    queryFn: async () => {
      const { data } = await axiosInstance.get(url);
      return data;
    },
    ...options,
  });
};

export default useApiQuery;
