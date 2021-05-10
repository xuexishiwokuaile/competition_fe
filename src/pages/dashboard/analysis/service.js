/*
 * @Author: chenanran
 * @Date: 2021-04-08 13:19:41
 */
import request from 'umi-request';
export async function fakeChartData() {
    return request('/api/fake_chart_data');
}
export async function fetchLineChartData() {
    return request('/api/statistics/findLineChartDataByCom');
}
export async function fetchCompetitionData() {
    return request('/api/competition/findOneByTeaId');
}
export async function fetchTypeData() {
    return request('/api/statistics/findTypeData');
}
