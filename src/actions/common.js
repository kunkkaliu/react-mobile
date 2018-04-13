/**
 * Created by liudonghui on 2018/3/26.
 */
import { netApi as api } from 'network';

export const actions = {
    SETSTORE: 'common/reducer/SETSTORE',
    GETALLCITIES: 'common/reducer/GETALLCITIES',
    GETALLCITIES_SUCCESS: 'common/reducer/GETALLCITIES_SUCCESS',
    GETSTORESBYCITY: 'common/reducer/GETSTORESBYCITY',
    GETSTORESBYCITY_PENDING: 'common/reducer/GETSTORESBYCITY_PENDING',
    GETSTORESBYCITY_SUCCESS: 'common/reducer/GETSTORESBYCITY_SUCCESS',
    GETTECHSBYSTORE: 'common/reducer/GETTECHSBYSTORE',
    GETTECHSBYSTORE_PENDING: 'common/reducer/GETTECHSBYSTORE_PENDING',
    GETTECHSBYSTORE_SUCCESS: 'common/reducer/GETTECHSBYSTORE_SUCCESS',
    GETPROJECTS: 'common/reducer/GETPROJECTS',
    GETPROJECTS_SUCCESS: 'common/reducer/GETPROJECTS_SUCCESS',
};

export function setStore(store) {
    return {
        type: actions.SETSTORE,
        payload: {
            store,
        },
    };
}

export function getAllCities() {
    return {
        type: actions.GETALLCITIES,
        payload: {
            promise: api.post('/common/getallcities'),
        },
    };
}

export function getStoresByCity(data) {
    return {
        type: actions.GETSTORESBYCITY,
        payload: {
            promise: api.post('/common/getstoresbycity', {
                ...data,
            }),
        },
    };
}

export function getTechsByStore(data) {
    return {
        type: actions.GETTECHSBYSTORE,
        payload: {
            promise: api.post('/common/gettechsbystore', {
                ...data,
            }),
        },
    };
}

export function getProjects() {
    return {
        type: actions.GETPROJECTS,
        payload: {
            promise: api.post('/common/getprojects'),
        },
    };
}
