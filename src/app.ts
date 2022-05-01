import { createApp } from 'vue';
import { Button, Toast, Icon, Row, Col, Cell } from '@nutui/nutui-taro';
import Taro from '@tarojs/taro';
import { createPinia } from 'pinia';

import './app.scss';
import { useConfigStore } from './stores/config';
import { USER_OPENID } from './constants/user';

const App = createApp({
  onLaunch () {
    try {
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
    } catch (error) {
      console.log(error);
    }
  },

  setup () {
    //
  },

  async onShow (options) {
    Taro.cloud.init();
    try {
      const openid = Taro.getStorageSync(USER_OPENID);
      if (!openid) {
        const res = await Taro.cloud.callFunction({
          name: 'user',
          data: {
            type: 'upsert',
          },
        }) as any;
        console.log(res.result.data.openid);
        Taro.setStorageSync(USER_OPENID, res.result.data.openid);
      }
    } catch (error) {
      console.log(error);
    }
    const useConfig = useConfigStore();
    useConfig.getConfig();
  },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
});

App.use(createPinia())
  .use(Button)
  .use(Toast)
  .use(Icon)
  .use(Row)
  .use(Col)
  .use(Cell);

export default App;
