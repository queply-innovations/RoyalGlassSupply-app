const currentDate = new Date();
const firstDayOfCurrentMonth = new Date(
	currentDate.getFullYear(),
	currentDate.getMonth(),
	1,
);

const lastDayOfPreviousMonth = new Date(firstDayOfCurrentMonth.getTime() - 1);
const firstDayOfPreviousMonth = new Date(
	lastDayOfPreviousMonth.getFullYear(),
	lastDayOfPreviousMonth.getMonth(),
	1,
);

function dateToString(date: Date) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so add 1
	const day = String(date.getDate()).padStart(2, '0');

	return `${year}-${month}-${day}`;
}

export {
	currentDate,
	firstDayOfCurrentMonth,
	lastDayOfPreviousMonth,
	firstDayOfPreviousMonth,
	dateToString,
};
