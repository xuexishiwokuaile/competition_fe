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

        // ?????????formData
        const formData = new FormData();
        for (let key in fieldsValue) {
            if (key !== 'image') {
                formData.append(key, fieldsValue[key]);
            }
        }
        formData.append('image', image);
        formData.set('typeName', selectedTypes);
        formData.append('id', formVals.comId);
        handleUpdate(formData);
    };

    const renderContent = () => {
        // if (currentStep === 1) {
        //     return (
        //         <>
        //             <FormItem name="target" label="????????????">
        //                 <Select
        //                     style={{
        //                         width: '100%',
        //                     }}
        //                 >
        //                     <Option value="0">??????</Option>
        //                     <Option value="1">??????</Option>
        //                 </Select>
        //             </FormItem>
        //             <FormItem name="template" label="????????????">
        //                 <Select
        //                     style={{
        //                         width: '100%',
        //                     }}
        //                 >
        //                     <Option value="0">???????????????</Option>
        //                     <Option value="1">???????????????</Option>
        //                 </Select>
        //             </FormItem>
        //             <FormItem name="type" label="????????????">
        //                 <RadioGroup>
        //                     <Radio value="0">???</Radio>
        //                     <Radio value="1">???</Radio>
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
        //                 label="????????????"
        //                 rules={[
        //                     {
        //                         required: true,
        //                         message: '????????????????????????',
        //                     },
        //                 ]}
        //             >
        //                 <DatePicker
        //                     style={{
        //                         width: '100%',
        //                     }}
        //                     showTime
        //                     format="YYYY-MM-DD HH:mm:ss"
        //                     placeholder="??????????????????"
        //                 />
        //             </FormItem>
        //             <FormItem name="frequency" label="????????????">
        //                 <Select
        //                     style={{
        //                         width: '100%',
        //                     }}
        //                 >
        //                     <Option value="month">???</Option>
        //                     <Option value="week">???</Option>
        //                 </Select>
        //             </FormItem>
        //         </>
        //     );
        // }

        return (
            <>
                <FormItem
                    name="name"
                    label="????????????"
                    rules={[
                        {
                            required: true,
                            message: '????????????????????????',
                        },
                    ]}
                >
                    <Input placeholder="?????????" />
                </FormItem>
                <FormItem
                    name="detail"
                    label="????????????"
                    rules={[
                        {
                            required: true,
                            message: '??????????????????',
                        },
                    ]}
                >
                    <TextArea rows={4} placeholder="???????????????????????????" />
                </FormItem>
                <FormItem
                    name="url"
                    label="????????????"
                    rules={[
                        {
                            required: true,
                            message: '??????????????????',
                        },
                    ]}
                >
                    <Input placeholder="?????????" />
                </FormItem>
                <FormItem name="image" label="????????????">
                    <Upload
                        listType="picture-card"
                        onChange={onFileChange}
                        maxCount={1}
                        accept="image/*"
                        directory={false}
                        beforeUpload={() => false}
                        defaultFileList={[{ url: props.values.image || '' }]}
                    >
                        <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                </FormItem>
                <FormItem name="typeName" label="????????????">
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
        //                 ?????????
        //             </Button>
        //             <Button onClick={() => handleUpdateModalVisible(false, values)}>??????</Button>
        //             <Button type="primary" onClick={() => handleNext()}>
        //                 ?????????
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
        //                 ?????????
        //             </Button>
        //             <Button onClick={() => handleUpdateModalVisible(false, values)}>??????</Button>
        //             <Button type="primary" onClick={() => handleNext()}>
        //                 ??????
        //             </Button>
        //         </>
        //     );
        // }

        return (
            <>
                <Button onClick={() => handleUpdateModalVisible(false, values)}>??????</Button>
                <Button type="primary" onClick={() => handleNext()}>
                    ??????
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
            title="????????????"
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
                <Step title="????????????" />
                <Step title="??????????????????" />
                <Step title="??????????????????" />
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
