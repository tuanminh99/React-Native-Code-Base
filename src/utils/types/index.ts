import modules from 'store/modules';

export type TAction = {
	type: string;
	payload?: any;
	onSuccess?: Function;
	onError?: Function;
};

export type RootState = ReturnType<typeof modules.rootReducer>;
