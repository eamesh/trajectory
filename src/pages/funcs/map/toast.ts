export const useMapToast = (toastData) => {
  function openToast (msg: string) {
    toastData.value.show = true;
    toastData.value.msg = msg;
  }

  return {
    openToast
  };
};
