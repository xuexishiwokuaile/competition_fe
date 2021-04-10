/*
 * @Author: chenanran
 * @Date: 2021-04-08 13:19:41
 */
import { queryFakeList } from './service';
const Model = {
    namespace: 'listAndsearchAndcompetitions',
    state: {
        list: [],
    },
    effects: {
        *fetch({ payload }, { call, put }) {
            const response = yield call(queryFakeList, payload);
            yield put({
                type: 'queryList',
                payload: Array.isArray(response) ? response : [],
            });
        },

        *appendFetch({ payload }, { call, put }) {
            const response = yield call(queryFakeList, payload);
            yield put({
                type: 'appendList',
                payload: Array.isArray(response) ? response : [],
            });
        },
    },
    reducers: {
        queryList(state, action) {
            return { ...state, list: action.payload };
        },

        appendList(state, action) {
            return { ...state, list: state.list.concat(action.payload) };
        },
    },
};
export default Model;
