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

	setUserRole: (role: string) => {
		window.localStorage.setItem('user_role', role);
	},

	setToken: (token: string) => {
		window.localStorage.setItem('token', token);
	},

	getToken: () => {
		return window.localStorage.getItem('token');
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
		window.localStorage.clear();
		return false;
	},
};

export default storage;
