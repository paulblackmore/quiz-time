type Props = { option: string };

export const OptionItem = ({ option }: Props) => (
  <div className='flex justify-between items-center'>
    <label htmlFor={option} className='text-lg'>
      {option}
    </label>
    <input id={option} type='checkbox' className='w-6 h-6 rounded-sm' />
  </div>
);
