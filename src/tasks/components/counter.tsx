import { Button } from '@/common/components/Button';
import { useEffect, useState } from 'react';

const ONE_MS_IN_SECOND = 1000;
type exampleType = {
  timer: number;
  text: string;
};

const timers: exampleType[] = [
  {
    timer: 1000 * 60,
    text: '1min',
  },
  {
    timer: 1000 * 60 * 2,
    text: '2min',
  },
  {
    timer: 1000 * 60 * 5,
    text: '5min',
  },
  {
    timer: 1000 * 60 * 25,
    text: '25min',
  },
  {
    timer: 1000 * 60 * 60,
    text: '1h',
  },
];

export const Counter = () => {
  const [timer, setTimer] = useState<null | number>(null);
  const [target, setTarget] = useState(0);
  const [anyTimer, setAnyTimer] = useState<exampleType | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 0 || prev === null) {
          setTarget(0);
          return null;
        }

        return prev - 1000;
      });
    }, ONE_MS_IN_SECOND);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const percent = timer ? (timer * 100) / target : 0;

  return (
    <div>
      <div className="flex items-center justify-center">
        {timers.map((item) => {
          return (
            <Button
              key={item.text}
              className={`text-[2rem] mt-16 ${item.timer === anyTimer?.timer ? 'border-textColor/20 bg-textColor/10' : ''}`}
              isRisked={percent === 0 && item.timer === anyTimer?.timer}
              content={item.text}
              onClick={() => {
                setTarget(item.timer);
                setTimer(item.timer);
                setAnyTimer(item);
              }}
            />
          );
        })}
      </div>

      {anyTimer?.text ? (
        <div className="flex items-center justify-center">
          <div className="w-[40rem] relative border-b border-white">
            <div className="absolute h-7 left-0 bg-white" style={{ width: `${100 - percent}%` }} />
          </div>
        </div>
      ) : undefined}
    </div>
  );
};
