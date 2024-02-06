const storage = {
	setUserSession: (user: string) => {
		window.localStorage.setItem('user', JSON.stringify(user));
	},

	getUserSession: () => {
		return JSON.parse(window.localStorage.getItem('user') as string);
	},

	clearUserSession: () => {
		window.localStorage.removeItem('user');
	},

	setToken: (token: string) => {
		window.localStorage.setItem('token', JSON.stringify(token));
	},

	getToken: () => {
		return JSON.parse(window.localStorage.getItem('token') as string);
	},

	clearToken: () => {
		window.localStorage.removeItem('token');
	},

	setLogIn: () => {
		window.localStorage.setItem('isLoggedIn', JSON.stringify(true));
		return true;
	},

	getLogIn: () => {
		const isLoggedInString = window.localStorage.getItem('isLoggedIn');
		const isLoggedIn = isLoggedInString
			? JSON.parse(isLoggedInString)
			: false;
		return isLoggedIn;
	},

	clearLogIn: () => {
		window.localStorage.removeItem('isLoggedIn');
		return false;
	},
};

export default storage;
