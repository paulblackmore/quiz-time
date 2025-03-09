import { PropsWithChildren } from 'react';

export const ErrorBanner = ({ children }: PropsWithChildren) => {
  return (
    <div className='absolute top-0 left-0 right-0 flex justify-center items-center bg-red-400 h-20'>
      {children}
    </div>
  );
};
