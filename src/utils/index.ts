import { USER_PROFILE } from '@/constants/user';
import Taro from '@tarojs/taro';

export const getUserProfile = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const userProfile = await hasUserProfile();
      resolve(userProfile);
    } catch (error) {
      console.log(error);

      Taro.getUserProfile({
        desc: '用于完善会员资料',
        success: (res) => {
          Taro.setStorageSync(USER_PROFILE, res.userInfo);
          resolve(res);
        },
        fail: (error) => {
          reject(error);
        }
      });
    }
  });
};

export const hasUserProfile = () => {
  return new Promise((resolve, reject) => {
    try {
      const userProfile = Taro.getStorageSync(USER_PROFILE);
      console.log(userProfile);
      if (userProfile) {
        resolve(userProfile);
        return;
      }

      throw Error('未获取用户信息');
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
