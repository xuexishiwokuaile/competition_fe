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
    findAllCompetitions,
    addMessage,
    updateMessage,
    removeMessage,
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

    try {
        await updateRule({
            name: fields.name,
            desc: fields.desc,
            key: fields.key,
        });
        hide();
        message.success('配置成功');
        return true;
    } catch (error) {
        hide();
        message.error('配置失败请重试！');
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

/**
 * 添加信息
 *
 * @param message
 */
const handleAddMessage = async (fields) => {
    const hide = message.loading('正在添加');
    const result = await addMessage({ ...fields });

    if (result.code == 0) {
        hide();
        message.success('添加成功');
        return true;
    } else {
        hide();
        message.error(result.msg);
        return false;
    }
};

const handleUpdateMessage = async (fields) => {
    const hide = message.loading('正在更新');
    const id = [];
    id.push(fields.id);
    const result = await updateMessage({ ...fields, id: id });

    if (result.code == 0) {
        hide();
        message.success('更新成功');
        return true;
    } else {
        hide();
        message.error(result.msg);
        return false;
    }
};

const handleRemoveMessage = async (selectedRows) => {
    const hide = message.loading('正在删除');
    if (!selectedRows) return true;

    const result = await removeMessage({
        id: selectedRows.map((row) => row.id).toString(),
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
    const [competitions, setCompetitions] = useState([]);
    // 获取所有竞赛
    useEffect(async () => {
        setCompetitions(await findAllCompetitions());
    }, []);
    const columns = [
        {
            title: '竞赛',
            dataIndex: 'name',
            render: (dom, entity) => {
                return <a onClick={() => setRow(entity)}>{dom}</a>;
            },
        },
        {
            title: '详情',
            dataIndex: 'detail',
            valueType: 'textarea',
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
            title: '操作',
            dataIndex: 'option',
            valueType: 'option',
            render: (_, record) => [
                <a
                    onClick={() => {
                        handleUpdateModalVisible(true);
                        setStepFormValues(record);
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
                headerTitle="我的信息"
                actionRef={actionRef}
                rowKey="id"
                search={false}
                toolBarRender={() => [
                    <Button type="primary" onClick={() => handleModalVisible(true)}>
                        <PlusOutlined /> 新建
                    </Button>,
                ]}
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
                            await handleRemoveMessage(selectedRowsState);
                            setSelectedRows([]);
                            actionRef.current?.reloadAndRest?.();
                        }}
                    >
                        批量删除
                    </Button>
                </FooterToolbar>
            )}
            <CreateForm
                onCancel={() => {
                    handleModalVisible(false);
                    setStepFormValues({});
                }}
                modalVisible={createModalVisible}
                onSubmit={async (value) => {
                    const success = await handleAddMessage(value);

                    if (success) {
                        handleModalVisible(false);
                        setStepFormValues({});

                        if (actionRef.current) {
                            actionRef.current.reload();
                        }
                    }
                }}
                updateModalVisible={updateModalVisible}
                competitions={competitions.data}
            ></CreateForm>
            {stepFormValues && Object.keys(stepFormValues).length ? (
                <UpdateForm
                    onSubmit={async (value) => {
                        const success = await handleUpdateMessage(value);

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
