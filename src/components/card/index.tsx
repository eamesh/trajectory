import { Cell, Icon } from '@nutui/nutui-taro';
import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { defineComponent } from 'vue';

const cardProps = {
  title: String,
  extra: String,
  icon: String,
  url: String,
};

export default defineComponent({
  name: 'Card',

  props: cardProps,

  setup (props) {
    function handleOnClick (_: MouseEvent) {
      Taro.redirectTo({
        url: props.url as string
      });
    }

    return {
      handleOnClick
    };
  },

  render () {
    const {
      title,
      extra,
      icon,
      handleOnClick
    } = this;

    return (
      <Cell onClick={handleOnClick}>
        <View class='d-flex flex-row justify-content-between card-container'>
          <View class='d-flex flex-column'>
            <View class='card-title'>{title}</View>
            <View class='card-extra'>{extra}</View>
          </View>
          <View>
            <Icon name={icon} />
          </View>
        </View>
      </Cell>
    );
  }
});
