import React, { ReactNode } from 'react';

interface IFirstLevelMenuProps {
  children: ReactNode;
}

export const FirstLevelMenu = ({ children }: IFirstLevelMenuProps) => {
  return <div className="ml-[1.75rem]">{children}</div>;
};
