import en from './locales/en';
import ja from './locales/ja';
import { I18n as i18n } from "i18n-js"

const I18n = new i18n({
	ja: {
		...ja
	},
	en: {
		...en
	},
});

async function loadTranslations(I18n, locale) {
	await fetch(`/locales/${locale}`).then((response) => {
		const translations = response.json();
		I18n.store(translations);
	})
	.catch((error) => {
		return error;
	});
}

loadTranslations(I18n,I18n.locale);
I18n.store(en);
I18n.store(ja)

export default I18n;