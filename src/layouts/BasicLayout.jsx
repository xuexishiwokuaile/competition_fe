import ProLayout, { DefaultFooter, SettingDrawer } from '@ant-design/pro-layout';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useIntl, connect, history } from 'umi';
import { Result, Button } from 'antd';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import { getMatchMenu } from '@umijs/route-utils';
import logo from '../assets/logo.svg';
const noMatch = (
    <Result
        status={403}
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
            <Button type="primary">
                <Link to="/user/login">Go Login</Link>
            </Button>
        }
    />
);

const BasicLayout = (props) => {
    const {
        dispatch,
        children,
        settings,
        location = {
            pathname: '/',
        },
    } = props;
    const menuDataRef = useRef([]);
    useEffect(() => {
        if (dispatch) {
            dispatch({
                type: 'user/fetchCurrent',
            });
        }
    }, []);

    const [authorized, setAuthorized] = useState({
        authority: undefined,
    });
    /** Init variables */
    /** Use Authorized check all menu item */
    let menuArr = [];
    const menuDataRender = (menuList) => {
        menuArr.push(menuList);
        // menuList会变化，只能取第一次传入的menuList，即所有菜单项
        const currentMenu = getMatchMenu(location.pathname || '/', menuArr[0]).pop();
        // 写入当前组件权限
        setAuthorized(
            currentMenu || {
                authority: undefined,
            },
        );
        return menuList.map((item, i) => {
            const localItem = {
                ...item,
                children: item.children ? menuDataRender(item.children) : undefined,
            };
            // 决定组件是否在侧边菜单栏展示
            return Authorized.check(item.authority, localItem, null);
        });
    };

    const handleMenuCollapse = (payload) => {
        if (dispatch) {
            dispatch({
                type: 'global/changeLayoutCollapsed',
                payload,
            });
        }
    }; // get children authority

    // const authorized = useMemo(
    //     () => getMatchMenu(location.pathname || '/', menuDataRef.current).pop(),
    //     [location.pathname],
    // );

    const { formatMessage } = useIntl();
    return (
        <>
            <ProLayout
                logo={logo}
                formatMessage={formatMessage}
                {...props}
                {...settings}
                onCollapse={handleMenuCollapse}
                onMenuHeaderClick={() => history.push('/')}
                menuItemRender={(menuItemProps, defaultDom) => {
                    if (
                        menuItemProps.isUrl ||
                        !menuItemProps.path ||
                        location.pathname === menuItemProps.path
                    ) {
                        return defaultDom;
                    }

                    return <Link to={menuItemProps.path}>{defaultDom}</Link>;
                }}
                breadcrumbRender={(routers = []) => [
                    {
                        path: '/',
                        breadcrumbName: formatMessage({
                            id: 'menu.home',
                        }),
                    },
                    ...routers,
                ]}
                itemRender={(route, params, routes, paths) => {
                    const first = routes.indexOf(route) === 0;
                    return first ? (
                        <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
                    ) : (
                        <span>{route.breadcrumbName}</span>
                    );
                }}
                menuDataRender={menuDataRender}
                rightContentRender={() => <RightContent />}
                postMenuData={(menuData) => {
                    menuDataRef.current = menuData || [];
                    return menuData || [];
                }}
            >
                <Authorized authority={authorized.authority} noMatch={noMatch}>
                    {children}
                </Authorized>
            </ProLayout>
            <SettingDrawer
                settings={settings}
                onSettingChange={(config) =>
                    dispatch({
                        type: 'settings/changeSetting',
                        payload: config,
                    })
                }
            />
        </>
    );
};

export default connect(({ global, settings }) => ({
    collapsed: global.collapsed,
    settings,
}))(BasicLayout);
