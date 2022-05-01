import { View } from '@tarojs/components';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Demo',

  setup () {
    //
  },

  render () {
    return (
      <View class='page px-3'>
        <nut-cell>
          <View class='d-flex flex-column gap-2'>
            <View class='text-wrap'>
              Button
            </View>
            <View class='d-flex flex-wrap gap-2'>
              <nut-button type="primary">主要按钮</nut-button>
              <nut-button type="info">信息按钮</nut-button>
              <nut-button type="default">默认按钮</nut-button>
              <nut-button type="danger">危险按钮</nut-button>
              <nut-button type="warning">警告按钮</nut-button>
              <nut-button type="success">成功按钮</nut-button>
            </View>
          </View>
        </nut-cell>

        <nut-cell>
          <View class='d-flex flex-column gap-2'>
            <View class='text-wrap'>
              Icon
            </View>
            <View class='d-flex flex-wrap gap-2'>
              <nut-icon name="dongdong"></nut-icon>
              <nut-icon name="JD"></nut-icon>
            </View>
          </View>
        </nut-cell>

        <nut-cell title="我是标题" desc="描述文字"></nut-cell>
        <nut-cell title="我是标题" sub-title="副标题描述" desc="描述文字"></nut-cell>
        <nut-cell title="圆角设置 0" round-radius="0"></nut-cell>
      </View>
    );
  }
});
