import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const Title = ({ children }: Props) => {
  return <h1 className="text-center mt-36 text-textColor font-bold text-6xl select-none">{children}</h1>;
};
