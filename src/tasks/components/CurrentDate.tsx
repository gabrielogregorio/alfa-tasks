import { Button } from '@/common/components/Button';
import { useEffect, useState } from 'react';

const ONE_MS_IN_SECOND = 1000;

const padStart = (value: string) => {
  return value.padStart(2, '0');
};

const getYour = () => {
  const hour = padStart(new Date().getHours().toString());
  const minutes = padStart(new Date().getMinutes().toString());
  const seconds = padStart(new Date().getSeconds().toString());

  return `${hour}:${minutes}:${seconds}`;
};

export const CurrentDate = () => {
  const [currentDate, setCurrentDate] = useState<string>(getYour());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(getYour());
    }, ONE_MS_IN_SECOND);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex items-center justify-center">
      <Button className="text-[6rem] mt-16" content={currentDate} onClick={() => {}} />
    </div>
  );
};
