import { createApp } from 'vue';
import { Button, Toast, Icon, Row, Col, Cell } from '@nutui/nutui-taro';
import Taro from '@tarojs/taro';

import './app.scss';

const App = createApp({
  onLaunch () {
    const updateManager = Taro.getUpdateManager();

    updateManager.onUpdateReady(() => {
      Taro.showModal({
        title: '更新提示',
        content: '新版本已准备好，是否重启应用?',
        success (res) {
          if (res.confirm) {
            updateManager.applyUpdate();
          }
        }
      });
    });
  },

  onShow (options) {
    Taro.cloud.init();
  },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
});

App.use(Button).use(Toast).use(Icon).use(Row).use(Col).use(Cell);

export default App;
