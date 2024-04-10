import currency from 'currency.js';

/**
 * Calculates the markup percentage based on the given value and markup value.
 *
 * @param value - The original value.
 * @param markupValue - The markup value.
 * @param precision - The decimal places of the calculated percentage (default: 2).
 * @returns The markup percentage.
 */
const getMarkupPercentage = (
	value: number,
	markupValue: number,
	precision: number = 2,
) => {
	return currency((markupValue / value) * 100, {
		precision: precision,
	}).value;
};

/**
 * Calculates the markup value based on the given value and markup percentage.
 * @param value - The original value.
 * @param markupPercent - The markup percentage.
 * @param precision - The decimal places of the calculated value (default: 2).
 * @returns The calculated markup value.
 */
const getMarkupValue = (
	value: number,
	markupPercent: number,
	precision: number = 2,
) => {
	return currency(currency(value).multiply(markupPercent / 100), {
		precision: precision,
	}).value;
};

/**
 * Calculates the cost value by adding two values and returning the result.
 *
 * @param value1 - The first value to be added.
 * @param value2 - The second value to be added.
 * @param precision - The decimal places of the calculated value (default: 2).
 * @returns The cost value calculated by adding `value1` and `value2`.
 */
const getCostValue = (
	value1: number,
	value2: number,
	precision: number = 2,
) => {
	return currency(currency(value1).add(value2), {
		precision: precision,
	}).value;
};

/**
 * Calculates the price value by subtracting value2 from value1.
 *
 * @param value1 - The first value.
 * @param value2 - The second value.
 * @param precision - The decimal places of the calculated value (default: 2).
 * @returns The calculated price value.
 */
const getPriceValue = (
	value1: number,
	value2: number,
	precision: number = 2,
) => {
	return currency(currency(value1).subtract(value2), { precision: precision })
		.value;
};

export { getMarkupPercentage, getMarkupValue, getCostValue, getPriceValue };
