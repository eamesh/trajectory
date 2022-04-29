import Taro from '@tarojs/taro';
import { defineStore } from 'pinia';

export interface ConfigSchema {
  notice: string;
  community: string;
  [key:string]: any;
}

export interface ConfigStoreState {
  config: ConfigSchema;
}

export const useConfigStore = defineStore('config', {
  state: () => {
    return {
      name: '测',
      config: {
        notice: '',
        community: ''
      }
    };
  },

  actions: {
    async getConfig () {
      Taro.showLoading();
      try {
        // 获取配置
        const {
          result
        } = await Taro.cloud.callFunction({
          name: 'config'
        });

        console.log(result);
        this.config = result;
      } catch (error) {
        Taro.showLoading({
          title: '加载配置失败',
        });
        console.log(error);
      }
      Taro.hideLoading();
    }
  }
});
