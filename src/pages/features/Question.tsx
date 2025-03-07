import { QuestionType } from '../../types';

type Props = Pick<QuestionType, 'question'>;

export const Question = ({ question }: Props) => (
  <div className='h-100'>
    <h3 className='font-bold text-5xl/16'>{question}</h3>
  </div>
);
