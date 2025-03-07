import { PropsWithChildren } from 'react';

type Props = { bgColor?: string };

export const CenteredElement = ({
  children,
  bgColor = 'bg-pink-400',
}: PropsWithChildren<Props>) => (
  <div className={`flex justify-center items-center h-screen ${bgColor}`}>
    {children}
  </div>
);
