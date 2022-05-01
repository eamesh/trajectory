import { useConfigStore } from '@/stores/config';
import { computed } from 'vue';

export const useExamine = () => {
  const useConfig = useConfigStore();

  const isNoExamine = computed(() => {
    return useConfig.isNoExamine;
  });

  return {
    isNoExamine,
    useConfig
  };
};
