import { USER_PROFILE } from '@/constants/user';
import { getUserProfile } from '@/utils';
import Taro from '@tarojs/taro';
import { defineStore } from 'pinia';

export interface UserSchema {
  nickName: string;
  avatarUrl: string;
  [key:string]: any;
}

export interface UserStoreState {
  openid: string | null;
  user: UserSchema;
}

export const useUserStore = defineStore('user', {
  state: (): UserStoreState => {
    return {
      openid: null,
      user: Taro.getStorageSync(USER_PROFILE)
    };
  },

  actions: {
    getUser () {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await getUserProfile();
          console.log(response);
          this.user = response;
          resolve(response);
        } catch (error) {
          reject(error);
        }
      });
    },

    setOpenid (openid: string) {
      this.openid = openid;
    }
  }
});
