/*
 * @Author: chenanran
 * @Date: 2021-04-08 13:19:41
 */
import request from 'umi-request';
export async function fakeSubmitForm(params) {
    return request('/api/competition/add', {
        method: 'POST',
        data: params,
    });
}

export async function findAllTypes() {
    return request('/api/type/findAll');
}
