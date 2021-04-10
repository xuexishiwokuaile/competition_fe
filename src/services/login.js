/*
 * @Author: chenanran
 * @Date: 2021-04-08 13:19:41
 */
import request from '@/utils/request';
export async function fakeAccountLogin(params) {
    return request('/api/login', {
        method: 'POST',
        data: params,
    });
}
export async function getFakeCaptcha(mobile) {
    return request(`/api/login/captcha?mobile=${mobile}`);
}
export async function logout() {
    return request('/api/user/logout', {
        method: 'POST',
    });
}
