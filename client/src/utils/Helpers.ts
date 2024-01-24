export const getNextId = (data: any[] | undefined) => {
	if (!data || data.length === 0) {
		return 1;
	} else {
		const highestId = Math.max(...data.map((data: any) => data.id));
		return highestId + 1;
	}
};
