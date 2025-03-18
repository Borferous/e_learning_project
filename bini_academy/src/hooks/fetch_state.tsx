import { useState, useEffect } from "react";

type FetchState<T> = {
  isLoading: boolean;
  data: T | null;
  error: string | null;
};

export const useFetchData = <T,>(fetchFunction: () => Promise<T>) => {
  const [state, setState] = useState<FetchState<T>>({
    isLoading: true,
    data: null,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState({ isLoading: true, data: null, error: null });
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulate delay
        const result = await fetchFunction();
        setState({ isLoading: false, data: result, error: null });
      } catch (error: any) {
        setState({ isLoading: false, data: null, error: error.message });
      }
    };

    fetchData();
  }, [fetchFunction]);

  return state;
};
