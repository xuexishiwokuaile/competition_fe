/*
 * @Author: chenanran
 * @Date: 2021-04-08 13:19:41
 */
import { stringify } from 'querystring';
import { history } from 'umi';
import { fakeAccountLogin, logout } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';
const Model = {
    namespace: 'login',
    state: {
        code: undefined,
    },
    effects: {
        *login({ payload }, { call, put }) {
            const response = yield call(fakeAccountLogin, payload);
            yield put({
                type: 'changeLoginStatus',
                payload: response,
            }); // Login successfully

            if (response.code === '0') {
                const urlParams = new URL(window.location.href);
                const params = getPageQuery();
                message.success('登录成功！');
                let { redirect } = params;

                if (redirect) {
                    const redirectUrlParams = new URL(redirect);

                    if (redirectUrlParams.origin === urlParams.origin) {
                        redirect = redirect.substr(urlParams.origin.length);

                        if (redirect.match(/^\/.*#/)) {
                            redirect = redirect.substr(redirect.indexOf('#') + 1);
                        }
                    } else {
                        window.location.href = '/';
                        return;
                    }
                }

                history.replace(redirect || '/');
            }
        },

        *logout({ payload }, { call, put }) {
            const { redirect } = getPageQuery(); // Note: There may be security issues, please note

            const response = yield call(logout);
            yield put({
                type: 'doLogout',
            });
            if (response.code === '0' && window.location.pathname !== '/user/login' && !redirect) {
                history.replace({
                    pathname: '/user/login',
                    search: stringify({
                        redirect: window.location.href,
                    }),
                });
            }
        },
    },
    reducers: {
        changeLoginStatus(state, { payload }) {
            setAuthority(payload.currentAuthority);
            return { ...state, code: payload.code, type: payload.type };
        },
        doLogout(state) {
            setAuthority(null);
            return { ...state };
        },
    },
};
export default Model;
