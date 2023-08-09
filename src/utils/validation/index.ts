import { youtubeParser } from './../common/index';

export const isNull = (value: any) => {
	if (!value) {
		return true;
	}
	const text = String(value);
	if (!text || text.trim() === '') {
		return true;
	}
	return false;
};

export function validateUserName(username: string) {
	const expression = /^([a-zA-Z0-9_.](?![\s])){3,40}$/;
	return expression.test(String(username).trim());
}

export const validateEmail = (email: string) => {
	if (email.length >= 8) {
		const expression =
			/(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
		return expression.test(String(email).trim().toLowerCase());
	}
	return false;
};

export function validatePassword(password: string) {
	const expression = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
	return expression.test(String(password));
}

export const validatePhone = (phone: string) => {
	if (!phone) {
		return false;
	}
	const phoneNum = phone.replace(/[^\d]/g, '');
	if (phoneNum.length > 8 && phoneNum.length < 11) {
		const phoneRegex = /^\+{0,2}([\-\. ])?(\(?\d{0,3}\))?([\-\. ])?\(?\d{0,3}\)?([\-\. ])?\d{3}([\-\. ])?\d{4}/;
		return phoneRegex.test(phone);
	}
	return false;
};

export const validateLink = (link: string) => {
	const expression = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;
	return !expression.test(String(link).toLowerCase());
};

export const validateLinkVideo = (link: string) => {
	const expressionYoutube = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
	if (expressionYoutube.test(String(link).toLowerCase())) {
		return true;
	}
	return false;
};

export const validateIdYoutube = (link: string) => {
	if (youtubeParser(String(link).toLowerCase()) === '') {
		return true;
	}
	return false;
};

export const validatePostcode = (postcode: string) => {
	const expression = /^[0-9]{3,4}$/;
	return expression.test(String(postcode).trim());
};

export const validatePrice = (price: string) => {
	const formatPrice = price.slice(1, price.length);
	const expression = /^(?:0|[1-9]\d{0,2}(?:,\d{3})*)?(\.\d{2})$/;
	return expression.test(String(formatPrice).trim());
};
