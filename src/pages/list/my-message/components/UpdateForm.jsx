import React, { useState } from 'react';
import { Form, Button, DatePicker, Input, Modal, Radio, Select, Steps, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;
const formLayout = {
    labelCol: {
        span: 7,
    },
    wrapperCol: {
        span: 13,
    },
};

const UpdateForm = (props) => {
    const [formVals, setFormVals] = useState({
        detail: props.values.detail,
        id: props.values.id,
        target: '0',
        template: '0',
        type: '1',
        time: '',
        frequency: 'month',
    });
    const [currentStep, setCurrentStep] = useState(0);
    const [image, setImage] = useState(props.values.image);
    const [form] = Form.useForm();
    const {
        onSubmit: handleUpdate,
        onCancel: handleUpdateModalVisible,
        updateModalVisible,
        values,
    } = props;

    const forward = () => setCurrentStep(currentStep + 1);

    const backward = () => setCurrentStep(currentStep - 1);

    const onFileChange = (info) => {
        console.log(info.file);
        setImage(info.file);
    };

    const renderContent = () => {
        return (
            <>
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
                <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
                <Button type="primary" onClick={handleUpdateMessage}>
                    完成
                </Button>
            </>
        );
    };

    const handleUpdateMessage = async () => {
        const fieldsValue = await form.validateFields();
        handleUpdate({ ...formVals, ...fieldsValue });
    };

    return (
        <Modal
            width={640}
            bodyStyle={{
                padding: '32px 40px 48px',
            }}
            destroyOnClose
            title="编辑信息"
            visible={updateModalVisible}
            footer={renderFooter()}
            onCancel={() => handleUpdateModalVisible()}
        >
            {/* <Steps
                style={{
                    marginBottom: 28,
                }}
                size="small"
                current={currentStep}
            >
                <Step title="基本信息" />
                <Step title="配置规则属性" />
                <Step title="设定调度周期" />
            </Steps> */}
            <Form
                {...formLayout}
                form={form}
                initialValues={{
                    target: formVals.target,
                    template: formVals.template,
                    type: formVals.type,
                    frequency: formVals.frequency,
                    detail: formVals.detail,
                    id: formVals.id,
                }}
            >
                {renderContent()}
            </Form>
        </Modal>
    );
};

export default UpdateForm;
