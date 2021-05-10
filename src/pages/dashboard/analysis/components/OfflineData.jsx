import { Card, Col, Row, Tabs, Typography } from 'antd';
import { FormattedMessage, formatMessage } from 'umi';
import React from 'react';
import { TimelineChart, Pie } from './Charts';
import NumberInfo from './NumberInfo';
import styles from '../style.less';

const { Text } = Typography;

const CustomTab = ({ data, currentTabKey: currentKey }) => (
    <Row
        gutter={8}
        style={{
            width: 138,
            margin: '8px 0',
        }}
    >
        <Col span={12}>
            {/* <NumberInfo
                title={data.name}
                subTitle={
                    <FormattedMessage
                        id="dashboardandanalysis.analysis.conversion-rate"
                        defaultMessage="Conversion Rate"
                    />
                }
                gap={2}
                total={`${data.cvr * 100}%`}
                theme={currentKey !== data.name ? 'light' : undefined}
            /> */}
            <Text strong={currentKey === data.name} style={{ fontSize: '20px' }}>
                {data.name}
            </Text>
        </Col>
        {/* <Col
            span={12}
            style={{
                paddingTop: 36,
            }}
        >
            <Pie
                animate={false}
                inner={0.55}
                tooltip={false}
                margin={[0, 0, 0, 0]}
                percent={data.cvr * 100}
                height={64}
            />
        </Col> */}
    </Row>
);

const { TabPane } = Tabs;

const OfflineData = ({ activeKey, loading, offlineData, offlineChartData, handleTabChange }) => {
    return (
        <Card
            loading={loading}
            className={styles.offlineCard}
            bordered={false}
            style={{
                marginTop: 32,
            }}
        >
            <Tabs activeKey={activeKey} onChange={handleTabChange}>
                {offlineData.map((shop) => (
                    <TabPane
                        // tab={<CustomTab data={shop} currentTabKey={activeKey} />}
                        tab={<p>{shop.name}</p>}
                        key={shop.comId + ''}
                    >
                        <div
                            style={{
                                padding: '0 24px',
                            }}
                        >
                            <TimelineChart
                                height={400}
                                data={offlineChartData}
                                titleMap={{
                                    y1: formatMessage({
                                        id: 'dashboardandanalysis.analysis.traffic',
                                    }),
                                    y2: formatMessage({
                                        id: 'dashboardandanalysis.analysis.payments',
                                    }),
                                }}
                            />
                        </div>
                    </TabPane>
                ))}
            </Tabs>
        </Card>
    );
};

export default OfflineData;
