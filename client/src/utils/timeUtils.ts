export function formatAMPM(date: any) {
	let hours = date.getHours();
	let minutes = date.getMinutes();
	const ampm = hours >= 12 ? 'pm' : 'am';
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? '0' + minutes : minutes;
	const strTime = hours + ':' + minutes + ' ' + ampm;
	return strTime;
}

export const getDate = () => {
	const date = new Date();
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const time =
		date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

	return `${year}-${month}-${day} at ${time}`;
};
export const getDateNow = () => {
	const date = new Date();
	return date.toISOString();
};

export const formatUTCDate = (date: string) => {
	const utcDate = new Date(date); // Convert the UTC date string to a JavaScript Date object
	const year = utcDate.getFullYear(); // Extract individual components of the date
	const month = utcDate.getMonth() + 1; // Adding 1 since months are zero-indexed
	const day = utcDate.getDate();
	let hours = utcDate.getHours();
	const minutes = utcDate.getMinutes();
	const amOrPm = hours >= 12 ? 'PM' : 'AM'; // Determine AM or PM

	// Convert hours to 12-hour format
	hours = hours % 12;
	hours = hours || 12; // Handle midnight (0 hours) as 12 AM

	// Construct the formatted date and time string
	const formattedDateTime = `${year}-${month < 10 ? '0' : ''}${month}-${
		day < 10 ? '0' : ''
	}${day} ${hours}:${minutes < 10 ? '0' : ''}${minutes} ${amOrPm}`;

	return formattedDateTime;
};

export const formatUTCDateOnly = (date: string) => {
	const utcDate = new Date(date); // Convert the UTC date string to a JavaScript Date object
	const year = utcDate.getFullYear(); // Extract individual components of the date
	const month = utcDate.getMonth() + 1; // Adding 1 since months are zero-indexed
	const day = utcDate.getDate();
	// Construct the formatted date and time string
	const formattedDateTime = `${year}${month < 10 ? '0' : ''}${month}${
		day < 10 ? '0' : ''
	}${day}`;

	return formattedDateTime;
};
