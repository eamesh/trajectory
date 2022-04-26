import { SearchBar, NoticeBar, Empty, Table, Cell } from '@nutui/nutui-taro';
import { View } from '@tarojs/components';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Community',

  setup () {
    const searchValue = ref('');

    const columns = [
      {
        title: '行政区',
        key: 'name'
      },
      {
        title: '地址',
        key: 'address'
      },
      {
        title: '通报时间',
        key: 'date'
      },
    ];

    const listData = ref([
      {
        name: '测试',
        address: '济南市市中区xxxx',
        date: '4月21日'
      },
    ]);

    return {
      searchValue,
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
      <View class='page'>
        <SearchBar {...{
          autofocus: true
        }} v-model={this.searchValue}>
          {{
            rightout: () => {
              return '搜索';
            }
          }}
        </SearchBar>
        <NoticeBar
          wrapable
          background="`rgba(251, 248, 220, 1)`"
          color="`#D9500B`"
        >
          <View>
            数据采集于济南市卫健委
          </View>
        </NoticeBar>

        <Empty description="无数据"></Empty>

        <View class='px-3'>
          <Cell class='d-flex flex-column'>
            <View class='mb-2 text-wrap'>共2条</View>
            <Table columns={columns} data={listData}></Table>
          </Cell>
        </View>
      </View>
    );
  }
});
