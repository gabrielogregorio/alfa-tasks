import { Button } from '@/common/components/Button';
import { useResetOnNewDay } from '@/tasks/hooks/useResetOnNewDay';
import { useEffect } from 'react';
import { ArrowUp } from '@/common/icons';
import { useHandleWeight } from '@/tasks/hooks/useHandleWeightV3';

const MIN_VALUE = 1;
const translateRangeXMinXMaxToMinCanvasMaxCanvas = ({
  x = MIN_VALUE,
  xMin = MIN_VALUE,
  xMax = MIN_VALUE,
  canvasMin = MIN_VALUE,
  canvasMax = MIN_VALUE,
}: {
  x: number;
  xMin: number;
  xMax: number;
  canvasMin: number;
  canvasMax: number;
}) => {
  return canvasMin + ((x - xMin) / (xMax - xMin)) * (canvasMax - canvasMin);
};

const MAX_PLOT_DATA = 30;

const getLastDataByMaxPlotData = (data: number[]): number[] => {
  return data.reverse().slice(0, MAX_PLOT_DATA);
};

const handlesFillingTheCanvas = (data: number[]) => {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement | undefined;
  if (!canvas) {
    return;
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const dataHandled = getLastDataByMaxPlotData(data);

  const xMin = Math.min(...dataHandled);
  const xMax = Math.max(...dataHandled);
  const xSpacing = Math.round(canvas.width / (dataHandled.length - 1));

  ctx.beginPath();

  dataHandled.forEach((x, index) => {
    const xHandled = index * xSpacing;
    const yHandled =
      canvas.height -
      translateRangeXMinXMaxToMinCanvasMaxCanvas({ x, xMin, xMax, canvasMin: 0, canvasMax: canvas.height });

    if (index === 0) {
      ctx.moveTo(xHandled, yHandled);
    } else {
      ctx.lineTo(xHandled, yHandled);
    }
  });

  ctx.strokeStyle = '#dedee8';
  ctx.lineWidth = 2;
  ctx.stroke();
};

const SCALE_DECIMAL = 0.1;
const SCALE_UNIT = 1;
const SCALE_TEN = 10;

export const MyWeight = () => {
  const { last30Days, currentWeight, updateCurrentWeight } = useHandleWeight();
  useResetOnNewDay();

  useEffect(() => {
    handlesFillingTheCanvas(last30Days.map((item) => item.weight));
  }, [last30Days]);

  const handleWeight = (diff: number) => {
    updateCurrentWeight(diff);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <canvas id="canvas" width={400} height={100} className="bg-textColor/10 w-full" />
      </div>

      <div className="w-full flex flex-col items-center justify-center mt-16">
        <div className="flex gap-2">
          <Button
            className="text-[4rem]"
            content=""
            onClick={() => {
              handleWeight(SCALE_TEN);
            }}
            iconLeft={<ArrowUp />}
          />
          <Button
            className="text-[4rem]"
            content=""
            onClick={() => {
              handleWeight(SCALE_UNIT);
            }}
            iconLeft={<ArrowUp />}
          />
          <Button
            className="text-[4rem]"
            content=""
            onClick={() => {
              handleWeight(SCALE_DECIMAL);
            }}
            iconLeft={<ArrowUp />}
          />
        </div>

        <div>
          <Button className="text-[4rem]" content={`${currentWeight} kg`} onClick={() => {}} />
        </div>

        <div className="flex gap-2">
          <Button
            className="text-[4rem] rotate-180"
            content=""
            onClick={() => {
              handleWeight(-SCALE_TEN);
            }}
            iconLeft={<ArrowUp />}
          />
          <Button
            className="text-[4rem] rotate-180"
            content=""
            onClick={() => {
              handleWeight(-SCALE_UNIT);
            }}
            iconLeft={<ArrowUp />}
          />
          <Button
            className="text-[4rem] rotate-180"
            content=""
            onClick={() => {
              handleWeight(-SCALE_DECIMAL);
            }}
            iconLeft={<ArrowUp />}
          />
        </div>
      </div>
    </div>
  );
};
