import { defineComponent, ref } from 'vue';
import { Ad, View } from '@tarojs/components';
import { Avatar, Button } from '@nutui/nutui-taro';
import Qustion from '@/assets/images/request.png';
import Wechat from '@/assets/images/wechat.png';

import './style.scss';
import Taro from '@tarojs/taro';
import { shareParams } from '@/utils';
import { useUserStore } from '@/stores/user';

export default defineComponent({
  name: 'Me',

  setup () {
    const useUser = useUserStore();

    function handleGetUser () {
      useUser.getUser();
    }

    return {
      useUser,
      handleGetUser
    };
  },

  async onShow () {
    // this.handleGetUser();
  },

  onShareAppMessage () {
    return shareParams();
  },

  onShareTimeline () {
    return shareParams();
  },

  render () {
    const {
      useUser
    } = this;
    return (
      <View class='page py-2 px-3 page-me'>
        <nut-cell class='avatar'>
          <View class='d-flex flex-row py-2' onClick={() => {
            this.handleGetUser();
          }}>
            <Avatar url={useUser.user.avatarUrl || ''} />
            <View class='d-flex flex-column ms-3 justify-content-between'>
              <View class='avatar-name'>{useUser.user.nickName || '微信用户'}</View>
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
          }}></Button>
        </nut-cell>

        <Ad class='mt-3' unitId={process.env.AD_VIDEO_ME} adType="video" adTheme="white" onError={(err) => {console.log(err);}}></Ad>
        {/* <Ad class='mt-3' unitId="adunit-9fd89de66896753d"></Ad> */}
      </View>
    );
  }
});
