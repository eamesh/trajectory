import Taro from '@tarojs/taro';
import { computed, onMounted, ref } from 'vue';

export const MAP_KEY = 'B5KBZ-YXBE6-ZFVS6-E7BJA-MNVI7-6EFU2';
const REFER = '附近确诊轨迹';

export const useMap = () => {
  const mapRef = ref<any>({});
  const locationDataRef = ref<any>({
    latitude: 36.670931,
    longitude: 116.990884,
    range: 2
  });
  const markersRef = ref<any[]>([
    // {
    //   id: 1,
    //   latitude: 36.670931,
    //   longitude: 116.990884,
    //   width: Taro.pxTransform(20),
    //   height: Taro.pxTransform(30),
    // }
  ]);

  const toastData = ref({
    msg: 'toast',
    type: 'text',
    show: false,
    cover: false,
    title:'',
    bottom:'',
    center:true,
  });

  const containerInfo = ref();

  const mapStyle = computed(() => {
    const {
      windowHeight
    } = Taro.getSystemInfoSync();

    return {
      height: `${windowHeight * 0.4}px`,
    };
  });

  const containerHeight = computed(() => {
    const {
      windowHeight
    } = Taro.getSystemInfoSync();

    return {
      height: `${windowHeight * 0.6}px`
    };
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
    mapRef.value.initMarkerCluster({
      enableDefaultStyle: false,
      zoomOnClick: true,
      gridSize: 200,
      complete(res) {
        console.log('initMarkerCluster', res);
      }
    });
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
        type: 'gcj02',
        success: (res) => {
          resolve(res);
        },

        fail: (error) => {
          reject(error);
        }
      });
    });
  }

  function openToast (msg: string) {
    toastData.value.show = true;
    toastData.value.msg = msg;
  }

  async function handleGetLocation () {
    Taro.showLoading();
    try {
      const res = await handleLocation();

      locationDataRef.value = {
        ...locationDataRef.value,
        latitude: res.latitude,
        longitude: res.longitude,
        // markers: [
          // {
          //   id: 1,
          //   latitude: res.latitude,
          //   longitude: res.longitude,
          //   width: Taro.pxTransform(20),
          //   height: Taro.pxTransform(30),
          // }
        // ]
      };

    } catch (error) {
      error.errMsg === 'getLocation:fail auth deny' ? openToast('无法定位，请授权位置服务') : openToast('频繁调用') ;
    }
    Taro.hideLoading();
  }

  return {
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
  };
};
