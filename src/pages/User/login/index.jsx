import {
    AlipayCircleOutlined,
    LockOutlined,
    MailOutlined,
    MobileOutlined,
    TaobaoCircleOutlined,
    UserOutlined,
    WeiboCircleOutlined,
} from '@ant-design/icons';
import { Alert, Space, message, Tabs } from 'antd';
import React, { useState } from 'react';
import ProForm, { ProFormCaptcha, ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import { useIntl, connect, FormattedMessage } from 'umi';
import { getFakeCaptcha } from '@/services/login';
import styles from './index.less';

const LoginMessage = ({ content }) => (
    <Alert
        style={{
            marginBottom: 24,
        }}
        message={content}
        type="error"
        showIcon
    />
);

const Login = (props) => {
    const { userLogin = {}, submitting } = props;
    const { code, type: loginType } = userLogin;
    const [type, setType] = useState('account');
    const intl = useIntl();

    const handleSubmit = (values) => {
        const { dispatch } = props;
        dispatch({
            type: 'login/login',
            payload: { ...values, type },
        });
    };

    return (
        <div className={styles.main}>
            <ProForm
                initialValues={{
                    autoLogin: true,
                }}
                submitter={{
                    render: (_, dom) => dom.pop(),
                    submitButtonProps: {
                        loading: submitting,
                        size: 'large',
                        style: {
                            width: '100%',
                        },
                    },
                }}
                onFinish={(values) => {
                    handleSubmit(values);
                    return Promise.resolve();
                }}
            >
                <Tabs activeKey={type} onChange={setType}>
                    <Tabs.TabPane
                        key="account"
                        tab={intl.formatMessage({
                            id: 'pages.login.accountLogin.tab',
                            defaultMessage: '??????????????????',
                        })}
                    />
                    {/* <Tabs.TabPane
                        key="mobile"
                        tab={intl.formatMessage({
                            id: 'pages.login.phoneLogin.tab',
                            defaultMessage: '???????????????',
                        })}
                    /> */}
                </Tabs>

                {code === '1' && loginType === 'account' && !submitting && (
                    <LoginMessage
                        content={intl.formatMessage({
                            id: 'pages.login.accountLogin.errorMessage',
                            defaultMessage: '????????????????????????admin/ant.design)',
                        })}
                    />
                )}
                {type === 'account' && (
                    <>
                        <ProFormText
                            name="name"
                            fieldProps={{
                                size: 'large',
                                prefix: <UserOutlined className={styles.prefixIcon} />,
                            }}
                            placeholder={intl.formatMessage({
                                id: 'pages.login.username.placeholder',
                                defaultMessage: '?????????',
                            })}
                            rules={[
                                {
                                    required: true,
                                    message: (
                                        <FormattedMessage
                                            id="pages.login.username.required"
                                            defaultMessage="??????????????????!"
                                        />
                                    ),
                                },
                            ]}
                        />
                        <ProFormText.Password
                            name="password"
                            fieldProps={{
                                size: 'large',
                                prefix: <LockOutlined className={styles.prefixIcon} />,
                            }}
                            placeholder={intl.formatMessage({
                                id: 'pages.login.password.placeholder',
                                defaultMessage: '??????',
                            })}
                            rules={[
                                {
                                    required: true,
                                    message: (
                                        <FormattedMessage
                                            id="pages.login.password.required"
                                            defaultMessage="??????????????????"
                                        />
                                    ),
                                },
                            ]}
                        />
                    </>
                )}

                {code === '1' && loginType === 'mobile' && !submitting && (
                    <LoginMessage content="???????????????" />
                )}
                {type === 'mobile' && (
                    <>
                        <ProFormText
                            fieldProps={{
                                size: 'large',
                                prefix: <MobileOutlined className={styles.prefixIcon} />,
                            }}
                            name="mobile"
                            placeholder={intl.formatMessage({
                                id: 'pages.login.phoneNumber.placeholder',
                                defaultMessage: '?????????',
                            })}
                            rules={[
                                {
                                    required: true,
                                    message: (
                                        <FormattedMessage
                                            id="pages.login.phoneNumber.required"
                                            defaultMessage="?????????????????????"
                                        />
                                    ),
                                },
                                {
                                    pattern: /^1\d{10}$/,
                                    message: (
                                        <FormattedMessage
                                            id="pages.login.phoneNumber.invalid"
                                            defaultMessage="????????????????????????"
                                        />
                                    ),
                                },
                            ]}
                        />
                        <ProFormCaptcha
                            fieldProps={{
                                size: 'large',
                                prefix: <MailOutlined className={styles.prefixIcon} />,
                            }}
                            captchaProps={{
                                size: 'large',
                            }}
                            placeholder={intl.formatMessage({
                                id: 'pages.login.captcha.placeholder',
                                defaultMessage: '??????????????????',
                            })}
                            captchaTextRender={(timing, count) => {
                                if (timing) {
                                    return `${count} ${intl.formatMessage({
                                        id: 'pages.getCaptchaSecondText',
                                        defaultMessage: '???????????????',
                                    })}`;
                                }

                                return intl.formatMessage({
                                    id: 'pages.login.phoneLogin.getVerificationCode',
                                    defaultMessage: '???????????????',
                                });
                            }}
                            name="captcha"
                            rules={[
                                {
                                    required: true,
                                    message: (
                                        <FormattedMessage
                                            id="pages.login.captcha.required"
                                            defaultMessage="?????????????????????"
                                        />
                                    ),
                                },
                            ]}
                            onGetCaptcha={async (mobile) => {
                                const result = await getFakeCaptcha(mobile);

                                if (result === false) {
                                    return;
                                }

                                message.success('???????????????????????????????????????1234');
                            }}
                        />
                    </>
                )}
            </ProForm>
        </div>
    );
};

export default connect(({ login, loading }) => ({
    userLogin: login,
    submitting: loading.effects['login/login'],
}))(Login);
