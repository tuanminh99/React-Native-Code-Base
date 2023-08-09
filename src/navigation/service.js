import * as React from 'react';

export const navigationRef = React.createRef();

export function goBack() {
	navigationRef.current?.goBack();
}

export function navigate(name, params) {
	if (params) {
		navigationRef.current?.navigate(name, params);
	} else {
		navigationRef.current?.navigate(name);
	}
}

/*Clear and set screenName on top of stack*/
export function navigateAndClearStack(screenName, params) {
	if (params) {
		navigationRef.current?.reset({
			index: 0,
			routes: [{ name: screenName, params }],
		});
	} else {
		navigationRef.current?.reset({
			index: 0,
			routes: [{ name: screenName }],
		});
	}
}

export function navigateNestedStack(stack, name, params) {
	if (params) {
		navigationRef.current?.navigate(stack, {
			screen: name,
			params,
		});
	} else {
		navigationRef.current?.navigate(stack, { screen: name });
	}
}

export function getCurrentRoute(nav) {
	return navigationRef.current?.getCurrentRoute()?.name;
}
