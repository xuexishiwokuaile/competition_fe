import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, List, Row, Select, Tag } from 'antd';
import { LoadingOutlined, FireOutlined, UserOutlined, MessageOutlined } from '@ant-design/icons';
import { connect } from 'umi';
import ArticleListContent from './components/ArticleListContent';
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import styles from './style.less';
import { isArray } from 'lodash';
const { Option } = Select;
const FormItem = Form.Item;
const pageSize = 5;

const Competitions = ({
    dispatch,
    listAndsearchAndcompetitions: { list, types, owners },
    loading,
}) => {
    const [form] = Form.useForm();
    const [listData, setListData] = useState([]);
    const [order, setOrder] = useState('date');
    const [currentOwner, setCurrentOwner] = useState('');
    const [typeName, setTypeName] = useState('');
    const [offset, setOffset] = useState(1);
    useEffect(() => {
        dispatch({
            type: 'listAndsearchAndcompetitions/fetch',
            payload: {
                typeName: typeName,
                teaId: currentOwner,
                order: order,
            },
        });
    }, []);

    useEffect(() => {
        // 首次渲染，截取pageSize位
        const temp = [];
        if (list.length) {
            for (let i = 0; i < pageSize; i++) {
                if (i >= list.length) break;
                temp.push(list[i]);
            }
        }
        setListData(temp);
    }, [list]); // list改变后重新执行该函数

    const setOwner = () => {
        const key = +localStorage.getItem('userId');
        setCurrentOwner(key);
        form.setFieldsValue({
            owner: [key],
        });
        // 发送请求
        dispatch({
            type: 'listAndsearchAndcompetitions/fetch',
            payload: {
                typeName: typeName,
                teaId: key,
                order: order,
            },
        });
    };

    // 选中owner时的回调
    const onOwnerSelect = (key) => {
        setCurrentOwner(key);
        dispatch({
            type: 'listAndsearchAndcompetitions/fetch',
            payload: {
                typeName: typeName,
                teaId: key,
                order: order,
            },
        });
    };

    // 选中排序方式时的回调
    const onOrderSelect = (order) => {
        setOrder(order);
        dispatch({
            type: 'listAndsearchAndcompetitions/fetch',
            payload: {
                typeName: typeName,
                teaId: currentOwner,
                order: order,
            },
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

    const onValuesChange = (value) => {
        // 获取选择的种类
        if (isArray(value.category)) {
            const typeName = value.category.toString();
            setTypeName(typeName);
            dispatch({
                type: 'listAndsearchAndcompetitions/fetch',
                payload: {
                    typeName: typeName,
                    teaId: currentOwner,
                    order: order,
                },
            });
        }
    };

    // 获取所有竞赛种类
    useEffect(() => {
        dispatch({
            type: 'listAndsearchAndcompetitions/findAllTypes',
        });
    }, []);

    // 获取竞赛所有者
    useEffect(() => {
        dispatch({
            type: 'listAndsearchAndcompetitions/fetchAllOwners',
        });
    }, []);

    const IconText = ({ type, text }) => {
        switch (type) {
            case 'star-o':
                return (
                    <span>
                        <FireOutlined
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
                        <UserOutlined
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
                    initialValues={{}}
                    onValuesChange={onValuesChange}
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
                    <StandardFormRow title="所有者" grid>
                        <FormItem name="owner" noStyle>
                            <Select mode="single" placeholder="选择所有者" onSelect={onOwnerSelect}>
                                {owners &&
                                    owners.map((owner) => (
                                        <Option key={owner.id} value={owner.id}>
                                            {owner.id == localStorage.getItem('userId')
                                                ? '我自己'
                                                : owner.name}
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
                                <FormItem {...formItemLayout} label="排序方式" name="order">
                                    <Select
                                        placeholder="时间"
                                        style={{
                                            maxWidth: 200,
                                            width: '100%',
                                        }}
                                        onSelect={onOrderSelect}
                                    >
                                        <Option value="date">时间</Option>
                                        <Option value="hot">热度</Option>
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
                            key={item.comId}
                            actions={[
                                <IconText key="star" type="star-o" text={item.hot} />,
                                <IconText key="like" type="like-o" text={item.like} />,
                                <IconText key="message" type="message" text={item.message} />,
                            ]}
                            extra={<div className={styles.listItemExtra} />}
                        >
                            <List.Item.Meta
                                title={
                                    <a className={styles.listItemMetaTitle} href={item.href}>
                                        {item.name}
                                    </a>
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
