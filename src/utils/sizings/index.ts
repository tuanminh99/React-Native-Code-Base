import { PixelRatio, Dimensions, StyleProp, ViewStyle } from 'react-native';
import { Platform } from 'react-native';

const { width, height } = Dimensions.get('window');
export const realWidth = height > width ? width : height;
export const realHeight = height > width ? height : width;

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const deviceWidth = width;
export const deviceHeight = height;

export const isTablet = () => {
	let pixelDensity = PixelRatio.get();
	let adjustedWidth = width * pixelDensity;
	let adjustedHeight = height * pixelDensity;
	if (pixelDensity < 2 && (adjustedWidth >= 1000 || adjustedHeight >= 1000)) {
		return true;
	} else {
		return pixelDensity === 2 && (adjustedWidth >= 1920 || adjustedHeight >= 1920);
	}
};

const size = (value: number) => {
	let divider = isTablet() ? 600 : 375;
	return isTablet() ? value : Math.round((value * realWidth) / divider);
};

export const sizes = {
	size_0d5: size(0.5),
	size_1: size(1),
	size_2: size(2),
	size_3: size(3),
	size_4: size(4),
	size_5: size(5),
	size_6: size(6),
	size_7: size(7),
	size_8: size(8),
	size_9: size(9),
	size_10: size(10),
	size_11: size(11),
	size_12: size(12),
	size_13: size(13),
	size_14: size(14),
	size_15: size(15),
	size_16: size(16),
	size_17: size(17),
	size_18: size(18),
	size_19: size(19),
	size_20: size(20),
	size_21: size(21),
	size_22: size(22),
	size_23: size(23),
	size_24: size(24),
	size_25: size(25),
	size_26: size(26),
	size_27: size(27),
	size_28: size(28),
	size_29: size(29),
	size_30: size(30),
	size_31: size(31),
	size_32: size(32),
	size_33: size(33),
	size_34: size(34),
	size_35: size(35),
	size_36: size(36),
	size_37: size(37),
	size_38: size(38),
	size_39: size(39),
	size_40: size(40),
	size_41: size(41),
	size_42: size(42),
	size_43: size(43),
	size_44: size(44),
	size_45: size(45),
	size_46: size(46),
	size_47: size(47),
	size_48: size(48),
	size_49: size(49),
	size_50: size(50),
	size_51: size(51),
	size_52: size(52),
	size_53: size(53),
	size_54: size(54),
	size_55: size(55),
	size_56: size(56),
	size_57: size(57),
	size_58: size(58),
	size_59: size(59),
	size_60: size(60),
	size_61: size(61),
	size_62: size(62),
	size_63: size(63),
	size_64: size(64),
	size_65: size(65),
	size_66: size(66),
	size_67: size(67),
	size_68: size(68),
	size_69: size(69),
	size_70: size(70),
	size_71: size(71),
	size_72: size(72),
	size_73: size(73),
	size_74: size(74),
	size_75: size(75),
	size_76: size(76),
	size_77: size(77),
	size_78: size(78),
	size_79: size(79),
	size_80: size(80),
	size_81: size(81),
	size_83: size(83),
	size_86: size(86),
	size_88: size(88),
	size_90: size(90),
	size_92: size(92),
	size_94: size(94),
	size_96: size(96),
	size_97: size(97),
	size_99: size(99),
	size_100: size(100),
};

export const tabletSizes = {
	size_3: size(3),
	size_8: size(8),
	size_10: size(10),
	size_12: size(12),
	size_16: size(16),
	size_18: size(18),
	size_20: size(20),
	size_21: size(21),
	size_22: size(22),
	size_23: size(23),
	size_24: size(24),
	size_26: size(26),
	size_28: size(28),
	size_31: size(31),
	size_32: size(32),
	size_36: size(36),
	size_38: size(38),
	size_40: size(40),
	size_42: size(42),
	size_48: size(48),
	size_52: size(52),
	size_54: size(54),
	size_56: size(56),
	size_60: size(60),
	size_64: size(64),
	size_70: size(70),
	size_80: size(80),
	size_88: size(88),
	size_84: size(84),
	size_500: size(500),
	size_640: size(640),
};

export type TFontWeight = 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | undefined;

export const fontWeights = {
	w_100: '100' as TFontWeight,
	w_200: '200' as TFontWeight,
	w_300: '300' as TFontWeight,
	w_400: '400' as TFontWeight,
	w_500: '500' as TFontWeight,
	w_600: '600' as TFontWeight,
	w_700: '700' as TFontWeight,
	w_800: '800' as TFontWeight,
	w_900: '900' as TFontWeight,
};

export const screenAspectRatio = () => {
	const dim = Dimensions.get('screen');
	return dim.height / dim.width;
};

export const ASPECT_RATIO = {
	'4/3': '4/3',
	'3/4': '3/4',
	'16/9': '16/9',
	'19.5/9': '19.5/9',
};

export const getScreenType = () => {
	let ratio = screenAspectRatio();
	if (ratio <= 1) {
		return ASPECT_RATIO['3/4'];
	}
	if (ratio >= 1 && ratio < 16 / 9) {
		return ASPECT_RATIO['4/3'];
	}
	if (16 / 9 <= ratio && ratio <= 19.5 / 9) {
		return ASPECT_RATIO['16/9'];
	}

	if (ratio >= 19.5 / 9) {
		return ASPECT_RATIO['19.5/9'];
	}

	return ASPECT_RATIO['16/9'];
};

export const paddingHorizontalContent = (): StyleProp<ViewStyle> => {
	return !isTablet()
		? {
				paddingHorizontal: sizes.size_30,
				flex: 1,
		  }
		: {
				width: Dimensions.get('window').width < 700 ? tabletSizes.size_500 : tabletSizes.size_640,
				maxWidth: Dimensions.get('window').width < 700 ? tabletSizes.size_500 : tabletSizes.size_640,
				alignSelf: 'center',
				flex: 1,
		  };
};

export const paddingHorizontalComponent = (): StyleProp<ViewStyle> => {
	return !isTablet()
		? {
				paddingHorizontal: sizes.size_30,
		  }
		: {
				width: Dimensions.get('window').width < 700 ? tabletSizes.size_500 : tabletSizes.size_640,
				maxWidth: Dimensions.get('window').width < 700 ? tabletSizes.size_500 : tabletSizes.size_640,
		  };
};
