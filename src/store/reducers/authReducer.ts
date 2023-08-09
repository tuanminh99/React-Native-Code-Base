import { types } from 'store/actions/types';

const initAuth = {};

const auth = (state = initAuth, action: any) => {
	switch (action?.type) {
		case types.AUTH_ACTION: {
			return action.payload;
		}
		default:
			return state;
	}
};

export default auth;
