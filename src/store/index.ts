import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { legacy_createStore as createStore } from 'redux';

import modules from './modules';
import { RootState } from 'utils/types';

const store = createStore(modules.rootReducer);

export default store;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
