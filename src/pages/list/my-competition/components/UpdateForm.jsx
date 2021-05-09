import React, { useState } from 'react';
import {
    Form,
    Button,
    DatePicker,
    Input,
    Modal,
    Radio,
    Select,
    Steps,
    Upload,
    InputNumber,
    Checkbox,
    Row,
    Col,
} from 'antd';
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
        name: props.values.name,
        detail: props.values.detail,
        comId: props.values.comId,
        url: props.values.url,
        currentTypes: props.values.types,
        target: '0',
        template: '0',
        type: '1',
        time: '',
        frequency: 'month',
    });
    const [currentStep, setCurrentStep] = useState(0);
    const [image, setImage] = useState(props.values.image);
    const [selectedTypes, setSelectTypes] = useState(props.values.types);
    const [form] = Form.useForm();
    const {
        onSubmit: handleUpdate,
        onCancel: handleUpdateModalVisible,
        updateModalVisible,
        values,
        types,
    } = props;
    const status = true;

    const forward = () => setCurrentStep(currentStep + 1);

    const backward = () => setCurrentStep(currentStep - 1);

    const onFileChange = (info) => {
        setImage(info.file);
    };

    const getDefaultValue = () => {
        const typesStr = formVals.currentTypes;
        const typesArr = typesStr ? typesStr.split(',') : [];
        return typesArr;
    };

    const onTypeChange = (list) => {
        setSelectTypes(list.toString());
    };

    const handleNext = async () => {
        const fieldsValue = await form.validateFields();
        setFormVals({ ...formVals, ...fieldsValue });

        // if (currentStep < 2) {
        //     forward();
        // } else {
        //     handleUpdate({ ...formVals, ...fieldsValue });
        // }

        // 转化成formData
        const formData = new FormData();
        for (let key in fieldsValue) {
            formData.append(key, fieldsValue[key]);
        }
        formData.set('image', image);
        formData.set('typeName', selectedTypes);
        formData.append('id', formVals.comId);
        handleUpdate(formData);
    };

    const renderContent = () => {
        // if (currentStep === 1) {
        //     return (
        //         <>
        //             <FormItem name="target" label="监控对象">
        //                 <Select
        //                     style={{
        //                         width: '100%',
        //                     }}
        //                 >
        //                     <Option value="0">表一</Option>
        //                     <Option value="1">表二</Option>
        //                 </Select>
        //             </FormItem>
        //             <FormItem name="template" label="规则模板">
        //                 <Select
        //                     style={{
        //                         width: '100%',
        //                     }}
        //                 >
        //                     <Option value="0">规则模板一</Option>
        //                     <Option value="1">规则模板二</Option>
        //                 </Select>
        //             </FormItem>
        //             <FormItem name="type" label="规则类型">
        //                 <RadioGroup>
        //                     <Radio value="0">强</Radio>
        //                     <Radio value="1">弱</Radio>
        //                 </RadioGroup>
        //             </FormItem>
        //         </>
        //     );
        // }

        // if (currentStep === 2) {
        //     return (
        //         <>
        //             <FormItem
        //                 name="time"
        //                 label="开始时间"
        //                 rules={[
        //                     {
        //                         required: true,
        //                         message: '请选择开始时间！',
        //                     },
        //                 ]}
        //             >
        //                 <DatePicker
        //                     style={{
        //                         width: '100%',
        //                     }}
        //                     showTime
        //                     format="YYYY-MM-DD HH:mm:ss"
        //                     placeholder="选择开始时间"
        //                 />
        //             </FormItem>
        //             <FormItem name="frequency" label="调度周期">
        //                 <Select
        //                     style={{
        //                         width: '100%',
        //                     }}
        //                 >
        //                     <Option value="month">月</Option>
        //                     <Option value="week">周</Option>
        //                 </Select>
        //             </FormItem>
        //         </>
        //     );
        // }

        return (
            <>
                <FormItem
                    name="name"
                    label="竞赛名称"
                    rules={[
                        {
                            required: true,
                            message: '请输入竞赛名称！',
                        },
                    ]}
                >
                    <Input placeholder="请输入" />
                </FormItem>
                <FormItem
                    name="detail"
                    label="竞赛详情"
                    rules={[
                        {
                            required: true,
                            message: '请输入简介！',
                        },
                    ]}
                >
                    <TextArea rows={4} placeholder="请输入至少五个字符" />
                </FormItem>
                <FormItem
                    name="url"
                    label="竞赛主页"
                    rules={[
                        {
                            required: true,
                            message: '请输入主页！',
                        },
                    ]}
                >
                    <Input placeholder="请输入" />
                </FormItem>
                <FormItem name="image" label="封面图片">
                    <Upload
                        listType="picture-card"
                        onChange={onFileChange}
                        maxCount={1}
                        accept="image/*"
                        directory={false}
                        fileList={[{ url: props.values.image || '' }]}
                    >
                        <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                </FormItem>
                <FormItem name="typeName" label="竞赛种类">
                    <div>
                        <Checkbox.Group onChange={onTypeChange} defaultValue={getDefaultValue}>
                            <Row>
                                {types &&
                                    types.map((item) => (
                                        <Col span={8}>
                                            <Checkbox value={item.typeName} key={item.typeId}>
                                                {item.typeName}
                                            </Checkbox>
                                        </Col>
                                    ))}
                            </Row>
                        </Checkbox.Group>
                    </div>
                </FormItem>
            </>
        );
    };

    const renderFooter = () => {
        // if (currentStep === 1) {
        //     return (
        //         <>
        //             <Button
        //                 style={{
        //                     float: 'left',
        //                 }}
        //                 onClick={backward}
        //             >
        //                 上一步
        //             </Button>
        //             <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
        //             <Button type="primary" onClick={() => handleNext()}>
        //                 下一步
        //             </Button>
        //         </>
        //     );
        // }

        // if (currentStep === 2) {
        //     return (
        //         <>
        //             <Button
        //                 style={{
        //                     float: 'left',
        //                 }}
        //                 onClick={backward}
        //             >
        //                 上一步
        //             </Button>
        //             <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
        //             <Button type="primary" onClick={() => handleNext()}>
        //                 完成
        //             </Button>
        //         </>
        //     );
        // }

        return (
            <>
                <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
                <Button type="primary" onClick={() => handleNext()}>
                    完成
                </Button>
            </>
        );
    };

    return (
        <Modal
            width={640}
            bodyStyle={{
                padding: '32px 40px 48px',
            }}
            destroyOnClose
            title="竞赛设置"
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
                    name: formVals.name,
                    detail: formVals.detail,
                    url: formVals.url,
                    currentTypes: formVals.types,
                }}
            >
                {renderContent()}
            </Form>
        </Modal>
    );
};

export default UpdateForm;
