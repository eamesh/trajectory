export default defineAppConfig({
  pages: [
    'pages/main/index/index',
    'pages/main/me/index',
    'pages/funcs/map/index',
    'pages/funcs/community/index',
    'pages/funcs/day/index',
    'pages/question/index'
  ],
  window: {
    backgroundColor: '#f1f1f1',
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#f8f8f8',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#747275',
    selectedColor: '#333333',
    backgroundColor: '#f8f8f8',
    borderStyle: 'white',
    list: [
      {
        iconPath: './assets/images/tabbar/layout.png',
        selectedIconPath: './assets/images/tabbar/layout-active.png',
        text: '首页',
        pagePath: 'pages/main/index/index'
      },
      {
        iconPath: './assets/images/tabbar/me.png',
        selectedIconPath: './assets/images/tabbar/me-active.png',
        text: '我的',
        pagePath: 'pages/main/me/index'
      }
    ]
  },
  plugins: {
    chooseLocation: {
      version: '1.0.9',
      provider: 'wx76a9a06e5b4e693e'
    },
  },
  permission: {
    'scope.userLocation': {
      desc: '你的位置信息将用于小程序位置接口的效果展示'
    }
  }
});
