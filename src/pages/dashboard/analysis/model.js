import { fakeChartData, fetchLineChartData, fetchCompetitionData, fetchTypeData } from './service';
const initState = {
    visitData: [],
    visitData2: [],
    salesData: [],
    searchData: [],
    offlineData: [],
    offlineChartData: [],
    salesTypeData: [],
    salesTypeDataOnline: [],
    salesTypeDataOffline: [],
    radarData: [],
};
const Model = {
    namespace: 'dashboardAndanalysis',
    state: initState,
    effects: {
        *fetch(_, { call, put }) {
            const response = yield call(fakeChartData);
            yield put({
                type: 'save',
                payload: response,
            });
        },

        *fetchSalesData(_, { call, put }) {
            const response = yield call(fakeChartData);
            yield put({
                type: 'save',
                payload: {
                    salesData: response.salesData,
                },
            });
        },

        *fetchLineChartData(_, { call, put }) {
            const response = yield call(fetchLineChartData);
            yield put({
                type: 'save',
                payload: {
                    offlineChartData: response,
                },
            });
        },

        *fetchCompetitionData(_, { call, put }) {
            const response = yield call(fetchCompetitionData);
            yield put({
                type: 'save',
                payload: {
                    offlineData: response.data,
                },
            });
        },

        *fetchTypeData(_, {call,put}) {
            const response = yield call(fetchTypeData);
            yield put({
                type: 'save',
                payload: {
                    salesTypeData: response,
                },
            });
        }
    },
    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload };
        },

        clear() {
            return initState;
        },
    },
};
export default Model;
