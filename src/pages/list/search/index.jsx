import React, { Component } from 'react';
import { Input } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { history } from 'umi';
import { connect } from 'umi';

class Search extends Component {
    handleTabChange = (key) => {
        const { match } = this.props;
        const url = match.url === '/' ? '' : match.url;

        switch (key) {
            case 'competitions':
                history.push(`${url}/competitions`);
                break;

            case 'applications':
                history.push(`${url}/applications`);
                break;

            case 'projects':
                history.push(`${url}/projects`);
                break;

            default:
                break;
        }
    };
    handleFormSubmit = (value) => {
        // eslint-disable-next-line no-console
        const { dispatch } = this.props;
        dispatch({
            type: 'listAndsearchAndcompetitions/search',
            payload: {
                value: value,
            },
        });
    };
    getTabKey = () => {
        const { match, location } = this.props;
        const url = match.path === '/' ? '' : match.path;
        const tabKey = location.pathname.replace(`${url}/`, '');

        if (tabKey && tabKey !== '/') {
            return tabKey;
        }

        return 'competitions';
    };

    render() {
        const tabList = [
            {
                key: 'competitions',
                tab: '竞赛',
            },
            // {
            //     key: 'projects',
            //     tab: '项目',
            // },
            // {
            //     key: 'applications',
            //     tab: '应用',
            // },
        ];
        const mainSearch = (
            <div
                style={{
                    textAlign: 'center',
                }}
            >
                <Input.Search
                    placeholder="请输入"
                    enterButton="搜索"
                    size="large"
                    onSearch={this.handleFormSubmit}
                    style={{
                        maxWidth: 522,
                        width: '100%',
                    }}
                />
            </div>
        );
        const { children } = this.props;
        return (
            <PageContainer
                content={mainSearch}
                tabActiveKey={this.getTabKey()}
                onTabChange={this.handleTabChange}
            >
                {children}
            </PageContainer>
        );
    }
}

export default connect(({ listAndsearchAndcompetitions }) => ({
    listAndsearchAndcompetitions,
}))(Search);
