import { Cell, Table } from '@nutui/nutui-taro';
import { Text, View } from '@tarojs/components';
import { defineComponent, ref } from 'vue';

import './style.scss';

export default defineComponent({
  name: 'Day',

  setup () {
    const columns = [
      {
        title: '日期',
        key: 'date'
      },
      {
        title: '确诊人数',
        key: 'confirm'
      },
      {
        title: '无症状人数',
        key: 'asymptomatic'
      },
    ];

    const listData = ref([
      {
        date: '4月21日',
        confirm: 2,
        asymptomatic: 10
      },
    ]);

    return {
      columns,
      listData
    };
  },

  render () {
    const {
      columns,
      listData
    } = this;

    return (
      <View class='page px-2'>
        <Cell>
          <View class='d-flex flex-column'>
            <View class='day-title mb-2'>济南市每日病例情况</View>
            <View class='text-wrap mb-2'>自2022年4月21日起，济南市累计通报新冠病例<Text class='count-text'>xxx</Text>例，其中确诊病例<Text class='count-text'>xxx</Text>例，无症状感染者<Text class='count-text'>xxx</Text>例</View>
            <Table columns={columns} data={listData}></Table>
          </View>

        </Cell>
      </View>
    );
  }
});
