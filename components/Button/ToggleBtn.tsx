import { useState } from 'react';

interface ToggleProps {
  label?: string;
  isChecked?: boolean;
  isDisabled?: boolean;
  onChange?: (checked: boolean) => void;
}

export default function Toggle({
  label,
  isChecked = false,
  isDisabled = false,
  onChange,
}: ToggleProps) {
  const [checked, setChecked] = useState(isChecked);

  const handleToggle = () => {
    setChecked(!checked);
    if (onChange) {
      onChange(!checked);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {label && <span className="text-white">{label}</span>}
      <button
        onClick={!isDisabled ? handleToggle : undefined}
        className={`relative inline-flex h-[32px] w-[64px] items-center rounded-full transition-colors border border-solid border-[#4A4A4A] ${
          checked ? 'bg-transparent' : 'bg-transparent'
        }`}
      >
        <span
          className={`inline-block h-7 w-7 transform rounded-full bg-[#4651F6] transition-transform ${
            checked ? 'translate-x-9' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}
