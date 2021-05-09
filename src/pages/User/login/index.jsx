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
                            defaultMessage: '账户密码登录',
                        })}
                    />
                    {/* <Tabs.TabPane
                        key="mobile"
                        tab={intl.formatMessage({
                            id: 'pages.login.phoneLogin.tab',
                            defaultMessage: '手机号登录',
                        })}
                    /> */}
                </Tabs>

                {code === '1' && loginType === 'account' && !submitting && (
                    <LoginMessage
                        content={intl.formatMessage({
                            id: 'pages.login.accountLogin.errorMessage',
                            defaultMessage: '账户或密码错误（admin/ant.design)',
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
                                defaultMessage: '用户名',
                            })}
                            rules={[
                                {
                                    required: true,
                                    message: (
                                        <FormattedMessage
                                            id="pages.login.username.required"
                                            defaultMessage="请输入用户名!"
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
                                defaultMessage: '密码',
                            })}
                            rules={[
                                {
                                    required: true,
                                    message: (
                                        <FormattedMessage
                                            id="pages.login.password.required"
                                            defaultMessage="请输入密码！"
                                        />
                                    ),
                                },
                            ]}
                        />
                    </>
                )}

                {code === '1' && loginType === 'mobile' && !submitting && (
                    <LoginMessage content="验证码错误" />
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
                                defaultMessage: '手机号',
                            })}
                            rules={[
                                {
                                    required: true,
                                    message: (
                                        <FormattedMessage
                                            id="pages.login.phoneNumber.required"
                                            defaultMessage="请输入手机号！"
                                        />
                                    ),
                                },
                                {
                                    pattern: /^1\d{10}$/,
                                    message: (
                                        <FormattedMessage
                                            id="pages.login.phoneNumber.invalid"
                                            defaultMessage="手机号格式错误！"
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
                                defaultMessage: '请输入验证码',
                            })}
                            captchaTextRender={(timing, count) => {
                                if (timing) {
                                    return `${count} ${intl.formatMessage({
                                        id: 'pages.getCaptchaSecondText',
                                        defaultMessage: '获取验证码',
                                    })}`;
                                }

                                return intl.formatMessage({
                                    id: 'pages.login.phoneLogin.getVerificationCode',
                                    defaultMessage: '获取验证码',
                                });
                            }}
                            name="captcha"
                            rules={[
                                {
                                    required: true,
                                    message: (
                                        <FormattedMessage
                                            id="pages.login.captcha.required"
                                            defaultMessage="请输入验证码！"
                                        />
                                    ),
                                },
                            ]}
                            onGetCaptcha={async (mobile) => {
                                const result = await getFakeCaptcha(mobile);

                                if (result === false) {
                                    return;
                                }

                                message.success('获取验证码成功！验证码为：1234');
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
