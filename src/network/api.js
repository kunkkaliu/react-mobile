/**
 * Created by liudonghui on 2017/11/4.
 * api配置和全局拦截.
 */

import axios from 'axios';

const pending = []; // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
const APICancelToken = axios.CancelToken;
const removePending = (config) => {
    for (let p = 0; p < pending.length; p += 1) {
        if (pending[p].u === `${config.url}&${config.method}`) { // 当当前请求在数组中存在时执行函数体
            pending[p].f(); // 执行取消操作
            pending.splice(p, 1); // 把这条记录从数组中移除
        }
    }
};

export const config = {
    withCredentials: true,
    timeout: 30000,
};

export function useInterceptors(netApi) {
    // 统一处理所有http请求和响应, 在请求发出与返回时进行拦截, 在这里可以做loading页面的展示与隐藏, token失效是否跳转到登录页等事情;
    netApi.interceptors.request.use((request) => {
        // Do something before request is sent
        removePending(request); // 在一个ajax发送前执行一下取消操作
        config.cancelToken = new APICancelToken((c) => {
            // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
            pending.push({ u: `${request.url}&${request.method}`, f: c });
        });
        return request;
    }, error => Promise.reject(error));

    netApi.interceptors.response.use((response) => {
        // Do something with response data
        removePending(response.config); // 在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
        if (response.data && response.data.code && response.data.code !== 0) {
            alert(response.data.message || response.data.data || '操作失败!');
        } else if (response.data && response.data.code === 0) {
            if (response.config && response.config.params && response.config.params.showMsg) {
                alert(response.data.message || '操作成功!');
            }
        }
        return {
            data: response.data,
        };
    }, (error) => {
        // Do something with response error
        if (error && error.response && error.response.status === '401') {
            const ssoURL = (error && error.response && error.response.data && error.response.data.data) || '';
            document.location.href = ssoURL + encodeURIComponent(document.location.href);
        } else if (error && error.response && error.response.data && error.response.data.message) {
            alert(error.response.data.message);
        } else if (error && error.message) {
            alert(error.message);
        }
        return Promise.reject(error.response && error.response.data);
    });
}
