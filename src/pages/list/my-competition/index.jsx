import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Input, Drawer } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import {
    queryRule,
    updateRule,
    addRule,
    removeRule,
    findTypes,
    findCompetitionDetail,
} from './service';
/**
 * 添加节点
 *
 * @param fields
 */

const handleAdd = async (fields) => {
    const hide = message.loading('正在添加');

    try {
        await addRule({ ...fields });
        hide();
        message.success('添加成功');
        return true;
    } catch (error) {
        hide();
        message.error('添加失败请重试！');
        return false;
    }
};
/**
 * 更新节点
 *
 * @param fields
 */

const handleUpdate = async (fields) => {
    const hide = message.loading('正在配置');

    const result = await updateRule(fields);

    if (result.code == 0) {
        hide();
        message.success('更新成功');
        return true;
    } else {
        hide();
        message.error('更新失败请重试！');
        return false;
    }
};
/**
 * 删除节点
 *
 * @param selectedRows
 */

const handleRemove = async (selectedRows) => {
    const hide = message.loading('正在删除');
    if (!selectedRows) return true;

    const result = await removeRule({
        id: selectedRows.map((row) => row.comId).toString(),
    });
    if (result.code == 0) {
        // 删除成功
        hide();
        message.success('删除成功，即将刷新');
        return true;
    } else {
        // 删除失败
        hide();
        message.error('删除失败，请重试');
        return false;
    }
};

const TableList = () => {
    const [createModalVisible, handleModalVisible] = useState(false);
    const [updateModalVisible, handleUpdateModalVisible] = useState(false);
    const [stepFormValues, setStepFormValues] = useState({});
    const actionRef = useRef();
    const [row, setRow] = useState();
    const [selectedRowsState, setSelectedRows] = useState([]);
    const [types, setTypes] = useState([]);

    useEffect(async () => {
        setTypes(await findTypes());
    }, []);

    const columns = [
        {
            title: '名称',
            dataIndex: 'name',
            render: (dom, entity) => {
                return <a onClick={() => setRow(entity)}>{dom}</a>;
            },
        },
        {
            title: '简介',
            dataIndex: 'detail',
            valueType: 'textarea',
        },
        {
            title: '热度',
            dataIndex: 'hot',
            sorter: true,
            hideInForm: true,
            renderText: (val) => `${val}`,
        },
        // {
        //     title: '状态',
        //     dataIndex: 'status',
        //     hideInForm: true,
        //     valueEnum: {
        //         0: {
        //             text: '比赛中',
        //             status: 'Default',
        //         },
        //         1: {
        //             text: '报名中',
        //             status: 'Processing',
        //         },
        //         2: {
        //             text: '已上线',
        //             status: 'Success',
        //         },
        //         3: {
        //             text: '已结束',
        //             status: 'Error',
        //         },
        //     },
        // },
        {
            title: '创建时间',
            dataIndex: 'date',
            sorter: true,
            valueType: 'dateTime',
            hideInForm: true,
            renderFormItem: (item, { defaultRender, ...rest }, form) => {
                const status = form.getFieldValue('status');

                if (`${status}` === '0') {
                    return false;
                }

                if (`${status}` === '3') {
                    return <Input {...rest} placeholder="请输入异常原因！" />;
                }

                return defaultRender(item);
            },
        },
        {
            title: '操作',
            dataIndex: 'option',
            valueType: 'option',
            render: (_, record) => [
                <a
                    onClick={async () => {
                        // 获取竞赛种类
                        const competition = await findCompetitionDetail(record.comId);
                        console.log("competition",competition);
                        handleUpdateModalVisible(true);
                        setStepFormValues({ ...record, types: competition.typeName || '' });
                    }}
                >
                    编辑
                </a>,
            ],
        },
    ];
    return (
        <PageContainer>
            <ProTable
                headerTitle="我的竞赛"
                actionRef={actionRef}
                rowKey="comId"
                search={false}
                // toolBarRender={() => [
                //     <Button type="primary" onClick={() => handleModalVisible(true)}>
                //         <PlusOutlined /> 新建
                //     </Button>,
                // ]}
                request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })} // 获取数据
                columns={columns}
                rowSelection={{
                    onChange: (_, selectedRows) => setSelectedRows(selectedRows),
                }}
            />
            {selectedRowsState?.length > 0 && (
                <FooterToolbar
                    extra={
                        <div>
                            已选择{' '}
                            <a
                                style={{
                                    fontWeight: 600,
                                }}
                            >
                                {selectedRowsState.length}
                            </a>{' '}
                            项&nbsp;&nbsp;
                        </div>
                    }
                >
                    <Button
                        type="primary"
                        danger
                        onClick={async () => {
                            await handleRemove(selectedRowsState);
                            setSelectedRows([]);
                            actionRef.current?.reloadAndRest?.();
                        }}
                    >
                        批量删除
                    </Button>
                </FooterToolbar>
            )}
            <CreateForm
                onCancel={() => handleModalVisible(false)}
                modalVisible={createModalVisible}
            >
                <ProTable
                    onSubmit={async (value) => {
                        const success = await handleAdd(value);

                        if (success) {
                            handleModalVisible(false);

                            if (actionRef.current) {
                                actionRef.current.reload();
                            }
                        }
                    }}
                    rowKey="key"
                    type="form"
                    columns={columns}
                />
            </CreateForm>
            {stepFormValues && Object.keys(stepFormValues).length ? (
                <UpdateForm
                    onSubmit={async (value) => {
                        const success = await handleUpdate(value);

                        if (success) {
                            handleUpdateModalVisible(false);
                            setStepFormValues({});

                            if (actionRef.current) {
                                actionRef.current.reload();
                            }
                        }
                    }}
                    onCancel={() => {
                        handleUpdateModalVisible(false);
                        setStepFormValues({});
                    }}
                    updateModalVisible={updateModalVisible}
                    values={stepFormValues}
                    types={types}
                />
            ) : null}

            <Drawer
                width={600}
                visible={!!row}
                onClose={() => {
                    setRow(undefined);
                }}
                closable={false}
            >
                {row?.name && (
                    <ProDescriptions
                        column={2}
                        title={row?.name}
                        request={async () => ({
                            data: row || {},
                        })}
                        params={{
                            id: row?.name,
                        }}
                        columns={columns}
                    />
                )}
            </Drawer>
        </PageContainer>
    );
};

export default TableList;
