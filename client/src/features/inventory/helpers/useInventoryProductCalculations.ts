/**
 * Calculates the total count of a product by subtracting the damaged count from the stocks count.
 * @param stocksCount The number of stocks for the product.
 * @param damagedCount The number of damaged products.
 * @returns The total count of the product.
 */
const getTotalCount = (stocksCount: number, damagedCount: number) => {
	return stocksCount - damagedCount;
};

export { getTotalCount };
