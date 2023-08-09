import moment from 'moment';
import ImageResizer from 'react-native-image-resizer';
import { CONSTANTS } from 'utils/constants';
import Toast, { SuccessToast, ErrorToast } from 'react-native-toast-message';
import React from 'react';
import colors from 'utils/colors';
import { isAndroid } from 'utils/sizings';

export const getFullName = (firstName: string, lastName: string) => {
	const first = firstName || '';
	const last = lastName || '';

	return `${first} ${last}`;
};

export const getFileTypeMedia = (media: any) => {
	const fileType = media.mime?.split('/');
	return fileType ? fileType[1] : '';
};

export const getFileNameMedia = (media: any) => {
	let fileName: string = '';
	if (media.filename) {
		const fileNameSplit: string[] = media?.filename?.split('.') || [];
		fileName = fileNameSplit?.slice(-1)?.pop() || '';
	} else {
		const pathUriTypeSplit: string[] = media.path?.split('.') || [];
		fileName = pathUriTypeSplit?.slice(-1)?.pop() || '';
	}
	return fileName;
};

export const youtubeParser = (url: string): string => {
	let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
	let match = url?.match(regExp);
	return match && match[7].length == 11 ? match[7] : '';
};

export const formatResizeImage = async (data: any, size: number = 700): Promise<{ uri: string; type: string; name: string }> => {
	if (!data?.uri) {
		return data;
	}
	try {
		const resizeImage: any = await ImageResizer.createResizedImage(data.uri, size, size, 'PNG', 100, 0);

		return {
			uri: formatPhotoUri(resizeImage.uri),
			type: CONSTANTS.thumbnailType,
			name: resizeImage.name,
		};
	} catch (error) {
		return data;
	}
};

export const getParamsURL = (name: string, url: string) => {
	const newURL = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
	const regexString = '[\\?&]' + newURL + '=([^&#]*)';
	const regex = new RegExp(regexString);
	const results = regex.exec(url);
	return results == null ? null : results[1];
};

export const uniqBy = (arr: any, key: any) => {
	const seen = new Set();
	return arr.filter((item: any) => {
		const k = key(item);
		return seen.has(k) ? false : seen.add(k);
	});
};

moment.updateLocale('en', {
	relativeTime: {
		future: 'in %s',
		past: '%s ago',
		s: '1s',
		ss: '%ss',
		m: '1m',
		mm: '%dm',
		h: '1h',
		hh: '%dh',
		d: '1d',
		dd: '%dd',
		M: '1M',
		MM: '%dM',
		y: '1Y',
		yy: '%dY',
	},
});

export const toastConfig = {
	success: (props: any) => {
		return (
			<SuccessToast
				{...props}
				text1={props.props.text1}
				contentContainerStyle={{ paddingHorizontal: 15 }}
				text1Style={{
					fontSize: 13,
					color: colors.black,
				}}
				text1NumberOfLines={3}
				text1Props={{ adjustsFontSizeToFit: true }}
			/>
		);
	},
	error: (props: any) => {
		return (
			<ErrorToast
				{...props}
				text1={props.props.text1}
				text1Style={{
					fontSize: 13,
					color: colors.black,
				}}
				text1NumberOfLines={3}
				text1Props={{ adjustsFontSizeToFit: true }}
			/>
		);
	},
};

export const toast = (type: string, text: string) => {
	return Toast.show({
		type: type,
		props: { text1: text },
	});
};

export const formatPhotoUri = (uri: any) => {
	return isAndroid ? uri : uri?.replace('file://', '');
};
