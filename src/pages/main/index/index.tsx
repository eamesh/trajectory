import { defineComponent } from 'vue';
import { View } from '@tarojs/components';
import Map from '@/assets/images/map.png';
import Search from '@/assets/images/search.png';
// import Browser from '@/assets/images/browser.png';
import Card from '@/components/card';

import './style.scss';
import Taro from '@tarojs/taro';
import { NoticeBar } from '@nutui/nutui-taro';
import { useConfigStore } from '@/stores/config';

export default defineComponent({
  name: 'Index',

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

  setup () {
    const useConfig = useConfigStore();
    useConfig.getConfig();

    return {
      configState: useConfig,
    };
  },

  render () {

    return (
      <View class='page'>
        {
          this.configState.config.notice ? (
            <NoticeBar closeMode background='rgba(47, 104, 217, .7)' color='#fff' rightIcon='circle-close'>
              {this.configState.config.notice}
            </NoticeBar>
          ) : null
        }
        <View class='page-home'>
          <View class='pb-2'>功能</View>
          <nut-row gutter='10'>
            <nut-col span='12'>
              <Card title='历史轨迹' extra='快速查询附近轨迹' icon={Map} url='/pages/funcs/map/index' />
            </nut-col>
            <nut-col span='12'>
              <Card title='小区查询' extra='查询你的小区情况' icon={Search} url='/pages/funcs/community/index' />
            </nut-col>
          </nut-row>
          {/* <nut-row gutter='10'>
            <nut-col span='12'>
              <Card title='每日通报' extra='每日最新情况' icon={Browser} url='/pages/funcs/day/index' />
            </nut-col>
            <nut-col span='12'></nut-col>
          </nut-row> */}
        </View>
      </View>
    );
  }
});
