import Taro from '@tarojs/taro';
import { ref } from 'vue';

export interface LocationSchema {
  latitude: number | string;
  longitude: number | string;
  range: number;
}

export const useData = () => {
  const nearDiagnosisRef = ref<any[]>([]);
  const loading = ref(true);

  function handleGetPositionTrajectory (locationData: LocationSchema) {
    return new Promise(async (resolve, reject) => {
      loading.value = true;
      try {
        const res = await Taro.cloud.callFunction({
          name: 'trajectory',
          data: locationData,
        }) as any;

        console.log('callFunction test result: ', res.result);

        nearDiagnosisRef.value = res.result.list;
        resolve(res.result.data);
      } catch (error) {
        reject(error);
      }
      loading.value = false;
    });
  }

  return {
    loading,
    nearDiagnosisRef,
    handleGetPositionTrajectory
  };
};
