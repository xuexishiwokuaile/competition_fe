// eslint-disable-next-line import/no-extraneous-dependencies
import { parse } from 'url';

// mock tableListDataSource
const genList = (current, pageSize) => {
    const tableListDataSource = [];

    // for (let i = 0; i < pageSize; i += 1) {
    // const index = (current - 1) * 10 + i;
    const i = 1;
    tableListDataSource.push({
        key: 1,
        disabled: i % 6 === 0,
        href: 'https://ant.design',
        avatar: [
            'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
            'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
        ][i % 2],
        name: `第七届中国国际互联网+大学生创新创业大赛`,
        owner: '曲丽丽',
        desc:
            '为全面落实习近平总书记给中国“互联网+”大学生创新创业大赛“青年红色筑梦之旅”大学生回信重要精神，深入推进大众创业万众创新，推动高等教育高质量发展，加快培养创新创业人才，决定举办第七届中国国际“互联网+”大学生创新创业大赛。',
        callNo: 62,
        status: (Math.floor(Math.random() * 10) % 4).toString(),
        updatedAt: new Date('April 20, 2021 09:25:00'),
        createdAt: new Date('April 20, 2021 09:25:00'),
        progress: Math.ceil(Math.random() * 100),
    });
    tableListDataSource.push({
        key: 2,
        disabled: i % 6 === 0,
        href: 'https://ant.design',
        avatar: [
            'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
            'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
        ][i % 2],
        name: `第14届中国大学生计算机设计大赛`,
        owner: '曲丽丽',
        desc:
            '中国大学生计算机设计大赛（简称“大赛”或4C）启筹于2007年，始创于2008年，已经举办了13届66场赛事。目前，大赛是全国普通高校学科竞赛排行榜榜单的赛事之一。大赛国赛的参赛对象覆盖中国大陆普通高校中所有专业的当年在校本科生（含当年毕业的本科生）。',
        callNo: 50,
        status: (Math.floor(Math.random() * 10) % 4).toString(),
        updatedAt: new Date('March 13, 2021 11:13:00'),
        createdAt: new Date('March 13, 2021 11:13:00'),
        progress: Math.ceil(Math.random() * 100),
    });
    tableListDataSource.push({
        key: 3,
        disabled: i % 6 === 0,
        href: 'https://ant.design',
        avatar: [
            'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
            'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
        ][i % 2],
        name: `2021年全国大学生物联网设计竞赛`,
        owner: '曲丽丽',
        desc:
            '“全国大学生物联网设计竞赛”是由教育部高等学校计算机类专业教学指导委员会和物联网工程专业建设研究专家组共同发起，以促进国内物联网相关专业建设和人才培养为目标，以物联网技术为核心，激发物联网相关专业学生的创造、创新、创业活力，推动高校创新创业教育而举办的面向大学生的学科竞赛。',
        callNo: 28,
        status: (Math.floor(Math.random() * 10) % 4).toString(),
        updatedAt: new Date('March 29, 2021 16:45:00'),
        createdAt: new Date('March 29, 2021 16:45:00'),
        progress: Math.ceil(Math.random() * 100),
    });
    // }

    tableListDataSource.reverse();
    return tableListDataSource;
};

let tableListDataSource = genList(1, 100);

function getRule(req, res, u) {
    let realUrl = u;

    if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
        realUrl = req.url;
    }

    const { current = 1, pageSize = 10 } = req.query;
    const params = parse(realUrl, true).query;
    let dataSource = [...tableListDataSource].slice((current - 1) * pageSize, current * pageSize);
    const sorter = JSON.parse(params.sorter);

    if (sorter) {
        dataSource = dataSource.sort((prev, next) => {
            let sortNumber = 0;
            Object.keys(sorter).forEach((key) => {
                if (sorter[key] === 'descend') {
                    if (prev[key] - next[key] > 0) {
                        sortNumber += -1;
                    } else {
                        sortNumber += 1;
                    }

                    return;
                }

                if (prev[key] - next[key] > 0) {
                    sortNumber += 1;
                } else {
                    sortNumber += -1;
                }
            });
            return sortNumber;
        });
    }

    if (params.filter) {
        const filter = JSON.parse(params.filter);

        if (Object.keys(filter).length > 0) {
            dataSource = dataSource.filter((item) => {
                return Object.keys(filter).some((key) => {
                    if (!filter[key]) {
                        return true;
                    }

                    if (filter[key].includes(`${item[key]}`)) {
                        return true;
                    }

                    return false;
                });
            });
        }
    }

    if (params.name) {
        dataSource = dataSource.filter((data) => data.name.includes(params.name || ''));
    }

    const result = {
        data: dataSource,
        total: tableListDataSource.length,
        success: true,
        pageSize,
        current: parseInt(`${params.currentPage}`, 10) || 1,
    };
    return res.json(result);
}

function postRule(req, res, u, b) {
    let realUrl = u;

    if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
        realUrl = req.url;
    }

    const body = (b && b.body) || req.body;
    const { method, name, desc, key } = body;

    switch (method) {
        /* eslint no-case-declarations:0 */
        case 'delete':
            tableListDataSource = tableListDataSource.filter(
                (item) => key.indexOf(item.key) === -1,
            );
            break;

        case 'post':
            (() => {
                const i = Math.ceil(Math.random() * 10000);
                const newRule = {
                    key: tableListDataSource.length,
                    href: 'https://ant.design',
                    avatar: [
                        'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
                        'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
                    ][i % 2],
                    name,
                    owner: '曲丽丽',
                    desc,
                    callNo: Math.floor(Math.random() * 1000),
                    status: (Math.floor(Math.random() * 10) % 2).toString(),
                    updatedAt: new Date(),
                    createdAt: new Date(),
                    progress: Math.ceil(Math.random() * 100),
                };
                tableListDataSource.unshift(newRule);
                return res.json(newRule);
            })();

            return;

        case 'update':
            (() => {
                let newRule = {};
                tableListDataSource = tableListDataSource.map((item) => {
                    if (item.key === key) {
                        newRule = { ...item, desc, name };
                        return { ...item, desc, name };
                    }

                    return item;
                });
                return res.json(newRule);
            })();

            return;

        default:
            break;
    }

    const result = {
        list: tableListDataSource,
        pagination: {
            total: tableListDataSource.length,
        },
    };
    res.json(result);
}

export default {
    'GET /api/rule': getRule,
    'POST /api/rule': postRule,
};
