import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, List, Row, Select, Tag } from 'antd';
import { LoadingOutlined, StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons';
import { connect } from 'umi';
import ArticleListContent from './components/ArticleListContent';
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import styles from './style.less';
const { Option } = Select;
const FormItem = Form.Item;
const pageSize = 5;

const Competitions = ({ dispatch, listAndsearchAndcompetitions: { list, types }, loading }) => {
    const [form] = Form.useForm();
    const [listData, setListData] = useState([]);
    const [offset, setOffset] = useState(1);
    useEffect(() => {
        dispatch({
            type: 'listAndsearchAndcompetitions/fetch',
            payload: {
                count: pageSize,
            },
        });
    }, []);

    useEffect(() => {
        // 首次渲染，截取pageSize位
        const temp = [];
        if (list.length) {
            for (let i = 0; i < pageSize; i++) {
                temp.push(list[i]);
            }
        }
        setListData(temp);
    }, [list]);

    const setOwner = () => {
        form.setFieldsValue({
            owner: ['wzj'],
        });
    };
    const fetchMore = () => {
        const temp = [];
        for (let i = pageSize * offset; i < pageSize * offset + pageSize; i++) {
            if (i >= list.length) break;
            temp.push(list[i]);
        }
        setListData(listData.concat(temp));
        setOffset(offset + 1);
    };

    // 获取所有竞赛种类
    useEffect(() => {
        dispatch({
            type: 'listAndsearchAndcompetitions/findAllTypes',
        });
    }, []);

    const owners = [
        {
            id: 'wzj',
            name: '我自己',
        },
        {
            id: 'wjh',
            name: '吴家豪',
        },
        {
            id: 'zxx',
            name: '周星星',
        },
        {
            id: 'zly',
            name: '赵丽颖',
        },
        {
            id: 'ym',
            name: '姚明',
        },
    ];

    const IconText = ({ type, text }) => {
        switch (type) {
            case 'star-o':
                return (
                    <span>
                        <StarOutlined
                            style={{
                                marginRight: 8,
                            }}
                        />
                        {text}
                    </span>
                );

            case 'like-o':
                return (
                    <span>
                        <LikeOutlined
                            style={{
                                marginRight: 8,
                            }}
                        />
                        {text}
                    </span>
                );

            case 'message':
                return (
                    <span>
                        <MessageOutlined
                            style={{
                                marginRight: 8,
                            }}
                        />
                        {text}
                    </span>
                );

            default:
                return null;
        }
    };

    const formItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 24,
            },
            md: {
                span: 12,
            },
        },
    };
    const loadMore = listData.length !== list.length && (
        <div
            style={{
                textAlign: 'center',
                marginTop: 16,
            }}
        >
            <Button
                onClick={fetchMore}
                style={{
                    paddingLeft: 48,
                    paddingRight: 48,
                }}
            >
                {loading ? (
                    <span>
                        <LoadingOutlined /> 加载中...
                    </span>
                ) : (
                    '加载更多'
                )}
            </Button>
        </div>
    );
    return (
        <>
            <Card bordered={false}>
                <Form
                    layout="inline"
                    form={form}
                    initialValues={{
                        owner: ['wjh', 'zxx'],
                    }}
                    onValuesChange={() => {
                        dispatch({
                            type: 'listAndsearchAndcompetitions/fetch',
                            payload: {
                                count: 8,
                            },
                        });
                    }}
                >
                    <StandardFormRow
                        title="所属种类"
                        block
                        style={{
                            paddingBottom: 11,
                        }}
                    >
                        <FormItem name="category">
                            <TagSelect expandable>
                                {types &&
                                    types.map((item) => (
                                        <TagSelect.Option value={item.typeName}>
                                            {item.typeName}
                                        </TagSelect.Option>
                                    ))}
                            </TagSelect>
                        </FormItem>
                    </StandardFormRow>
                    <StandardFormRow title="owner" grid>
                        <FormItem name="owner" noStyle>
                            <Select mode="multiple" placeholder="选择 owner">
                                {owners.map((owner) => (
                                    <Option key={owner.id} value={owner.id}>
                                        {owner.name}
                                    </Option>
                                ))}
                            </Select>
                        </FormItem>
                        <a className={styles.selfTrigger} onClick={setOwner}>
                            只看自己的
                        </a>
                    </StandardFormRow>
                    <StandardFormRow title="其它选项" grid last>
                        <Row gutter={16}>
                            <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                                <FormItem {...formItemLayout} label="活跃用户" name="user">
                                    <Select
                                        placeholder="不限"
                                        style={{
                                            maxWidth: 200,
                                            width: '100%',
                                        }}
                                    >
                                        <Option value="lisa">李三</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                                <FormItem {...formItemLayout} label="好评度" name="rate">
                                    <Select
                                        placeholder="不限"
                                        style={{
                                            maxWidth: 200,
                                            width: '100%',
                                        }}
                                    >
                                        <Option value="good">优秀</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                        </Row>
                    </StandardFormRow>
                </Form>
            </Card>
            <Card
                style={{
                    marginTop: 24,
                }}
                bordered={false}
                bodyStyle={{
                    padding: '8px 32px 32px 32px',
                }}
            >
                <List
                    size="large"
                    loading={listData.length === 0 ? loading : false}
                    rowKey="id"
                    itemLayout="vertical"
                    loadMore={loadMore}
                    dataSource={listData}
                    renderItem={(item) => (
                        <List.Item
                            key={item.id}
                            actions={[
                                <IconText key="star" type="star-o" text={item.star} />,
                                <IconText key="like" type="like-o" text={item.like} />,
                                <IconText key="message" type="message" text={item.message} />,
                            ]}
                            extra={<div className={styles.listItemExtra} />}
                        >
                            <List.Item.Meta
                                title={
                                    <a className={styles.listItemMetaTitle} href={item.href}>
                                        {item.title}
                                    </a>
                                }
                                description={
                                    <span>
                                        <Tag>Ant Design</Tag>
                                        <Tag>设计语言</Tag>
                                        <Tag>蚂蚁金服</Tag>
                                    </span>
                                }
                            />
                            <ArticleListContent data={item} />
                        </List.Item>
                    )}
                />
            </Card>
        </>
    );
};

export default connect(({ listAndsearchAndcompetitions, loading }) => ({
    listAndsearchAndcompetitions,
    loading: loading.models.listAndsearchAndcompetitions,
}))(Competitions);
