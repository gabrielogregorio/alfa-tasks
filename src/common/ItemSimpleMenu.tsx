import React from 'react';

export interface ItemSimpleMenuProps {
  content: string;
  onClick: () => void;
  onHover?: () => void;
  isSelected?: boolean;
}

export const ItemSimpleMenu = ({ content, isSelected = false, onClick, onHover = () => {} }: ItemSimpleMenuProps) => {
  const styleIsSelected = isSelected ? 'text-textColor' : 'text-textColor/60';
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={onHover}
      className={`font-roboto-Condensed text-[14px] tracking-[5%] mb-[0px] px-[0.875rem] py-[0.438rem] border border-transparent hover:border-textColor/60 hover:text-textColor hover:bg-textColor/30 ${styleIsSelected}`}>
      {content}
    </button>
  );
};
