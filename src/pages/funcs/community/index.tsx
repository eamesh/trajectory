import { useConfigStore } from '@/stores/config';
import { shareParams } from '@/utils';
import { SearchBar, NoticeBar, Empty, Table, Cell, Button } from '@nutui/nutui-taro';
import { Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import dayjs from 'dayjs';
import { defineComponent, h, ref } from 'vue';

import './style.scss';

export default defineComponent({
  name: 'Community',

  setup () {
    const searchValue = ref('');
    const useConfig = useConfigStore();

    const columns = [
      {
        title: '行政区',
        key: 'area'
      },
      {
        title: '地址',
        key: 'address'
      },
      {
        title: '通报时间',
        key: 'date',
        render (row: any) {
          return h(View, {}, dayjs(row.date as string).format('YYYY-MM-DD'));
        }
      },
    ];

    const listData = ref([]);
    const loading = ref(false);

    async function handleSearch () {
      if (!searchValue.value) return;
      loading.value = true;
      try {
        const {
          result: data
        } = await Taro.cloud.callFunction({
          name: 'community',
          data: {
            keyword: searchValue.value
          },
        }) as any;

        listData.value = data.list;
      } catch (error) {
        console.log(error);
      }
      loading.value = false;
    }

    return {
      loading,
      searchValue,
      columns,
      listData,
      handleSearch,
      configState: useConfig
    };
  },

  onShareAppMessage () {
    return shareParams();
  },

  onShareTimeline () {
    return shareParams();
  },

  render () {
    const {
      loading,
      columns,
      listData,
      handleSearch
    } = this;

    return (
      <View class='page' style={{
        overflowY: 'auto'
      }}>
        <SearchBar onSearch={handleSearch} placeholder='请输入小区名' {...{
          autofocus: true
        }} v-model={this.searchValue}>
          {{
            rightout: () => {
              return <View onClick={handleSearch}>搜索</View>;
            }
          }}
        </SearchBar>
        <NoticeBar
          class='notice-bar'
          wrapable
          background="`rgba(251, 248, 220, 1)`"
          color="`#D9500B`"
        >
          <View>
            {this.configState.config.community}
          </View>
        </NoticeBar>

        {
          loading ? (
            <View class='d-flex flex-column align-items-center' style={{
              marginTop: Taro.pxTransform(50)
            }}>
              <nut-icon name="loading1" class="nut-icon-am-rotate nut-icon-am-infinite"></nut-icon>
              <View class='text-wrap mt-2'>加载中</View>
            </View>
          ) : (
            listData.length ? (
              <View class='px-3'>
                <Cell class='d-flex flex-column'>
                  <View class='mb-2 text-wrap'>共<Text>{listData.length}</Text>条</View>
                  <Table columns={columns} data={listData}></Table>
                </Cell>
              </View>
            ) : (
              <Empty description="无数据"></Empty>
            )
          )
        }
        <View class='bottom-bar px-3 safe-area-inset-bottom' style={{boxSizing: 'border-box'}}>
          <Button block type='info' size='large' plain icon='share' {...{
            openType: 'share'
          }}>分享好友</Button>
        </View>
      </View>
    );
  }
});
