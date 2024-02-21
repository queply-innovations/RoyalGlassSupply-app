import { useQuery } from "@tanstack/react-query";
import { fetchProductPrices, fetchProducts } from "../api/Products";
import { useEffect, useState } from "react";
import { ProductPrices } from "../types";


/**
 * Custom hook for fetching and managing product data.
 * @returns An object containing the fetched products and the query status.
 */
export const useProductQuery = () => {
  // State management of product data
  const [productsData, setProductsData] = useState<ProductPrices[]>([]);

  // Query for fetching product data
  const productQuery = useQuery({
    queryKey: ['products'],
    queryFn: () => fetchProducts(),
    refetchOnWindowFocus: false,
  });

  const productPriceQuery = useQuery({
    queryKey: ['productData'],
    queryFn: () => fetchProductPrices(),
    refetchOnWindowFocus: false,
  })


  // Update state when product query changes
  useEffect(() => {
    const { data: product } = productPriceQuery;
    if (product) {
      setProductsData(product);
    }
  }, [productPriceQuery]);

  return {productsData, productQuery, productPriceQuery};
}