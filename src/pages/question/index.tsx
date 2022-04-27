import { View } from '@tarojs/components';
import { defineComponent } from 'vue';

import './style.scss';

export default defineComponent({
  name: 'Question',

  render () {
    return (
      <View class='page p-3'>
        <View class='mb-4'>
          <View class='title mb-2'>1、免责声明</View>
          <View class='text-wrap'>
            本应用非官方应用，数据来源于市卫健委每日通报的最新
            信息，详情请参考济南市卫健委发布公众号。本应用不保证数据的
            真实性和稳定性，仅用于交流学习。如有疑问，请在应用
            内联系客服、
          </View>
        </View>
        <View>
          <View class='title mb-2'>2、数据展示有误？</View>
          <View class='text-wrap'>
            基于您的定位和数据的精准性，本应用展示的信息和实际
            情况可能略有偏差。如果您在使用中发现任何问题，请联
            系客服，我们会第一时间修改。
          </View>
        </View>
      </View>
    );
  }
});
