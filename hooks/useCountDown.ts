import { useEffect, useState } from 'react';
import moment from 'moment';

interface Countdown {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

export const useCountdown = (
  startTime: number | null,
  endTime: number | null,
) => {
  const [dataCountDown, setDataCountDown] = useState<Countdown>({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = moment();
      const start = startTime ? moment.unix(startTime) : null;
      const end = endTime ? moment.unix(endTime) : null;

      if (start && now.isBefore(start)) {
        const duration = moment.duration(start.diff(now));
        setDataCountDown({
          days: String(duration.days()).padStart(2, '0'),
          hours: String(duration.hours()).padStart(2, '0'),
          minutes: String(duration.minutes()).padStart(2, '0'),
          seconds: String(duration.seconds()).padStart(2, '0'),
        });
      } else if (end && now.isBefore(end)) {
        const duration = moment.duration(end.diff(now));
        setDataCountDown({
          days: String(duration.days()).padStart(2, '0'),
          hours: String(duration.hours()).padStart(2, '0'),
          minutes: String(duration.minutes()).padStart(2, '0'),
          seconds: String(duration.seconds()).padStart(2, '0'),
        });
      } else {
        setDataCountDown({
          days: '00',
          hours: '00',
          minutes: '00',
          seconds: '00',
        });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(() => {
      calculateTimeLeft();
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, endTime]);

  return dataCountDown;
};
