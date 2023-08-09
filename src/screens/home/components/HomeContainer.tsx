import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Config from 'react-native-config';
import I18n from 'utils/language/i18n';

const HomeContainer = () => {
	return (
		<View>
			<Text>{I18n.t('HOME')}</Text>
			<Text>{Config.API_URL}</Text>
		</View>
	);
};

export default HomeContainer;

const styles = StyleSheet.create({});
