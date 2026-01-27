import { useCallback, useEffect, useState } from 'react';

export interface ICountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export const useCountdown = (targetDate: Date): ICountdownTime => {
  const calculateTimeLeft = useCallback((): ICountdownTime => {
    const now = new Date().getTime();
    const target = targetDate.getTime();
    const difference = target - now;

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isExpired: true,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
      isExpired: false,
    };
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState<ICountdownTime>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return timeLeft;
};

export const formatCountdown = (timeLeft: ICountdownTime): string => {
  if (timeLeft.isExpired) {
    return 'Event has started!';
  }

  const parts: string[] = [];

  if (timeLeft.days > 0) {
    parts.push(`${timeLeft.days} day${timeLeft.days !== 1 ? 's' : ''}`);
  }
  if (timeLeft.hours > 0) {
    parts.push(`${timeLeft.hours} hour${timeLeft.hours !== 1 ? 's' : ''}`);
  }
  if (timeLeft.minutes > 0) {
    parts.push(`${timeLeft.minutes} minute${timeLeft.minutes !== 1 ? 's' : ''}`);
  }
  if (timeLeft.days === 0 && timeLeft.hours === 0) {
    parts.push(`${timeLeft.seconds} second${timeLeft.seconds !== 1 ? 's' : ''}`);
  }

  return parts.join(', ');
};
