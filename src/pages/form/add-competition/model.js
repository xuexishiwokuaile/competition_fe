/*
 * @Author: chenanran
 * @Date: 2021-04-08 13:19:41
 */
import { message } from 'antd';
import { fakeSubmitForm, findAllTypes } from './service';
const Model = {
    namespace: 'formAddCompetition',
    state: {},
    effects: {
        *submitRegularForm({ payload }, { call }) {
            yield call(fakeSubmitForm, payload);
            message.success('提交成功');
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
        setTypes(state, { payload }) {
            return { ...state, type: payload }; // array
        },
    },
};
export default Model;
