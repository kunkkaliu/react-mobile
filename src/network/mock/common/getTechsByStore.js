/**
 * Created by liudonghui on 2018/3/28.
 */
const Mock = require('mockjs');

const { Random } = Mock;

module.exports = Mock.mock({
    'code': 0,
    'data': {
        'techs|10': [{
            'id|+1': 10000,
            'name': () => Random.cname(),
        }],
    },
});
