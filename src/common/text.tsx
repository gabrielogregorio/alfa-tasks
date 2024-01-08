import React, { ReactNode } from 'react';

export interface ITextProps {
  children: ReactNode;
}

export const Text = ({ children }: ITextProps) => {
  return (
    <p className="font-roboto-Condensed font-normal mb-[0.625rem] text-[1rem] text-white tracking-[7%] text-left">
      {children}
    </p>
  );
};
