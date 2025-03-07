import { QuestionType } from '../../types';
import { OptionItem } from './OptionItem';

type Props = Pick<QuestionType, 'options'>;

export const OptionsList = ({ options }: Props) => (
  <div className='flex flex-col gap-4 h-100'>
    {options.map((option) => (
      <OptionItem key={option} option={option} />
    ))}
  </div>
);
