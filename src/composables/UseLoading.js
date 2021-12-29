import { useQuasar } from "quasar";

export default function useLoading() {
  const $q = useQuasar();

  const showLoading = (message) => {
    $q.loading.show({ message });
  };

  const hideLoading = () => {
    $q.loading.hide();
  };

  return {
    showLoading,
    hideLoading,
  };
}
