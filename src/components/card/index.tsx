import { useUserStore } from '@/stores/user';
import { getUserProfile } from '@/utils';
import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { defineComponent } from 'vue';

import './style.scss';

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
    const useUser = useUserStore();
    function handleOnClick (_: MouseEvent) {
      console.log(useUser);
      useUser.getUser().then(() => {
        Taro.navigateTo({
          url: props.url as string
        });
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
      <nut-cell class='card' onClick={handleOnClick}>
        <View class='d-flex flex-row justify-content-between card-container'>
          <View class='d-flex flex-column'>
            <View class='card-title'>{title}</View>
            <View class='card-extra'>{extra}</View>
          </View>
          <View>
            <nut-icon name={icon} />
          </View>
        </View>
      </nut-cell>
    );
  }
});
