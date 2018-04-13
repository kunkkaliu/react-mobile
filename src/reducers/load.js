/**
 * Created by liudonghui on 17/6/19.
 */
import { actions } from 'actions/load';
import { ReducerFactory } from 'utils/reducerUtil';
import abstractReducer from './abstractReducer';

const initialState = {
    httpLength: 0,
};
const load = ReducerFactory(initialState, 'load').extends(abstractReducer);

load.action(actions.ADDHTTPLOAD, function (state, action) {
    return Object.assign({}, state, { httpLength: state.httpLength + 1 });
});

load.action(actions.DELHTTPLOAD, function (state, action) {
    return Object.assign({}, state, { httpLength: state.httpLength - 1 });
});

export default load;
