import Taro from '@tarojs/taro';
import { defineStore } from 'pinia';

export interface ConfigSchema {
  notice: string;
  community: string;
  share: string;
  version: string;
  [key:string]: any;
}

export interface ConfigStoreState {
  loading: boolean;
  config: ConfigSchema;
}

export const useConfigStore = defineStore('config', {
  state: (): ConfigStoreState => {
    return {
      loading: true,
      config: {
        notice: '',
        community: '',
        share: '',
        map: false,
        version: '',
      }
    };
  },

  getters: {
    isNoExamine () {
      console.log(this.config, process.env.APP_VERSION);
      return this.config.version >= process.env.APP_VERSION!;
    }
  },

  actions: {
    async getConfig () {
      // Taro.showLoading();
      this.loading = true;
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
      this.loading = false;
      // Taro.hideLoading();
    }
  }
});
