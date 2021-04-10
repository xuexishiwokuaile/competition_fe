/*
 * @Author: chenanran
 * @Date: 2021-04-08 13:19:41
 */
/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
    dev: {
        '/api/': {
            target: 'http://localhost:3000/', // 配置代理，以/api开头的请求都会转发到这里
            changeOrigin: true,
            pathRewrite: {
                '^/api': '',
            },
        },
    },
    test: {
        '/api/': {
            target: 'https://preview.pro.ant.design',
            changeOrigin: true,
            pathRewrite: {
                '^': '',
            },
        },
    },
    pre: {
        '/api/': {
            target: 'your pre url',
            changeOrigin: true,
            pathRewrite: {
                '^': '',
            },
        },
    },
};
