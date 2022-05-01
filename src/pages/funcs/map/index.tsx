/* eslint-disable vue/no-async-in-computed-properties */
import { Button, Empty, InputNumber } from '@nutui/nutui-taro';
import { Map, View, ScrollView, Text } from '@tarojs/components';
import Taro, { requirePlugin } from '@tarojs/taro';
import { computed, defineComponent, ref, watch } from 'vue';
import { useMap } from './map';
import { useData } from './data';
// import Self from '@/assets/images/self.png';
import dayjs from 'dayjs';
import Marker from '@/assets/images/marker.png';

import './style.scss';
import { shareParams } from '@/utils';
import { useExamine } from '@/hooks/examine';

const chooseLocation = requirePlugin('chooseLocation');

export default defineComponent({
  name: 'Map',

  setup () {
    const {
      mapRef,
      markersRef,
      toastData,
      locationDataRef,
      mapStyle,
      containerHeight,
      totalScrollRange,
      handleSetLocation,
      handleGetLocation,
      containerInfo,
    } = useMap();

    const {
      loading,
      nearDiagnosisRef,
      handleGetPositionTrajectory
    } = useData();

    const currentMarkerId = ref();
    const {
      isNoExamine,
      useConfig
    } = useExamine();

    handleGetLocation();

    function handleSetMarkers () {
      const marker = {
        iconPath: Marker,
        width: 24,
        height: 24,
        joinCluster: false,
        callout: {
          padding: '10rpx 28rpx',
          borderRadius: 4,
          display: 'BYCLICK'
        }
        // label:{
        //   borderWidth: 1,
        //   borderRadius: 10,
        //   bgColor: '#ffffff',
        //   content: '',
        //   borderColor: '#ffffff',
        //   padding: '10rpx 20rpx',
        // }
      };
      const points: any[] = [];
      nearDiagnosisRef.value.map((item, index) => {
        const newMarker = Object.assign({
          ...marker
        }, {
          id: index,
          index,
          latitude: item.location.coordinates[1],
          longitude: item.location.coordinates[0],
          zIndex: 1,
          title: item.address,
          callout: {
            ...marker.callout,
            content: item.address,
            display: currentMarkerId.value === index ? 'ALWAYS' : 'BYCLICK'
          }
          // label: {
          //   ...marker.label,
          //   content: item.address
          // }
        });
        // newMarker.label.content = item.address;
        points.push(newMarker);
      });

      // points.push({
      //   id: points.length,
      //   ...locationDataRef.value,
      //   iconPath: Self,
      //   width: 24,
      //   height: 24,
      //   // joinCluster: true
      // });

      markersRef.value = points;
      // mapRef.value.addMarkers({
      //   clear: true,
      //   markers: points
      // });
    }

    watch(
      () => locationDataRef.value,
      () => {
        handleGetPositionTrajectory(locationDataRef.value);
      },
      {
        deep: true
      }
    );

    watch(
      () => nearDiagnosisRef.value,
      () => {
        handleSetMarkers();
      }
    );

    const mapCircle = computed(() => {
      return [
        {
          latitude: locationDataRef.value.latitude,
          longitude: locationDataRef.value.longitude,
          color: '#AACCEE',
          fillColor: '#AACCEE90',
          radius: locationDataRef.value.range * 1000,
        }
      ];
    });

    function handleClickMarker (_, item, index) {
      currentMarkerId.value = index;
      // locationDataRef.value = {
      //   ...locationDataRef.value,
      //   latitude: item.location.coordinates[1],
      //   longitude: item.location.coordinates[0],
      // };

      mapRef.value.moveToLocation({
        latitude: item.location.coordinates[1],
        longitude: item.location.coordinates[0],
      });

      handleSetMarkers();
    }

    function handleSubscribeMessage () {
      // 订阅消息
      Taro.requestSubscribeMessage({
        tmplIds: [
          'L3a4q3GhcSbxE9MG-1dAv4VRurm6ygRog6-sGjLbfUs'
        ],
        success: (res) => {
          console.log(res);
        }
      });
    }

    return {
      loading,
      markers: markersRef,
      toastData,
      lodationData: locationDataRef,
      mapStyle,
      containerHeight,
      totalScrollRange,
      handleSetLocation,
      handleGetLocation,
      containerInfo,
      nearDiagnosis: nearDiagnosisRef,
      handleClickMarker,
      mapCircle,
      handleSubscribeMessage,
      useConfig,
      isNoExamine,
    };
  },

  onShow () {
    const location = chooseLocation.getLocation();

    if (!location) return;
    this.lodationData = {
      ...this.lodationData,
      latitude: location.latitude,
      longitude: location.longitude,
      // markers: [{
      //   id: 1,
      //   latitude: location.latitude,
      //   longitude: location.longitude,
      //   name: location.name,
      //   // width: Taro.pxTransform(20),
      //   // height: Taro.pxTransform(30),
      // }]
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
      markers,
      toastData,
      lodationData,
      mapStyle,
      containerHeight,
      handleSetLocation,
      handleGetLocation,
      nearDiagnosis,
      handleClickMarker,
      mapCircle,
      handleSubscribeMessage,
      isNoExamine
    } = this;

    return (
      isNoExamine ? (
        <View class='page page-map'>
          <nut-toast msg={toastData.msg} v-model:visible={toastData.show} type={toastData.type}  cover={toastData.cover} />
          <View class='location'>
            <nut-icon onClick={handleGetLocation} color='#fff' class='location' name='location2' />
          </View>
          <Map
            id='map'
            class='map'
            showLocation
            latitude={lodationData.latitude}
            longitude={lodationData.longitude}
            markers={markers}
            style={mapStyle}
            scale='12'
            // onMarkertap={handleClickMarker}
            circles={mapCircle}
          ></Map>
          <View class='d-flex flex-column page-map__container' style={containerHeight}>
            <nut-row gutter={12} class='py-3 page-map__container-header'>
              <nut-col span={12}>
                <View class='d-flex justify-content-center align-items-center'>
                  <nut-button size='small' type='info' onClick={handleSetLocation}>设置位置</nut-button>
                </View>
              </nut-col>
              <nut-col span={12}>
                <View class='d-flex justify-content-center align-items-center'>
                  <InputNumber v-model={lodationData.range} buttonSize={30} inputWidth={50}  />
                  <View class='ms-1 text-wrap'>公里</View>
                </View>
              </nut-col>
            </nut-row>
            {
              nearDiagnosis.length ? (
                <View class='px-3 pt-1 pb-3 page-map__container-info'>
                  截止到{dayjs().format('MM月DD日')}，<Text class='count-text me-2'>{lodationData.range}</Text>公里范围内，共报道病例轨迹<Text class='count-text mx-2'>{nearDiagnosis.length}</Text>处，最近的病例轨迹距此约<Text class='count-text'>{(nearDiagnosis[0].distance / 6378137).toFixed()}</Text>米
                </View>
              ) : null
            }
            <ScrollView scrollY class='page-map__container-scroll'>
              <View class='safe-area-inset-bottom px-2'>
                {
                  loading ? (
                    <View class='d-flex flex-column align-items-center' style={{
                      marginTop: Taro.pxTransform(50)
                    }}>
                      <nut-icon name="loading1" class="nut-icon-am-rotate nut-icon-am-infinite"></nut-icon>
                      <View class='text-wrap mt-2'>加载中</View>
                    </View>
                  ) : <>
                    {
                      nearDiagnosis.length ? nearDiagnosis.map((item, index) => {
                        return (
                          <nut-cell title={item.address} subTitle={dayjs(item.date).format('YYYY-MM-DD HH:mm:ss')} desc={`${((item.distance / 6378137) / 1000).toFixed(2)}km`} onClick={(e) => handleClickMarker(e, item, index)}></nut-cell>
                        );
                      }) : <Empty />
                    }
                  </>
                }
              </View>
              <View class='bottom-bar safe-area-inset-bottom'>
                <Button plain class='me-2' type="primary" icon='notice' onClick={handleSubscribeMessage}>订阅通报消息</Button>
                <Button plain class='ms-2' type="info" icon='share' {...{
                  openType: 'share'
                }}>分享保护身边人</Button>
              </View>
            </ScrollView>
          </View>
        </View>
      ) : <View class='page d-flex justify-content-center align-items-center'>业务整改, 停止服务</View>
    );
  }
});
