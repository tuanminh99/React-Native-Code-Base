import { types } from 'store/actions/types';
import { TAction } from 'utils/types';

export const authAction = (payload: any): TAction => ({
	type: types.AUTH_ACTION,
	payload,
});
