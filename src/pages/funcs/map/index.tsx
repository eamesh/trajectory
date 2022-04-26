/* eslint-disable vue/no-async-in-computed-properties */
import { Col, Row, InputNumber, Cell } from '@nutui/nutui-taro';
import { Map, View, ScrollView } from '@tarojs/components';
import Taro, {  requirePlugin} from '@tarojs/taro';
import { defineComponent, ref, onMounted, computed, nextTick } from 'vue';

import './style.scss';

const chooseLocation = requirePlugin('chooseLocation');

const MAP_KEY = 'B5KBZ-YXBE6-ZFVS6-E7BJA-MNVI7-6EFU2';
const REFER = '附近确诊轨迹';

export default defineComponent({
  name: 'Map',

  setup () {
    const mapRef = ref<any>({});
    const mapDataRef = ref({
      latitude: 36.670931,
      longitude: 116.990884,
      markers: [{
        id: 1,
        latitude: 36.670931,
        longitude: 116.990884,
        // width: Taro.pxTransform(20),
        // height: Taro.pxTransform(30),
      }]
    });

    const modelData = ref({
      range: 2
    });

    const containerInfo = ref();

    const mapStyle = computed(() => {
      const {
        windowHeight
      } = Taro.getSystemInfoSync();

      return {
        height: `${windowHeight * 0.3}px`,
      };
    });

    const containerHeight = computed(() => {
      const {
        windowHeight
      } = Taro.getSystemInfoSync();

      return {
        height: `${windowHeight * 0.7}px`
      };
    });

    function handleGetDomRect (id): Promise<any> {
      return new Promise((resolve) => {
        Taro.createSelectorQuery().select(id)
          .boundingClientRect()
          .exec(res => resolve(res));
      });
    }

    const scrollHeight = computed(async () => {
      const {
        windowHeight
      } = Taro.getSystemInfoSync();
      const { height: infoHeight } = await handleGetDomRect('#container-info');
      const { height: headerHeight } = await handleGetDomRect('#container-header');

      return (windowHeight * 0.5) - (infoHeight + headerHeight);
    });

    // 需要滚动的最大距离
    const totalScrollRange = computed(() => {
      const {
        windowHeight
      } = Taro.getSystemInfoSync();

      return windowHeight * 0.7 - (windowHeight / 2);
    });

    onMounted(async () => {
      mapRef.value = Taro.createMapContext('map');
    });

    nextTick(async () => {
      const { height: infoHeight } = await handleGetDomRect('#container-info');
        const { height: headerHeight } = await handleGetDomRect('#container-header');

        console.log(infoHeight, headerHeight);
    });

    function handleSetLocation () {
      Taro.navigateTo({
        url: `plugin://chooseLocation/index?key=${MAP_KEY}&referer=${REFER}&location=${JSON.stringify({
          latitude: 36.670931,
          longitude: 116.990884,
        })}`
      });
    }

    function handleLocation (): Promise<any> {
      return new Promise((resolve, reject) => {
        Taro.getLocation({
          type: 'wgs84',
          success: (res) => {
            console.log(res);
            resolve(res);
          },

          fail: (error) => {
            reject(error);
          }
        });
      });
    }

    async function handleGetLocation () {
      Taro.showLoading();
      try {
        const res = await handleLocation();

        mapDataRef.value = {
          latitude: res.latitude,
          longitude: res.longitude,
          markers: [{
            id: 1,
            latitude: res.latitude,
            longitude: res.longitude,
            // width: Taro.pxTransform(20),
            // height: Taro.pxTransform(30),
          }]
        };
      } catch (error) {
        console.log(error);
      }
      Taro.hideLoading();
    }

    handleGetLocation();

    return {
      mapData: mapDataRef,
      modelData,
      mapStyle,
      containerHeight,
      totalScrollRange,
      handleSetLocation,
      handleGetLocation,
      containerInfo,
      scrollHeight,
      handleGetDomRect
    };
  },

  onShow () {
    console.log('show');
    const location = chooseLocation.getLocation();

    if (!location) return;
    console.log(location);
    this.mapData = {
      latitude: location.latitude,
      longitude: location.longitude,
      markers: [{
        id: 1,
        latitude: location.latitude,
        longitude: location.longitude,
        name: location.name,
        // width: Taro.pxTransform(20),
        // height: Taro.pxTransform(30),
      }]
    };

    console.log(this.mapData);
  },

  render () {
    const {
      mapData,
      modelData,
      mapStyle,
      containerHeight,
      handleSetLocation,
      handleGetLocation,
      scrollHeight
    } = this;

    return (
      <View class='page page-map'>
        <View class='location'>
          <nut-icon onClick={handleGetLocation} color='#fff' class='location' name='location2' />
        </View>
        <Map
          id='map'
          class='map'
          showLocation
          latitude={mapData.latitude}
          longitude={mapData.longitude}
          markers={mapData.markers}
          covers={mapData.covers}
          style={mapStyle}
          scale='16'
        ></Map>
        <View class='d-flex flex-column page-map__container' style={containerHeight}>
          <Row gutter={12} class='pb-2 pt-3 page-map__container-header'>
            <Col span={12}>
              <View class='d-flex justify-content-center align-items-center'>
                <nut-button size="mini" type="info" onClick={handleSetLocation}>设置位置</nut-button>
              </View>
            </Col>
            <Col span={12}>
              <View class='d-flex justify-content-center align-items-center'>
                <InputNumber v-model={modelData.range} />
                <View class='ms-1 text-wrap'>公里</View>
              </View>
            </Col>
          </Row>
          <View class='px-3 pt-1 pb-2 page-map__container-info'>
            截止到4月26日，2公里范围内，共报道病例居住地0处，最近的病例居住地距此越0米
          </View>
          <ScrollView scrollY class='page-map__container-scroll' style={{
            height: `${scrollHeight}px`
          }}>
            <View class='safe-area-inset-bottom px-2'>
              <Cell title='测试' subTitle='描述' desc='约2km'></Cell>
              <Cell title='测试' subTitle='描述' desc='约2km'></Cell>
              <Cell title='测试' subTitle='描述' desc='约2km'></Cell>
              <Cell title='测试' subTitle='描述' desc='约2km'></Cell>
              <Cell title='测试' subTitle='描述' desc='约2km'></Cell>
              <Cell title='测试' subTitle='描述' desc='约2km'></Cell>
              <Cell title='测试1' subTitle='描述' desc='约2km'></Cell>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
});
