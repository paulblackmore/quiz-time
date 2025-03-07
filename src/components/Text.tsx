import { PropsWithChildren } from 'react';

export const Text = ({ children }: PropsWithChildren) => (
  <div className='text-2xl'>{children}</div>
);
