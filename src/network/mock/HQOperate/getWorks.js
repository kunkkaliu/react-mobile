/**
 * Created by liudonghui on 2018/3/23.
 */
const Mock = require('mockjs');

const { Random } = Mock;
let id = 10000;

const getData = (params) => {
    id = 10000 + (params.page - 1) * params.page_size;
    const data = Mock.mock({
        'code': 0,
        'data': {
            [`records|${params.page_size}`]: [{
                'id|+1': id,
                'create_at': () => Random.datetime(),
                'city': () => Random.city(),
                'store|1': ['石景山店', '东城店', '海淀店', '丰台店'],
                'work|1': ['自营'],
                'car|1': ['马自达', '丰田', '宝马', '奔驰', '雪弗兰', '吉利'],
                'item|1': ['洗车', '美容', '保养'],
                'people': () => Random.cname(),
                'status|1': ['已审核', '进行中', '未进行'],
                'gmv|1': ['2000', '3000', '5000'],
                'rate|1': ['0.5', '0.1', '0.8'],
                'time|1': ['2h', '4h', '1h'],
                'back|1': ['是', '否'],
            }],
            'total': 600,
        },
    });
    return data;
};

module.exports = getData;
