type TabProps = {
  label: string;
  isActive: boolean;
  onClick: () => void;
};

const TabMenu = ({ label, isActive, onClick }: TabProps) => {
  return (
    // eslint-disable-next-line jsx-a11y/role-supports-aria-props
    <button
      onClick={onClick}
      className={` ${
        isActive ? 'active ' : ''
      } w-full text-left cursor-pointer font-roboto font-medium text-base `}
      // aria-controls={`${id}-tab`}
      aria-selected={isActive}
    >
      {label}
    </button>
  );
};

export default TabMenu;
