/*
 * @Author: chenanran
 * @Date: 2021-04-08 13:19:41
 */
import request from 'umi-request';
export async function queryRule(params) {
    return request('/api/competition/findOneByTeaId', {
        params,
    });
}
export async function removeRule(params) {
    return request(`/api/competition/delete?id=${params.id}`, {
        method: 'DELETE',
    });
}
export async function addRule(params) {
    return request('/api/rule', {
        method: 'POST',
        data: { ...params, method: 'post' },
    });
}
export async function updateRule(params) {
    return request('/api/competition/update', {
        method: 'PUT',
        data: params,
    });
}
export async function findTypes() {
    return request('/api/type/findAll');
}
export async function findCompetitionDetail(params) {
    return request(`/api/competition/findOneById?id=${params}`);
}
