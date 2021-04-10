import { InfoCircleOutlined } from '@ant-design/icons';
import {
    Button,
    Card,
    DatePicker,
    Input,
    Form,
    InputNumber,
    Radio,
    Select,
    Tooltip,
    Checkbox,
    Row,
    Col,
    Upload,
} from 'antd';
import { connect, FormattedMessage, formatMessage } from 'umi';
import React, { useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './style.less';
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const BasicForm = (props) => {
    const { submitting, types, dispatch } = props;
    const { Dragger } = Upload;
    const { type } = types;
    const [form] = Form.useForm();
    const formItemLayout = {
        labelCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 7,
            },
        },
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 12,
            },
            md: {
                span: 10,
            },
        },
    };
    const submitFormLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 10,
                offset: 7,
            },
        },
    };

    useEffect(() => {
        dispatch({
            type: 'formAddCompetition/findAllTypes',
        });
    }, []);

    let selectedTypes = [];
    let image;

    const onFinish = (values) => {
        const typeName = selectedTypes.toString();
        // 后端只能接收formdata，需要转换后再发送
        const formData = new FormData();
        for (let key in values) {
            formData.append(key, values[key]);
        }
        formData.append('typeName', typeName);
        formData.append('image', image);
        dispatch({
            type: 'formAddCompetition/submitRegularForm',
            payload: formData,
        });
    };

    const onFinishFailed = (errorInfo) => {
        // eslint-disable-next-line no-console
        console.log('Failed:', errorInfo);
    };

    const onChange = (list) => {
        selectedTypes = list;
    };

    const onFileChange = (info) => {
        // 只上传最新选择的文件
        image = info.file;
    };

    return (
        <PageContainer content={<FormattedMessage id="formandadd-competition.basic.description" />}>
            <Card bordered={false}>
                <Form
                    hideRequiredMark
                    style={{
                        marginTop: 8,
                    }}
                    form={form}
                    name="basic"
                    initialValues={{
                        public: '1',
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <FormItem
                        {...formItemLayout}
                        label={<FormattedMessage id="formandadd-competition.title.label" />}
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: formatMessage({
                                    id: 'formandadd-competition.title.required',
                                }),
                            },
                        ]}
                    >
                        <Input
                            placeholder={formatMessage({
                                id: 'formandadd-competition.title.placeholder',
                            })}
                        />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={
                            <span>
                                <FormattedMessage id="formandadd-competition.date.label" />
                                <em className={styles.optional}>
                                    <FormattedMessage id="formandadd-competition.form.optional" />
                                </em>
                            </span>
                        }
                        name="date"
                    >
                        <RangePicker
                            style={{
                                width: '100%',
                            }}
                            placeholder={[
                                formatMessage({
                                    id: 'formandadd-competition.placeholder.start',
                                }),
                                formatMessage({
                                    id: 'formandadd-competition.placeholder.end',
                                }),
                            ]}
                        />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={<FormattedMessage id="formandadd-competition.detail.label" />}
                        name="detail"
                        rules={[
                            {
                                required: true,
                                message: formatMessage({
                                    id: 'formandadd-competition.detail.required',
                                }),
                            },
                        ]}
                    >
                        <TextArea
                            style={{
                                minHeight: 32,
                            }}
                            placeholder={formatMessage({
                                id: 'formandadd-competition.detail.placeholder',
                            })}
                            rows={4}
                        />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={<FormattedMessage id="formandadd-competition.url.label" />}
                        name="url"
                        rules={[
                            {
                                required: true,
                                message: formatMessage({
                                    id: 'formandadd-competition.url.required',
                                }),
                            },
                        ]}
                    >
                        <Input
                            placeholder={formatMessage({
                                id: 'formandadd-competition.url.placeholder',
                            })}
                        />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={
                            <span>
                                <FormattedMessage id="formandadd-competition.image.label" />
                                <em className={styles.optional}>
                                    <FormattedMessage id="formandadd-competition.form.optional" />
                                </em>
                            </span>
                        }
                        name="invites"
                    >
                        <Dragger
                            onChange={onFileChange}
                            beforeUpload={() => false}
                            maxCount={1}
                            accept="image/*"
                        >
                            <p>点击或拖拽来上传</p>
                        </Dragger>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={
                            <span>
                                <FormattedMessage id="formandadd-competition.count.label" />
                            </span>
                        }
                        rules={[
                            {
                                required: true,
                                message: formatMessage({
                                    id: 'formandadd-competition.count.required',
                                }),
                            },
                        ]}
                        name="count"
                    >
                        <InputNumber
                            placeholder={formatMessage({
                                id: 'formandadd-competition.count.placeholder',
                            })}
                            min={0}
                            max={100}
                        />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={<FormattedMessage id="formandadd-competition.public.label" />}
                        rules={[
                            {
                                required: true,
                                message: formatMessage({
                                    id: 'formandadd-competition.count.required',
                                }),
                            },
                        ]}
                    >
                        <div>
                            <Checkbox.Group onChange={onChange}>
                                <Row>
                                    {type &&
                                        type.map((item) => (
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
                    <FormItem
                        {...submitFormLayout}
                        style={{
                            marginTop: 32,
                        }}
                    >
                        <Button type="primary" htmlType="submit" loading={submitting}>
                            <FormattedMessage id="formandadd-competition.form.submit" />
                        </Button>
                    </FormItem>
                </Form>
            </Card>
        </PageContainer>
    );
};

export default connect(({ loading, formAddCompetition }) => ({
    submitting: loading.effects['formAddCompetition/submitRegularForm'],
    types: formAddCompetition,
}))(BasicForm);
