/**
 * Created by liudonghui on 2018/3/22.
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
                'city': () => Random.city(),
                'store|1': ['石景山店', '东城店', '海淀店', '丰台店'],
                'role|1': ['主管', '技师'],
                'people': () => Random.cname(),
                'phone|1': ['13500000000', '13600000000'],
            }],
            'total': 600,
        },
    });
    return data;
};

module.exports = getData;
