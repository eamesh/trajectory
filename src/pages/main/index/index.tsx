import { defineComponent } from 'vue';
import { View } from '@tarojs/components';
import { Row, Col } from '@nutui/nutui-taro';
import Map from '@/assets/images/map.png';
import Search from '@/assets/images/search.png';
import Browser from '@/assets/images/browser.png';

import './style.scss';
import Card from '@/components/card';

export default defineComponent({
  name: 'Index',

  render () {
    return (
      <View class='page page-home'>
        <View class='pb-2'>功能</View>
        <Row gutter='10'>
          <Col span='12'>
            <Card title='附近确诊' extra='快速查询疫情分布' icon={Map} url='/pages/funcs/map/index' />
          </Col>
          <Col span='12'>
            <Card title='小区查询' extra='查询你的小区情况' icon={Search} />
          </Col>
        </Row>
        <Row gutter='10'>
          <Col span='12'>
            <Card title='每日通报' extra='每日最新情况' icon={Browser} />
          </Col>
          <Col span='12'></Col>
        </Row>
      </View>
    );
  }
});
