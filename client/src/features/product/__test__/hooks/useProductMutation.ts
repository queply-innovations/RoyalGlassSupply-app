import { useMutation, useQueryClient } from "@tanstack/react-query";
import {fetchProducts, fetchProductPrices} from "../api/Products";
import { useProducts } from "../context/ProductContext";
import { Product } from "../types";

export const useProductMutation = () => {
  const queryClient = useQueryClient();
  const { productsData } = useProducts();

  // Configurations for mutation
  const mutationConfig = {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['productData'] });
    },
    onError: (error: any) => {
      console.error('Product Data failed', error);
    },
  };

  // TODO: Create an add, edit, and remove mutation functions

  return {};
};