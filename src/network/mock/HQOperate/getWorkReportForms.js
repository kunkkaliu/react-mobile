/**
 * Created by liudonghui on 2018/3/28.
 */
const Mock = require('mockjs');

const { Random } = Mock;

module.exports = Mock.mock({
    'code': 0,
    'data': {
        'records|10': [{
            'id|+1': 1000,
            'create_at': () => Random.datetime(),
            'worknum|1': ['10', '20', '5', '30'],
            'backnum|1': ['10', '20', '5', '30'],
            'gmv|1': ['2000', '3000', '5000'],
            'worktime|1': ['2h', '4h', '1h'],
        }],
        'total': 600,
    },
});
