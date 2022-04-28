import { defineComponent, ref } from 'vue';
import { OpenData, View } from '@tarojs/components';
import { Avatar, Button } from '@nutui/nutui-taro';
import Qustion from '@/assets/images/request.png';
import Wechat from '@/assets/images/wechat.png';

import './style.scss';
import Taro from '@tarojs/taro';
import { getUserProfile } from '@/utils';

export default defineComponent({
  name: 'Me',

  setup () {
    const userInfo = ref({
      avatarUrl: ''
    });

    function handleGetUser () {
      getUserProfile().then((res: any) => {
        userInfo.value = res;
      });
    }

    return {
      userInfo,
      handleGetUser
    };
  },

  async onShow () {
    this.handleGetUser();
  },

  onShareAppMessage () {
    return {
      title: '附近确诊轨迹',
      path: '/pages/main/index/index'
    };
  },

  onShareTimeline () {
    return {
      title: '附近确诊轨迹',
      path: '/pages/main/index/index'
    };
  },

  render () {
    const {
      userInfo
    } = this;
    return (
      <View class='page py-2 px-3 page-me'>
        <nut-cell class='avatar'>
          <View class='d-flex flex-row py-2' onClick={() => {
            this.handleGetUser();
          }}>
            <Avatar url={userInfo.avatarUrl || ''} />
            <View class='d-flex flex-column ms-3 justify-content-between'>
              <View class='avatar-name'>{userInfo.nickName || '微信用户'}</View>
              <View class='avatar-text'>向战斗在抗击疫情一线的医务工作者和社会各界人士致敬!</View>
            </View>
          </View>
        </nut-cell>

        <nut-cell class='py-3 mt-3' onClick={() => {
          Taro.navigateTo({
            url: '/pages/question/index'
          });
        }}>
          <View class='d-flex flex-row justify-content-between align-items-center' style={{width: '100%'}}>
            <View class='d-flex flex-row align-items-center'>
              <nut-icon size='16' class='me-2' name={Qustion} />
              <View class='nut-cell-text'>
                常见问题
              </View>
            </View>

            <nut-icon name='right' size='12' />
          </View>
        </nut-cell>
        <nut-cell class='py-3 mt-3 contact'>
          <View class='d-flex flex-row justify-content-between align-items-center' style={{width: '100%'}}>
            <View class='d-flex flex-row align-items-center'>
              <nut-icon size='16' class='me-2' name={Wechat} />
              <View class='nut-cell-text'>
                联系客服
              </View>
            </View>

            <nut-icon name='right' size='12' />
          </View>
          <Button class='contact-btn' {...{
            openType: 'contact'
          }}>asd</Button>
        </nut-cell>
      </View>
    );
  }
});
