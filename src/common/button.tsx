import React, { ReactElement, ReactNode } from 'react';

export interface IButtonProps {
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  content: string;
  onClick: () => void;
  onHover?: () => void;
  isRisked?: boolean;
  ariaLabel?: string;
  className?: string;
  isDisabled?: boolean;
}

export const Button = ({
  iconLeft = undefined,
  iconRight = undefined,
  content,
  onClick,
  className = undefined,
  onHover = () => {},
  isRisked = false,
  ariaLabel = undefined,
  isDisabled = false,
}: IButtonProps): ReactElement => {
  const styleNormalAndDisabled = isDisabled ? 'text-white/40' : 'text-white';

  const styleIsRisked = isRisked ? 'line-through text-white/40' : styleNormalAndDisabled;

  return (
    <button
      onClick={() => {
        if (!isDisabled) {
          onClick();
        }
      }}
      aria-label={ariaLabel}
      onMouseEnter={onHover}
      disabled={isDisabled}
      type="button"
      className={` font-roboto-Condensed text-[1rem] tracking-[9%] mb-[0px] px-[0.875rem] py-[0.438rem] border border-transparent hover:border-white/60 hover:bg-black/30  flex items-center justify-center ${styleIsRisked} ${className}`}>
      {iconLeft ? <span className="mr-[0.375rem]">{iconLeft}</span> : undefined}

      <span className="flex-1">{content}</span>

      {iconRight ? <span className="ml-[0.375rem]">{iconRight}</span> : undefined}
    </button>
  );
};
