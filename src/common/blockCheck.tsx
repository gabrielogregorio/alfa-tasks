import { CheckIsCheckedIcon, CheckIsNotCheckedIcon } from '@/common/icons';
import type { ReactElement } from 'react';

type Props = {
  isChecked: boolean;
  update: (value: boolean) => void;
};

export const BlockCheck = ({ isChecked, update }: Props): ReactElement => {
  return (
    <button
      type="button"
      aria-label={isChecked ? 'done' : 'not done'}
      onClick={() => update(!isChecked)}
      className="h-full w-full flex items-center justify-center py-[4px] px-[8px] pr-[16px]">
      <div className="border border-transparent hover:border-textColor/20 hover:bg-textColor/10 rounded-full flex items-center justify-center">
        {isChecked ? <CheckIsCheckedIcon /> : <CheckIsNotCheckedIcon />}
      </div>
    </button>
  );
};
