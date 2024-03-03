import { ReactNode } from 'react';

type TitleProps = {
  children: ReactNode;
};

export const Title = ({ children }: TitleProps) => {
  return <h1 className="text-center mt-36 text-textColor font-bold text-6xl select-none">{children}</h1>;
};
