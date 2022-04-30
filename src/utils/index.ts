import { USER_PROFILE } from '@/constants/user';
import Taro from '@tarojs/taro';
import dayjs from 'dayjs';
import Share from '@/assets/images/share.jpg';

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

export const shareParams = () => {
  return {
    title: `${dayjs().format('M月D日，附近确诊地图，实时查询附近疫情情况')}`,
    imageUrl: Share,
    path: '/pages/main/index/index'
  };
};
