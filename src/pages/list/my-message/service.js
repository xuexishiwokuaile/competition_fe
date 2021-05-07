/*
 * @Author: chenanran
 * @Date: 2021-04-08 13:19:41
 */
import request from 'umi-request';
export async function queryRule(params) {
    return request('/api/message/findOneByTea', {
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
        data: { ...params },
    });
}
export async function findAllCompetitions() {
    return request('/api/competition/findOneByTeaId');
}
export async function addMessage(params) {
    return request('/api/message/add', {
        method: 'POST',
        data: { ...params, method: 'post' },
    });
}
export async function updateMessage(params) {
    return request('/api/message/update', {
        method: 'PUT',
        data: { ...params },
    });
}
export async function removeMessage(params) {
    return request(`/api/message/delete?id=${params.id}`, {
        method: 'DELETE',
    });
}
