// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
    hash: true,
    antd: {},
    dva: {
        hmr: true,
    },
    history: {
        type: 'browser',
    },
    locale: {
        // default zh-CN
        default: 'zh-CN',
        antd: true,
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
    },
    dynamicImport: {
        loading: '@/components/PageLoading/index',
    },
    targets: {
        ie: 11,
    },
    // umi routes: https://umijs.org/docs/routing
    routes: [
        {
            path: '/',
            component: '../layouts/BlankLayout',
            routes: [
                {
                    path: '/user',
                    component: '../layouts/UserLayout',
                    routes: [
                        {
                            path: '/user/login',
                            name: 'login',
                            component: './User/login',
                        },
                        {
                            path: '/user',
                            redirect: '/user/login',
                        },
                        {
                            name: 'register-result',
                            icon: 'smile',
                            path: '/user/register-result',
                            component: './user/register-result',
                        },
                        {
                            name: 'register',
                            icon: 'smile',
                            path: '/user/register',
                            component: './user/register',
                        },
                        {
                            component: '404',
                        },
                    ],
                },
                {
                    path: '/',
                    component: '../layouts/SecurityLayout',
                    routes: [
                        {
                            path: '/',
                            component: '../layouts/BasicLayout',
                            Routes: ['src/pages/Authorized'],
                            authority: ['admin', 'user'],
                            routes: [
                                {
                                    path: '/',
                                    redirect: '/dashboard/analysis',
                                },
                                {
                                    path: '/dashboard',
                                    name: 'dashboard',
                                    icon: 'dashboard',
                                    routes: [
                                        {
                                            path: '/',
                                            redirect: '/dashboard/analysis',
                                        },
                                        {
                                            name: 'analysis',
                                            icon: 'smile',
                                            path: '/dashboard/analysis',
                                            component: './dashboard/analysis',
                                        },
                                        // {
                                        //     name: 'monitor',
                                        //     icon: 'smile',
                                        //     path: '/dashboard/monitor',
                                        //     component: './dashboard/monitor',
                                        // },
                                        // {
                                        //     name: 'workplace',
                                        //     icon: 'smile',
                                        //     path: '/dashboard/workplace',
                                        //     component: './dashboard/workplace',
                                        // },
                                        {
                                            component: '404',
                                        },
                                    ],
                                },
                                {
                                    path: '/form',
                                    icon: 'form',
                                    name: 'form',
                                    routes: [
                                        {
                                            path: '/',
                                            redirect: '/form/add-competition',
                                        },
                                        {
                                            name: 'add-competition',
                                            icon: 'smile',
                                            path: '/form/add-competition',
                                            component: './form/add-competition',
                                        },
                                        // {
                                        //     name: 'step-form',
                                        //     icon: 'smile',
                                        //     path: '/form/step-form',
                                        //     component: './form/step-form',
                                        // },
                                        // {
                                        //     name: 'advanced-form',
                                        //     icon: 'smile',
                                        //     authority: ['user'],
                                        //     path: '/form/advanced-form',
                                        //     component: './form/advanced-form',
                                        // },
                                        {
                                            component: '404',
                                        },
                                    ],
                                },
                                {
                                    path: '/list',
                                    icon: 'table',
                                    name: 'list',
                                    routes: [
                                        {
                                            path: '/list/search',
                                            name: 'search-list',
                                            component: './list/search',
                                            routes: [
                                                {
                                                    path: '/list/search',
                                                    redirect: '/list/search/competitions',
                                                },
                                                {
                                                    name: 'competitions',
                                                    icon: 'smile',
                                                    path: '/list/search/competitions',
                                                    component: './list/search/competitions',
                                                },
                                                // {
                                                //     name: 'projects',
                                                //     icon: 'smile',
                                                //     path: '/list/search/projects',
                                                //     component: './list/search/projects',
                                                // },
                                                // {
                                                //     name: 'applications',
                                                //     icon: 'smile',
                                                //     path: '/list/search/applications',
                                                //     component: './list/search/applications',
                                                // },
                                                {
                                                    component: '404',
                                                },
                                            ],
                                        },
                                        {
                                            path: '/',
                                            redirect: '/list/my-competition',
                                        },
                                        {
                                            name: 'my-competition',
                                            icon: 'smile',
                                            path: '/list/my-competition',
                                            component: './list/my-competition',
                                        },
                                        // {
                                        //     name: 'basic-list',
                                        //     icon: 'smile',
                                        //     path: '/list/basic-list',
                                        //     component: './list/basic-list',
                                        // },
                                        {
                                            name: 'my-message',
                                            icon: 'smile',
                                            path: '/list/my-message',
                                            component: './list/my-message',
                                        },
                                        {
                                            component: '404',
                                        },
                                    ],
                                },
                                // {
                                //     path: '/profile',
                                //     name: 'profile',
                                //     icon: 'profile',
                                //     routes: [
                                //         {
                                //             path: '/',
                                //             redirect: '/profile/basic',
                                //         },
                                //         {
                                //             name: 'basic',
                                //             icon: 'smile',
                                //             path: '/profile/basic',
                                //             component: './profile/basic',
                                //         },
                                //         {
                                //             name: 'advanced',
                                //             icon: 'smile',
                                //             path: '/profile/advanced',
                                //             component: './profile/advanced',
                                //         },
                                //         {
                                //             component: '404',
                                //         },
                                //     ],
                                // },
                                // {
                                //     name: 'result',
                                //     icon: 'CheckCircleOutlined',
                                //     path: '/result',
                                //     routes: [
                                //         {
                                //             path: '/',
                                //             redirect: '/result/success',
                                //         },
                                //         {
                                //             name: 'success',
                                //             icon: 'smile',
                                //             path: '/result/success',
                                //             component: './result/success',
                                //         },
                                //         {
                                //             name: 'fail',
                                //             icon: 'smile',
                                //             path: '/result/fail',
                                //             component: './result/fail',
                                //         },
                                //         {
                                //             component: '404',
                                //         },
                                //     ],
                                // },
                                // {
                                //     name: 'exception',
                                //     icon: 'warning',
                                //     path: '/exception',
                                //     routes: [
                                //         {
                                //             path: '/',
                                //             redirect: '/exception/403',
                                //         },
                                //         {
                                //             name: '403',
                                //             icon: 'smile',
                                //             path: '/exception/403',
                                //             component: './exception/403',
                                //         },
                                //         {
                                //             name: '404',
                                //             icon: 'smile',
                                //             path: '/exception/404',
                                //             component: './exception/404',
                                //         },
                                //         {
                                //             name: '500',
                                //             icon: 'smile',
                                //             path: '/exception/500',
                                //             component: './exception/500',
                                //         },
                                //         {
                                //             component: '404',
                                //         },
                                //     ],
                                // },
                                // {
                                //     name: 'account',
                                //     icon: 'user',
                                //     path: '/account',
                                //     routes: [
                                //         {
                                //             path: '/',
                                //             redirect: '/account/center',
                                //         },
                                //         {
                                //             name: 'center',
                                //             icon: 'smile',
                                //             path: '/account/center',
                                //             component: './account/center',
                                //         },
                                //         {
                                //             name: 'settings',
                                //             icon: 'smile',
                                //             path: '/account/settings',
                                //             component: './account/settings',
                                //         },
                                //         {
                                //             component: '404',
                                //         },
                                //     ],
                                // },
                                // {
                                //     name: 'editor',
                                //     icon: 'highlight',
                                //     path: '/editor',
                                //     routes: [
                                //         {
                                //             path: '/',
                                //             redirect: '/editor/flow',
                                //         },
                                //         {
                                //             name: 'flow',
                                //             icon: 'smile',
                                //             path: '/editor/flow',
                                //             component: './editor/flow',
                                //         },
                                //         {
                                //             name: 'mind',
                                //             icon: 'smile',
                                //             path: '/editor/mind',
                                //             component: './editor/mind',
                                //         },
                                //         {
                                //             name: 'koni',
                                //             icon: 'smile',
                                //             path: '/editor/koni',
                                //             component: './editor/koni',
                                //         },
                                //         {
                                //             component: '404',
                                //         },
                                //     ],
                                // },
                                {
                                    component: '404',
                                },
                            ],
                        },
                        {
                            component: '404',
                        },
                    ],
                },
            ],
        },
    ],
    // Theme for antd: https://ant.design/docs/react/customize-theme-cn
    theme: {
        'primary-color': defaultSettings.primaryColor,
    },
    title: false,
    ignoreMomentLocale: true,
    proxy: proxy[REACT_APP_ENV || 'dev'],
    manifest: {
        basePath: '/',
    },
    esbuild: {},
});
