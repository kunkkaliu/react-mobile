import { combineReducers } from 'redux';
import load from './load';
import environment from './environment';
import common from './common';

const rootReducer = combineReducers({
    environment,
    common,
    load,
});

export default rootReducer;
