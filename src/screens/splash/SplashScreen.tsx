import { StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { navigateAndClearStack } from 'navigation/service';
import screenNames from 'utils/screenName';

const SplashScreen = () => {
	useEffect(() => {
		setTimeout(() => {
			navigateAndClearStack(screenNames.BOTTOM_TAB_STACK);
		}, 200);
	}, []);

	return <></>;
};

export default SplashScreen;

const styles = StyleSheet.create({});
