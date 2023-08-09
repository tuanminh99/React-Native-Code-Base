import PushNotification, { Importance } from 'react-native-push-notification';
import { CONSTANTS } from 'utils/constants';

interface IIOSRemoteNotification {
	title: string;
	body: string;
}

export interface IAndroidNotification {
	title: string;
	message: string;
	smallIcon: string;
	data: { [key: string]: string };
}

interface IRemoteMessage {
	data: { [key: string]: string };
	notification: IIOSRemoteNotification;
}

export const createNotificationChannel = () => {
	PushNotification?.createChannel(
		{
			channelId: CONSTANTS.notificationDTO.channelId,
			channelName: CONSTANTS.notificationDTO.channelName,
			channelDescription: CONSTANTS.notificationDTO.channelDescription,
			playSound: true,
			importance: Importance.HIGH,
		},
		() => {},
	);
};

export const pushIOSLocalNotification = (remoteMessage: IRemoteMessage) => {
	PushNotification?.localNotification({
		channelId: CONSTANTS.notificationDTO.channelId,
		message: remoteMessage.notification.body,
		title: remoteMessage.notification.title,
		userInfo: remoteMessage.data,
	});
};

export const pushAndroidLocalNotification = (notification: any) => {
	PushNotification.localNotification({
		channelId: CONSTANTS.notificationDTO.channelId,
		message: notification?.message,
		title: notification.title,
		smallIcon: notification?.smallIcon || '',
		userInfo: notification.data,
	});
};
