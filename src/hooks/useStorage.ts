import AsyncStorage from '@react-native-community/async-storage';
import { navigateAndClearStack } from 'navigation/service';
import screenNames from 'utils/screenName';

const ACCESS_TOKEN = 'ACCESS_TOKEN';
const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const USER_DATA = 'USER_DATA';
const IS_LOGGED_IN = 'IS_LOGGED_IN';

const saveUserStorage = async (key: string, value: any) => {
	try {
		await AsyncStorage.setItem(key, value);
		return true;
	} catch (error) {
		return false;
	}
};

export const getUserStorage = async (key: string) => {
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

function useStorage() {
	const clearUserStorage = async () => {
		try {
			await AsyncStorage.removeItem(`@${IS_LOGGED_IN}:key`);
			await AsyncStorage.removeItem(`@${ACCESS_TOKEN}:key`);
			await AsyncStorage.removeItem(`@${USER_DATA}:key`);
			await AsyncStorage.removeItem(`@${REFRESH_TOKEN}:key`);
			return true;
		} catch (error) {
			return false;
		}
	};

	const clearLogInData = async () => {
		try {
			await AsyncStorage.removeItem(`@${USER_DATA}:key`);
			return true;
		} catch (error) {
			return false;
		}
	};

	const saveUserData = async (userData: { accessToken: string }) => {
		saveUserStorage(`@${USER_DATA}:key`, JSON.stringify(userData));
	};

	const getUserData = async () => {
		const result = await getUserStorage(`@${USER_DATA}:key`);
		return result;
	};

	const logout = async () => {
		clearUserStorage();
		navigateAndClearStack(screenNames.LOGIN_SCREEN);
	};

	return {
		clearUserStorage,
		logout,
		saveUserData,
		getUserData,
		clearLogInData,
	};
}

export default useStorage;
