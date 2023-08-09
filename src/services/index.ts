import axios from 'axios';
import store from 'store';
import { useDispatch } from 'react-redux';
import { loadingAction } from 'store/actions/loadingAction';
import { toast } from 'utils/common';
import useStorage, { USER_DATA, getUserStorage } from 'hooks/useStorage';
import I18n from 'utils/language/i18n';
import { userDataAction } from 'store/actions/userActions';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';
import Config from 'react-native-config';

const getUserStorageLogin = async (key: string) => {
	try {
		const value = await AsyncStorage.getItem(key);
		if (value !== null) {
			return JSON.parse(value);
		}
		return false;
	} catch (error) {
		return false;
	}
};

const getLogInData = async () => {
	const result = await getUserStorageLogin('@USER_DATA:key');
	return result;
};

export const instance = axios.create({
	timeout: 30000,
	baseURL: Config.API_URL,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
});

export function removeToken() {
	delete instance.defaults.headers.common.Authorization;
}

// Add a request interceptor
instance.interceptors.request.use(
	async function (config) {
		const auth = await getLogInData();

		if (auth && auth.accessToken) {
			config.headers.Authorization = `Bearer ${auth.accessToken}`;
		} else {
			delete config.headers.Authorization;
		}
		return config;
	},
	function (error) {
		return Promise.reject(error);
	},
);

// Add a response interceptor
instance.interceptors.response.use(
	function (response) {
		return response;
	},
	async function (error) {
		NetInfo.fetch().then(state => {
			if (!state.isConnected) {
				toast('error', I18n.t('NO_NETWORK'));
			}
		});
		const originalConfig = error.config;
		if (error.response.status === 401 && !originalConfig._retry) {
			originalConfig._retry = true;
			const result = await getUserStorage(`@${USER_DATA}:key`);
			const oldToken = result.refreshToken;
			return instance
				.post(apiPaths.refreshToken, { token: oldToken })
				.then(res => {
					const newToken = res.data.data.refreshToken;
					error.config.headers.Authorization = `Bearer ${newToken}`;
					return axios.request(originalConfig);
				})
				.catch(async err => {
					store.dispatch(loadingAction(true));
					removeToken();
					store.dispatch(userDataAction({}));
					await AsyncStorage.removeItem(`@${USER_DATA}:key`);
					store.dispatch(loadingAction(false));
					throw err;
				});
		}
		return Promise.reject(error);
	},
);

export const apiPaths = {
	login: 'auth/sign-in',
	refreshToken: 'auth/refresh-token',
};

function useRequest() {
	const { clearUserStorage } = useStorage();
	const dispatch = useDispatch();

	const handleResponse = (res: any) => {
		if (res.status === 200 || res.status === 201) {
			return res.data;
		}
	};

	const handleError = (error: any) => {
		dispatch(loadingAction(false));
		if (error && error.response && error.response.data && error.response.data.errors) {
			if (error.response.status === 401) {
				toast('error', error.response.data.errors[0]);
				return clearUserStorage();
			} else if (error.response.data) {
				toast('error', error.response.data.message);
				throw error.response.data;
			}
		}
		return error;
	};

	const getRequest = async (url: string, params?: any) => {
		try {
			const res = await instance.get(url, { params });
			return handleResponse(res);
		} catch (error: any) {
			return handleError(error);
		}
	};

	const postRequest = async (url: string, data?: any) => {
		try {
			const res = await instance.post(url, data);
			return handleResponse(res);
		} catch (error: any) {
			return handleError(error);
		}
	};

	const putRequest = async (url: string, data?: any) => {
		try {
			const res = await instance.put(url, data);
			return handleResponse(res);
		} catch (error: any) {
			return handleError(error);
		}
	};

	const patchRequest = async (url: string, data?: any) => {
		try {
			const res = await instance.patch(url, data);
			return handleResponse(res);
		} catch (error: any) {
			return handleError(error);
		}
	};

	const deleteRequest = async (url: string, params?: any) => {
		try {
			const res = await instance.delete(url, { data: params });
			return handleResponse(res);
		} catch (error: any) {
			return handleError(error);
		}
	};

	return {
		getRequest,
		postRequest,
		putRequest,
		patchRequest,
		deleteRequest,
	};
}

export default useRequest;
