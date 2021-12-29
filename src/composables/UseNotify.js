import { useQuasar } from "quasar";

export default function useNotify() {
  const $q = useQuasar();

  const notifySuccess = (message) => {
    $q.notify({
      message,
      color: "positive",
      position: "bottom",
      icon: "check",
      timeout: 3000,
    });
  };

  const notifyNegative = (message) => {
    $q.notify({
      message,
      color: "negative",
      position: "bottom",
      icon: "close",
      timeout: 5000,
    });
  };

  return {
    notifySuccess,
    notifyNegative,
  };
}
