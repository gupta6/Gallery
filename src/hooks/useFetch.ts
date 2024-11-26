import { useCallback, useState } from "react";
import { delay } from "../utils/helpers";

type UseFetchResponse<T> = {
  data: T | undefined;
  isLoading: boolean;
  error?: unknown;
  fetchData: (params?: RequestInit) => void;
};

export const useFetch = <T>(url: string): UseFetchResponse<T> => {
  const [data, setData] = useState<T | undefined>();
  const [error, setError] = useState<Error | unknown>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = useCallback(async (params: RequestInit = {}) => {
    const controller = new AbortController();
    try {
      setIsLoading(true);
      const response = await fetch(url, { ...params });
      await delay(3000);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const responseData = await response.json();
      setData(responseData);
    } catch (err: unknown) {
      setError(err);
    } finally {
      setIsLoading(false);
    }

    return () => controller.abort();
  }, []);

  return { data, isLoading, fetchData, error };
};
