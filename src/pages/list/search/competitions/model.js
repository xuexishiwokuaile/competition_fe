/*
 * @Author: chenanran
 * @Date: 2021-04-08 13:19:41
 */
import { queryFakeList, findAllTypes } from './service';
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
        *findAllTypes({ payload }, { call, put }) {
            const response = yield call(findAllTypes);
            yield put({
                type: 'setTypes',
                payload: response,
            });
        },
    },
    reducers: {
        queryList(state, action) {
            return { ...state, list: action.payload };
        },
        setTypes(state, { payload }) {
            return { ...state, types: payload };
        },
    },
};
export default Model;
