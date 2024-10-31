import { ReactNode, useEffect } from 'react';

import { UIState, useUIStore } from '@/store/ui';

type ToastParams = Partial<Omit<UIState['toast'], 'visible' | 'type'>>;

export const useToast = () => {
  const { toggleToast, clearToast } = useUIStore();

  return {
    success: (props: ToastParams) =>
      toggleToast({ ...props, visible: true, type: 'success' }),
    error: (props: ToastParams) =>
      toggleToast({ ...props, visible: true, type: 'error' }),
    clear: clearToast,
  };
};

export const useLoading = (isLoading?: boolean, text?: ReactNode) => {
  const { showLoading, closeLoading } = useUIStore();

  useEffect(() => {
    if (isLoading) {
      showLoading(text);
    } else {
      closeLoading();
    }
  }, [closeLoading, isLoading, showLoading, text]);

  return {
    show: showLoading,
    hide: closeLoading,
  };
};
