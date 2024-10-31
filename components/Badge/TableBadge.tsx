import { FC, useMemo } from 'react';

import { BadgeBase, BadgeBaseProps } from '@/components/Badge/BadgeBase';

interface TableBadgeProps {
  color?: BadgeBaseProps['color'];
  targetData?: {
    key: 'transactionStatus';
    value: string;
  };
  text?: string;
}

interface DataByTarget {
  color: BadgeBaseProps['color'];
  label: string;
}

const TableBadge: FC<TableBadgeProps> = (props) => {
  const { targetData = null, text = '', color = 'success' } = props;

  const dataByTarget = useMemo<DataByTarget | null>(() => {
    if (!targetData?.value) {
      return null;
    }

    const result: DataByTarget = {
      color: 'success',
      label: targetData.value,
    };

    switch (targetData.key) {
      case 'transactionStatus': {
        switch (targetData.value) {
          case '1':
            result.color = 'success';
            result.label = 'Verify';
            break;
          case '2':
            result.color = 'lime';
            result.label = 'Pending';
            break;

          case '3':
            result.color = 'pink';
            result.label = 'Rejected';
            break;

          default:
            break;
        }
        break;
      }

      default:
        break;
    }

    return result;
  }, [targetData]);

  return (
    <BadgeBase
      color={dataByTarget?.color ?? color}
      text={dataByTarget?.label ?? text}
    />
  );
};

export default TableBadge;
