import { combineReducers } from 'redux';
import loading from 'store/reducers/loadingReducer';
import auth from 'store/reducers/authReducer';

export default {
	rootReducer: combineReducers({
		loading,
		auth,
	}),
};
