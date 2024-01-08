import React from 'react';

export interface ItemSimpleMenuProps {
  content: string;
  level?: '0' | '1';
  onClick: () => void;
  onHover?: () => void;
  isSelected?: boolean;
}

export const ItemSimpleMenu = ({
  content,
  level = '0',
  isSelected = false,
  onClick,
  onHover = () => {},
}: ItemSimpleMenuProps) => {
  const marginByLevel = {
    '0': 'ml-[0px]',
    '1': 'ml-[1.75rem]',
  };

  const styleIsSelected = isSelected ? 'text-white' : 'text-white/60';
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={onHover}
      className={`font-roboto-Condensed text-[14px] tracking-[5%] mb-[0px] px-[0.875rem] py-[0.438rem] border border-transparent hover:border-white/60 hover:text-white hover:bg-black/30 ${marginByLevel[level]} ${styleIsSelected}`}>
      {content}
    </button>
  );
};
