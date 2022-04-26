import { defineComponent } from 'vue';
import { View } from '@tarojs/components';
import { Cell, Avatar } from '@nutui/nutui-taro';
import Qustion from '@/assets/images/request.png';
import Wechat from '@/assets/images/wechat.png';

import './style.scss';

export default defineComponent({
  name: 'Me',

  render () {
    return (
      <View class='page py-2 px-3 page-me'>
        <Cell class='avatar'>
          <View class='d-flex flex-row py-2'>
            <Avatar url="https://img12.360buyimg.com/imagetools/jfs/t1/196430/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png" />
            <View class='d-flex flex-column ms-3 justify-content-between'>
              <View class='avatar-name'>太年轻</View>
              <View class='avatar-text'>向战斗在抗击疫情一线的医务工作者和社会各界人士致敬!</View>
            </View>
          </View>
        </Cell>

        <Cell class='py-3 mt-3'>
          <View class='d-flex flex-row justify-content-between align-items-center' style={{width: '100%'}}>
            <View class='d-flex flex-row align-items-center'>
              <nut-icon size='16' class='me-2' name={Qustion} />
              <View class='cell-text'>
                常见问题
              </View>
            </View>

            <nut-icon name='right' size='12' />
          </View>
        </Cell>
        <Cell class='py-3 mt-3'>
          <View class='d-flex flex-row justify-content-between align-items-center' style={{width: '100%'}}>
            <View class='d-flex flex-row align-items-center'>
              <nut-icon size='16' class='me-2' name={Wechat} />
              <View class='cell-text'>
                联系客服
              </View>
            </View>

            <nut-icon name='right' size='12' />
          </View>
        </Cell>
      </View>
    );
  }
});
