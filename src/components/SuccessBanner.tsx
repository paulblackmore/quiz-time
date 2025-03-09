import { PropsWithChildren } from 'react';

export const SuccessBanner = ({ children }: PropsWithChildren) => {
  return (
    <div className='absolute top-0 left-0 right-0 flex justify-center items-center bg-green-400 h-20'>
      {children}
    </div>
  );
};
