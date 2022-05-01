import { defineComponent } from 'vue';
import { Ad, View } from '@tarojs/components';
import Map from '@/assets/images/map.png';
import Search from '@/assets/images/search.png';
import Card from '@/components/card';
import Taro from '@tarojs/taro';
import { NoticeBar } from '@nutui/nutui-taro';
import { shareParams } from '@/utils';
import { useExamine } from '@/hooks/examine';

import './style.scss';

export default defineComponent({
  name: 'Index',

  onShareAppMessage () {
    return shareParams();
  },

  onShareTimeline () {
    return shareParams();
  },

  setup () {
    const {
      isNoExamine,
      useConfig
    } = useExamine();

    return {
      isNoExamine,
      configState: useConfig,
    };
  },

  onLoad () {
    try {
      // 在页面中定义插屏广告
      let interstitialAd: any = null;

      // 在页面onLoad回调事件中创建插屏广告实例
      if (Taro.createInterstitialAd) {
        interstitialAd = Taro.createInterstitialAd({
          adUnitId: 'adunit-5b0066ab9e9eed55'
        });
        interstitialAd.onLoad(() => {});
        interstitialAd.onError((err) => {});
        interstitialAd.onClose(() => {});
      }

      // 在适合的场景显示插屏广告
      if (interstitialAd) {
        interstitialAd.show().catch((err) => {
          console.error(err);
        });
      }
    } catch (error) {
      console.log(error);
    }
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
          {
            this.isNoExamine ? (
              <nut-row gutter='10'>
                <nut-col span='12'>
                  <Card title='历史轨迹' extra='快速查询附近轨迹' icon={Map} url='/pages/funcs/map/index' />
                </nut-col>
                <nut-col span='12'>
                  <Card title='小区查询' extra='查询你的小区情况' icon={Search} url='/pages/funcs/community/index' />
                </nut-col>
              </nut-row>
            ): (
              <nut-row gutter='10'>
                <nut-col span='12'>
                </nut-col>
                <nut-col span='12'>
                  <Card title='组件展示' extra='常用组件演示' icon={Search} url='/pages/funcs/demo/index' />
                </nut-col>
              </nut-row>
            )
          }
          {/* <nut-row gutter='10'>
            <nut-col span='12'>
              <Card title='每日通报' extra='每日最新情况' icon={Browser} url='/pages/funcs/day/index' />
            </nut-col>
            <nut-col span='12'></nut-col>
          </nut-row> */}
          <Ad class='mt-1' unitId="adunit-03d43d2663dc745c"></Ad>
        </View>
      </View>
    );
  }
});
