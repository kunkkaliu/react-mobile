
import { ReducerFactory } from 'utils/reducerUtil';

const initialState = {};
const abstractReducer = ReducerFactory(initialState);

// 从远程接收新数据后更新（使用 bigpipe 时可触发此状态）
abstractReducer.action('receive', function (state, action) {
    // this.name 模块名称
    // 更新模块配置
    if (action.payload.module === this.name) {
        return Object.assign({}, state, action.payload);
    }
    return state;
});

// 从远程接收新数据后更新（使用 bigpipe 时可触发此状态）
abstractReducer.action('done', function (state, action) {
    // this.name 模块名称
    // 更新模块配置
    if (action.payload.module === this.name) {
        return Object.assign({}, state, action.payload);
    }
    return state;
});

export default abstractReducer;
