import { getUser } from '@/features/auth/api/getUser';
import { LoginCredentials, LoginUser } from '@/features/auth/api/Login';
import { UserResponse } from '@/features/auth/types';
import { Spinner } from '@/components/Loader';
import storage from '@/utils/storage';

export async function handleUserResponse(data: UserResponse) {
	const { user, token } = data;
	storage.setToken(token);
	return user;
}

export async function loadUser(id: number) {
	if (storage.getToken()) {
		const data = await getUser(id);
		return data;
	}
	return null;
}

export async function loginFn(data: LoginCredentials) {
	const response = await LoginUser(data);
	const user = await handleUserResponse(response);
	return user;
}

export async function logoutFn() {
	storage.clearToken();
	window.location.assign(window.location.origin as unknown as string);
}
