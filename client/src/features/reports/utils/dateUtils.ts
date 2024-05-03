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

export {
	currentDate,
	firstDayOfCurrentMonth,
	lastDayOfPreviousMonth,
	firstDayOfPreviousMonth,
};
