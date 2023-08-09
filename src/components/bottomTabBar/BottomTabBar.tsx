import React, { useState } from 'react';
import { TouchableOpacity, View, SafeAreaView, Image, Text, StyleSheet } from 'react-native';
import colors from 'utils/colors';
import screenNames from 'utils/screenName';
import DeviceInfo from 'react-native-device-info';
import images from 'utils/images';
import { sizes } from 'utils/sizings';

export default function BottomTabBar({ state, descriptors, navigation }: any) {
	const focusedOptions = descriptors[state.routes[state.index].key].options;
	const isHasNotch = DeviceInfo.hasNotch();

	const [reTouch, setReTouch] = useState(false);

	if (focusedOptions.tabBarVisible === false) {
		return null;
	}

	const renderIcon = (name: string) => {
		if (name === screenNames.HOME_STACK) {
			return images.home;
		} else {
			return images.profile;
		}
	};

	const getText = (name: string) => {
		if (name === screenNames.HOME_STACK) {
			return 'Home';
		} else {
			return 'Profile';
		}
	};

	return (
		<View style={[styles.containerStyle, { paddingBottom: isHasNotch ? 15 : 0 }]}>
			{state.routes.map((route: any, index: number) => {
				const { options } = descriptors[route.key];
				const isFocused = state.index === index;

				const onPress = () => {
					setReTouch(!reTouch);
					navigation.navigate(route.name, { reTouch });
				};

				const onLongPress = () => {
					navigation.emit({
						type: 'tabLongPress',
						target: route.key,
					});
				};

				return (
					<TouchableOpacity
						activeOpacity={1}
						key={index.toString()}
						accessibilityRole="button"
						accessibilityState={{ selected: isFocused }}
						accessibilityLabel={options.tabBarAccessibilityLabel}
						testID={options.tabBarTestID}
						onPress={onPress}
						onLongPress={onLongPress}
						style={styles.tabButton}>
						<Image style={[styles.icon, { tintColor: isFocused ? colors.black : colors.black }]} source={renderIcon(route.name)} />
						<Text style={[styles.tabBarText, { color: isFocused ? colors.black : colors.black }]}>{getText(route.name)}</Text>
					</TouchableOpacity>
				);
			})}
			<SafeAreaView style={{ backgroundColor: colors.white }} />
		</View>
	);
}

const styles = StyleSheet.create({
	containerStyle: {
		flexDirection: 'row',
		backgroundColor: colors.white,
		...colors.mediumShadow,
	},
	tabButton: {
		height: sizes.size_55,
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
	},
	tabBarText: {
		fontSize: sizes.size_13,
	},
	icon: {
		width: sizes.size_28,
		height: sizes.size_18,
		resizeMode: 'contain',
		marginBottom: sizes.size_3,
	},
});
