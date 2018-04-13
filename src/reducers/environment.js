/**
 * Created by liudonghui on 17/9/8.
 */
import { ReducerFactory } from 'utils/reducerUtil';
import abstractReducer from './abstractReducer';

const initialState = {
    isDev: process.env.NODE_ENV === 'development',
};
const environment = ReducerFactory(initialState, 'environment').extends(abstractReducer);

export default environment;
