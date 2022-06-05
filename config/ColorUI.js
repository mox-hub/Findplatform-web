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
            icon: '/images/tabbar/home.png',
            curIcon: '/images/tabbar/home-cur.png',
            url: '/pages/index/index',
            type: 'tab'
        },
        {
            title: '寻找',
            icon: '/images/tabbar/search.png',
            curIcon: '/images/tabbar/search-cur.png',
            url: '/pages/search/search',
            type: 'tab'
        },
        {
            title: '收藏',
            icon: '/images/tabbar/collect.png',
            curIcon: '/images/tabbar/collect-cur.png',
            url: '/pages/collect/collect',
            type: 'tab'
        },
        {
            title: '我的',
            icon: '/images/tabbar/me.png',
            curIcon: '/images/tabbar/me-cur.png',
            url: '/pages/user/user',
            type: 'tab'
        }],
    }
})