import { useEffect, useState } from 'react';
import { weightStorageName } from '@/tasks/constants/storage';
import { LocalStorageService } from '@/common/services/LocalStorageService';
import { getCurrentDate, getLastXOldCurrentDate } from '@/common/utils/getCurrentDate';
import { IWeight, IWeightItems } from 'src/weight/@types';
import { useDebounce } from '@/common/hooks/useDebounce';

const DEFAULT_WEIGHT = 1;
export const getData = (): IWeightItems => {
  const data = LocalStorageService.getItemAndParse<IWeightItems>(weightStorageName) || {};

  if (!data[getCurrentDate()]) {
    const lastWeights = Object.keys(data);
    if (!lastWeights.length) {
      return data;
    }

    return {
      ...data,
      [getCurrentDate()]: {
        id: new Date().getTime().toString(),
        weight: data[lastWeights[lastWeights.length - 1]]?.weight || DEFAULT_WEIGHT,
      },
    };
  }

  return data;
};

const saveData = (weightItems: IWeightItems) => {
  LocalStorageService.setItem(weightStorageName, weightItems);
};

const TIME_IN_MS_TO_SAVE_TASKS = 500;

const LAST_30_DAYS = 30;
const getLast30DaysWeights = (weights: IWeightItems): IWeight[] => {
  const last30Days = getLastXOldCurrentDate(LAST_30_DAYS);

  return last30Days.map((day) => {
    return weights[day] || { id: new Date().getTime().toString(), weight: 1 };
  });
};

const getCurrentWeight = (weights: IWeightItems) => {
  return weights[getCurrentDate()]?.weight || DEFAULT_WEIGHT;
};

export const useHandleWeight = () => {
  const [weights, setWeights] = useState<IWeightItems>(getData());
  const [currentWeight, setCurrentWeight] = useState(getCurrentWeight(weights));
  const [last30Days, setLast30Days] = useState<IWeight[]>(getLast30DaysWeights(weights));

  useDebounce(() => saveData(weights), [weights], TIME_IN_MS_TO_SAVE_TASKS);

  useEffect(() => {
    setCurrentWeight(getCurrentWeight(weights));
    setLast30Days(getLast30DaysWeights(weights));
  }, [weights]);

  const updateCurrentWeight = (diff: number): void => {
    setWeights((prev) => {
      return {
        ...prev,
        [getCurrentDate()]: {
          id: new Date().getTime().toString(),
          weight: Number((currentWeight + diff).toFixed(1)),
        },
      };
    });
  };

  const handleResetToNewDay = () => {
    const newWeights = getData();
    setWeights(newWeights);
    setCurrentWeight(getCurrentWeight(newWeights));
    setLast30Days(getLast30DaysWeights(newWeights));
  };

  return {
    handleResetToNewDay,
    currentWeight,
    updateCurrentWeight,
    last30Days,
  };
};
