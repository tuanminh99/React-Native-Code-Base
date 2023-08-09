import React from 'react';
import { RootStack } from './stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './service';

const AppNavigator = () => {
	return (
		<SafeAreaProvider>
			<NavigationContainer ref={navigationRef}>
				<RootStack />
			</NavigationContainer>
		</SafeAreaProvider>
	);
};

export default AppNavigator;
