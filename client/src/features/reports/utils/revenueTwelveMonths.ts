import { Invoices } from '@/features/invoice/__test__/types';

export const revenueTwelveMonths = (invoices: Invoices[]) => {
	// Function to get the month and year from a date string
	const getMonthAndYear = (dateString: string) => {
		const date = new Date(dateString);
		return {
			month: date.getMonth() + 1, // Month is 0-indexed
			year: date.getFullYear(),
		};
	};

	// Get the current month and year
	const currentDate = new Date();
	const currentMonth = currentDate.getMonth() + 1; // Month is 0-indexed
	const currentYear = currentDate.getFullYear();

	// Calculate the starting month and year for the last 12 months
	let startMonth = currentMonth - 11;
	let startYear = currentYear;
	if (startMonth <= 0) {
		startMonth += 12;
		startYear -= 1;
	}

	// Filter invoices for the last 12 months
	const invoicesLastTwelveMonths = invoices.filter(invoice => {
		const { month, year } = getMonthAndYear(invoice.created_at);
		return (
			(year === startYear && month >= startMonth) ||
			(year === currentYear && month <= currentMonth)
		);
	});

	const totalAmountDueByMonth: { [key: string]: number } = {};

	// Group invoices by month and year, calculating the sum of total_amount_due for each group
	invoicesLastTwelveMonths.forEach(invoice => {
		const { month, year } = getMonthAndYear(invoice.created_at);
		const key = `${year}-${month}`;
		if (!totalAmountDueByMonth[key]) {
			totalAmountDueByMonth[key] = 0;
		}
		totalAmountDueByMonth[key] += invoice.total_amount_due;
	});

	// Prepare data for the line graph
	const lastTwelveMonths: string[] = [];
	const salesRevenueLastTwelveMonths: number[] = [];
	for (let i = 0; i < 12; i++) {
		let month = startMonth + i;
		let year = startYear;
		if (month > 12) {
			month -= 12;
			year += 1;
		}
		lastTwelveMonths.push(`${year}-${month}`);
		salesRevenueLastTwelveMonths.push(
			totalAmountDueByMonth[`${year}-${month}`] || 0,
		);
	}

	return { lastTwelveMonths, salesRevenueLastTwelveMonths };
};
