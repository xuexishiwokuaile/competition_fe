/*
 * @Author: chenanran
 * @Date: 2021-04-08 13:19:41
 */
import { queryFakeList, findAllTypes, findAllOwners, searchCompetitions } from './service';
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
        *fetchAllOwners({ payload }, { call, put }) {
            const response = yield call(findAllOwners);
            yield put({
                type: 'setOwners',
                payload: response,
            });
        },
        *search({ payload }, { call, put }) {
            const response = yield call(searchCompetitions, payload);
            yield put({
                type: 'setSearch',
                payload: response,
            });
        },
    },
    reducers: {
        queryList(state, { payload }) {
            return { ...state, list: payload };
        },
        setTypes(state, { payload }) {
            return { ...state, types: payload };
        },
        setOwners(state, { payload }) {
            return { ...state, owners: payload };
        },
        setSearch(state, { payload }) {
            return { ...state, list: payload };
        },
    },
};
export default Model;
