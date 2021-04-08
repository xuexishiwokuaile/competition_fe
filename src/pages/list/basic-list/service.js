/*
 * @Author: chenanran
 * @Date: 2021-04-08 13:19:41
 */
import request from 'umi-request';
export async function queryFakeList(params) {
    return request('/api/fake_list', {
        params,
    });
}
export async function removeFakeList(params) {
    const { count = 5, ...restParams } = params;
    return request('/api/fake_list', {
        method: 'POST',
        params: {
            count,
        },
        data: { ...restParams, method: 'delete' },
    });
}
export async function addFakeList(params) {
    const { count = 5, ...restParams } = params;
    return request('/api/fake_list', {
        method: 'POST',
        params: {
            count,
        },
        data: { ...restParams, method: 'post' },
    });
}
export async function updateFakeList(params) {
    const { count = 5, ...restParams } = params;
    return request('/api/fake_list', {
        method: 'POST',
        params: {
            count,
        },
        data: { ...restParams, method: 'update' },
    });
}
