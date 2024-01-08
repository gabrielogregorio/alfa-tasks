import React from 'react';

export interface ITitleSimpleMenuProps {
  content: string;
}

export const TitleSimpleMenu = ({ content }: ITitleSimpleMenuProps) => {
  return (
    <div className="w-full flex justify-between items-center mb-[21px]">
      <button
        type="button"
        className="text-textColor font-roboto-Condensed font-normal text-[1.25rem] tracking-[5%] mb-[0px] text-left">
        {content}
      </button>

      <div className="flex-1 ml-[0.938rem] h-[0.063rem] w-full bg-textColor/20" />
    </div>
  );
};
