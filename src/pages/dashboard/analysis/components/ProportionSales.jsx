import { Card, Radio } from 'antd';
import { FormattedMessage } from 'umi';
import React from 'react';
import { Pie } from './Charts';
import Yuan from '../utils/Yuan';
import styles from '../style.less';

const ProportionSales = ({
    dropdownGroup,
    salesType,
    loading,
    salesPieData,
    handleChangeSalesType,
}) => (
    <Card
        loading={loading}
        className={styles.salesCard}
        bordered={false}
        title={
            <FormattedMessage
                id="dashboardandanalysis.analysis.the-proportion-of-sales"
                defaultMessage="The Proportion of Sales"
            />
        }
        style={{
            height: '100%',
        }}
        extra={
            <div className={styles.salesCardExtra}>
                {dropdownGroup}
                
            </div>
        }
    >
        <div>
            <h4
                style={{
                    marginTop: 8,
                    marginBottom: 32,
                }}
            >
                <FormattedMessage id="dashboardandanalysis.analysis.sales" defaultMessage="Sales" />
            </h4>
            <Pie
                hasLegend
                subTitle={
                    <FormattedMessage
                        id="dashboardandanalysis.analysis.sales"
                        defaultMessage="Sales"
                    />
                }
                total={() => <Yuan>{salesPieData.reduce((pre, now) => now.y + pre, 0)}</Yuan>}
                data={salesPieData}
                valueFormat={(value) => <Yuan>{value}</Yuan>}
                height={248}
                lineWidth={4}
            />
        </div>
    </Card>
);

export default ProportionSales;
