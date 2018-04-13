/**
 * Created by liudonghui on 2018/3/26.
 */
import { actions } from 'actions/common';
import { ReducerFactory } from 'utils/reducerUtil';
import abstractReducer from './abstractReducer';

const initialState = {
    cities: [],
    stores: [],
    technicians: [],
    projects: [],
};

const common = ReducerFactory(initialState, 'common').extends(abstractReducer);

common.action(actions.SETSTORE, function (state, action) {
    return Object.assign({}, state, action.payload.store);
});

common.action(actions.GETALLCITIES_SUCCESS, function (state, action) {
    return Object.assign({}, state, {
        cities: (action.payload.data && action.payload.data.data && action.payload.data.data.cities) || [],
    });
});

common.action(actions.GETSTORESBYCITY_PENDING, function (state, action) {
    return Object.assign({}, state, {
        stores: [],
        technicians: [],
    });
});

common.action(actions.GETSTORESBYCITY_SUCCESS, function (state, action) {
    return Object.assign({}, state, {
        stores: (action.payload.data && action.payload.data.data && action.payload.data.data.stores) || [],
    });
});

common.action(actions.GETTECHSBYSTORE_PENDING, function (state, action) {
    return Object.assign({}, state, {
        technicians: [],
    });
});

common.action(actions.GETTECHSBYSTORE_SUCCESS, function (state, action) {
    return Object.assign({}, state, {
        technicians: (action.payload.data && action.payload.data.data && action.payload.data.data.techs) || [],
    });
});

common.action(actions.GETPROJECTS_SUCCESS, function (state, action) {
    return Object.assign({}, state, {
        projects: (action.payload.data && action.payload.data.data && action.payload.data.data.projects) || [],
    });
});

common.action(actions.SETSTORE, function (state, action) {
    return Object.assign({}, state, action.payload.store);
});

export default common;
