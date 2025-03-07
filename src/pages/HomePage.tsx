import { useState } from 'react';
import { CenteredElement } from '../components/CenteredElement';
import { Text } from '../components/Text';
import { Question } from './features/Question';
import { OptionsList } from './features/OptionsList';
import { FormFooter } from './features/FormFooter';
import { useFetchQuestions } from './hooks';
import { bgColorConfig } from '../utils';

export const HomePage = () => {
  const { data: questions, isLoading, isError } = useFetchQuestions();
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const currentQuestion = questions?.[currentIndex];
  const questionCount = questions?.length || 0;

  return isLoading ? (
    <CenteredElement>
      <Text>Loading your data...</Text>
    </CenteredElement>
  ) : isError ? (
    <CenteredElement>
      <Text>Error while fetching your data</Text>
    </CenteredElement>
  ) : currentQuestion ? (
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
  ) : (
    <CenteredElement>
      <Text>Sorry, question can not be found</Text>
    </CenteredElement>
  );
};
