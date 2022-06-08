//框架核心配置
import ColorUI from '../mp-cu/main'
export const colorUI = new ColorUI({
    config: {
        theme: 'auto',
        main: 'blue',
        text: 1,
        footer: false,
        share: true,
        shareTitle: 'AI寻物 智能寻物小程序',
        homePath: '/pages/index/index',
        tabBar: [{
            title: '首页',
            icon: '_icon-home-o',
            curIcon: '_icon-home',
            url: '/pages/index/index',
            type: 'tab'
        },
        {
            title: '寻找',
            icon: 'cicon-explore-o',
            curIcon: 'cicon-explore',
            url: '/pages/search/search',
            type: 'tab'
        },
        {
            title: '收藏',
            icon: 'cicon-favorite-o',
            curIcon: 'cicon-favorite',
            url: '/pages/collect/collect',
            type: 'tab'
        },
        {
            title: '我的',
            icon: 'cicon-my-o',
            curIcon: 'cicon-my',
            url: '/pages/user/user',
            type: 'tab'
        }],
    }
})