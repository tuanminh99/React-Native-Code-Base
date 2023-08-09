import { types } from 'store/actions/types';

const initLoading: boolean = false;

const loading = (state = initLoading, action: any): boolean => {
	switch (action?.type) {
		case types.LOADING_ACTION: {
			return action.payload;
		}
		default:
			return state;
	}
};

export default loading;
