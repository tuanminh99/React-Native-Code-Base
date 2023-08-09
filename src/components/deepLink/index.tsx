import React, { useEffect } from 'react';
import { Linking } from 'react-native';
import { useDispatch } from 'react-redux';
import { loadingAction } from 'store/actions/loadingAction';
import { getParamsURL } from 'utils/common';

function CheckDeepLink() {
	const dispatch = useDispatch();

	useEffect(() => {
		getDeepLink();
		Linking.addEventListener('url', url => {
			if (url) {
				handleNavigation(url.url);
			}
		});

		return () => {
			Linking.removeAllListeners('url');
		};
	}, []);

	const getDeepLink = async () => {
		const deepLink = await Linking.getInitialURL();
		handleNavigation(deepLink);
	};

	const handleNavigation = async (deepLink: any) => {
		dispatch(loadingAction(true));
		if (deepLink && deepLink.includes('url')) {
			const verifyToken = getParamsURL('token', deepLink);
		}
		dispatch(loadingAction(false));
	};

	return <></>;
}
export default CheckDeepLink;
