import { CenteredElement } from '../../../components/CenteredElement';
import { Question } from './Question';
import { OptionsList } from './OptionsList';
import { FormFooter } from './FormFooter';
import { bgColorConfig } from '../../../utils/background-color';
import { QuestionType } from '../../../types';

type Props = {
  currentQuestion: QuestionType;
  questionCount: number;
  currentIndex: number;
  setCurrentIndex: (callback: (currentIndex: number) => number) => void;
};

export const QuestionSection = ({
  currentQuestion,
  questionCount,
  currentIndex,
  setCurrentIndex,
}: Props) => {
  return (
    <CenteredElement bgColor={bgColorConfig[currentQuestion.bgColor]}>
      <div className='grid grid-cols-2 gap-8 w-200'>
        <Question question={currentQuestion.question} />
        <OptionsList options={currentQuestion.options} />
        <FormFooter
          questionCount={questionCount}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      </div>
    </CenteredElement>
  );
};
