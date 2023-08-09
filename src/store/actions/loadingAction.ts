import { types } from 'store/actions/types';
import { TAction } from 'utils/types';

export const loadingAction = (payload: boolean): TAction => ({
	type: types.LOADING_ACTION,
	payload,
});
