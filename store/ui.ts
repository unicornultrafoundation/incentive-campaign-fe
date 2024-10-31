import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import React from 'react';

export interface UIState {
  toast: {
    visible: boolean;
    type: 'error' | 'success' | '';
    title: string;
    message: React.ReactNode;
    action?: () => void;
    actionName?: string;
  };
  loading: {
    text?: React.ReactNode;
    isLoading: boolean;
  };
}

export interface UIAction {
  toggleToast: (state: Partial<UIState['toast']>) => void;
  clearToast: () => void;
  showLoading: (text?: React.ReactNode) => void;
  closeLoading: () => void;
}

export type ToastParams = Partial<Omit<UIState['toast'], 'visible' | 'type'>>;

const DEFAULT_STATE: UIState = {
  toast: {
    visible: false,
    type: '',
    title: '',
    message: '',
    action: undefined,
    actionName: '',
  },
  loading: {
    text: '',
    isLoading: false,
  },
};

export const useUIStore = create(
  devtools<UIState & UIAction>(
    (set) => ({
      ...DEFAULT_STATE,
      toggleToast: (toast) =>
        set((state) => ({ toast: { ...state.toast, ...toast } })),
      clearToast: () => set(() => ({ toast: DEFAULT_STATE.toast })),
      showLoading: (text) =>
        set(() => ({
          loading: {
            isLoading: true,
            text: text,
          },
        })),
      closeLoading: () => set(() => ({ loading: DEFAULT_STATE.loading })),
    }),
    { name: 'global-toast' },
  ),
);

// Usage: For Non-JSx components
export const toast = {
  success: (props: ToastParams) =>
    useUIStore.setState((state) => ({
      toast: {
        ...state.toast,
        ...props,
        visible: true,
        type: 'success',
      },
    })),
  error: (props: ToastParams) =>
    useUIStore.setState((state) => ({
      toast: {
        ...state.toast,
        ...props,
        visible: true,
        type: 'error',
      },
    })),
};
