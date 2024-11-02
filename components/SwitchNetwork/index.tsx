import { useEffect, useState } from 'react';

import { NETWORK_NAME } from '@/config/env';
import { useToast } from '@/hooks/useUIUtils';
import { classNames } from '@/utils/string';
import { useWrongNetwork } from '@/hooks/useAuth';

export default function NetworkSwitcher() {
  const toast = useToast();

  const [, setIsShowChooseChain] = useState<boolean>(false);
  const { handleSwitchChain, isWrongNetwork } = useWrongNetwork();

  const handleSwitch = () => {
    try {
      toast.clear();
      setIsShowChooseChain(true);
      handleSwitchChain();
    } catch (e: any) {
      console.error('Error switching chain:', e.message);
    }
  };

  const showSwitchChainPopup = () =>
    toast.error({
      message: `Wrong network detected. Please connect to ${NETWORK_NAME} to continue`,
      actionName: 'Switch network',
      action: handleSwitch,
    });

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isWrongNetwork) {
        showSwitchChainPopup();
      } else {
        toast.clear();
      }
    }, 200);

    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWrongNetwork]);

  return (
    <>
      <div
        className={classNames(
          'network-switcher',
          isWrongNetwork ? 'block' : 'hidden',
        )}
        onClick={() => {
          if (isWrongNetwork) {
            showSwitchChainPopup();
          }
        }}
      />
    </>
  );
}
