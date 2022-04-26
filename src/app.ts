import { createApp } from 'vue';
import { Button, Toast, Icon, Row, Col, Cell } from '@nutui/nutui-taro';

import './app.scss';
import Taro from '@tarojs/taro';

const App = createApp({
  onShow (options) {
    Taro.cloud.init();
    Taro.cloud.callFunction({
      // 云函数名称
      name: 'login',
      complete: res => {
        console.log('callFunction test result: ', res);
      }
    });
  },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
});

App.use(Button).use(Toast).use(Icon).use(Row).use(Col).use(Cell);

export default App;
