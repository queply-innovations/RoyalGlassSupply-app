import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/Products";
import { useEffect, useState } from "react";
import { Product } from "../types";

/**
 * Custom hook for fetching and managing products.
 * 
 * @returns An object containing the response data and loading state.
 */
export const useProductQuery = () => {
  // State of the response data and loading state
  const [data, setData] = useState<Product[]>([] as Product[]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Query for fetching products and isLoading state
  const {data: result, isLoading: loading} = useQuery({
    queryKey: ['products'],
    queryFn: () => fetchProducts(),
    refetchOnWindowFocus: false,
  });

  // Update states when query results changes [result, loading]
  useEffect(() => {
    if (loading) {
      setIsLoading(true)
    } else if (!loading && result) {
      setIsLoading(false)
      setData(result);
    };
  }, [result, loading]);

  return {data, isLoading};
}