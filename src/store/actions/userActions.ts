import { types } from 'store/actions/types';
import { TAction } from 'utils/types';

export const userDataAction = (payload: any): TAction => ({
	type: types.USER_DATA_ACTION,
	payload,
});
