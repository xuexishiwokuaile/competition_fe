import React from 'react';
import { Form, Button, DatePicker, Input, Modal, Radio, Select, Steps, Upload } from 'antd';
const { TextArea } = Input;

const FormItem = Form.Item;
const formLayout = {
    labelCol: {
        span: 7,
    },
    wrapperCol: {
        span: 13,
    },
};

const CreateForm = (props) => {
    const {
        modalVisible,
        onCancel: handleUpdateModalVisible,
        competitions,
        updateModalVisible,
        onSubmit: handleAdd,
    } = props;

    const [form] = Form.useForm();

    const renderContent = () => {
        return (
            <>
                <FormItem name="comId" label="竞赛">
                    <Select mode="single" placeholder="选择竞赛">
                        {competitions &&
                            competitions.map((competition) => (
                                <Option key={competition.comId} value={competition.comId}>
                                    {competition.name}
                                </Option>
                            ))}
                    </Select>
                </FormItem>
                <FormItem
                    name="detail"
                    label="信息详情"
                    rules={[
                        {
                            required: true,
                            message: '请输入内容！',
                        },
                    ]}
                >
                    <TextArea rows={4} placeholder="请输入信息内容" />
                </FormItem>
            </>
        );
    };

    const renderFooter = () => {
        return (
            <>
                <Button onClick={() => handleUpdateModalVisible(false)}>取消</Button>
                <Button type="primary" onClick={handleAddMessage}>
                    完成
                </Button>
            </>
        );
    };

    const handleAddMessage = async () => {
        const fieldsValue = await form.validateFields();
        handleAdd(fieldsValue);
    };

    return (
        <Modal
            destroyOnClose
            title="发布信息"
            visible={modalVisible}
            onCancel={() => handleUpdateModalVisible()}
            footer={renderFooter()}
        >
            <Form {...formLayout} form={form}>
                {renderContent()}
            </Form>
        </Modal>
    );
};

export default CreateForm;
