import { Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

export function handleNetWorkError() {
	NetInfo.fetch().then(state => {
		if (!state.isConnected) {
			showAlert('Something went wrong', 'Error');
		}
	});
}

export function showAlert(content: string, title: string = '', textSuccess = 'OK') {
	setTimeout(() => {
		Alert.alert(title, content, [{ text: textSuccess, onPress: () => {} }], {
			cancelable: false,
		});
	}, 100);
}
