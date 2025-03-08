import { useState } from 'react';
import { useFetchQuestions } from '../features/questions/hooks';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';
import {
  QuestionNotFound,
  QuestionSection,
} from '../features/questions/components';

export const HomePage = () => {
  const { data: questions, isLoading, isError } = useFetchQuestions();
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const currentQuestion = questions?.[currentIndex];
  const questionCount = questions?.length || 0;

  return isLoading ? (
    <Loading />
  ) : isError ? (
    <Error />
  ) : currentQuestion ? (
    <QuestionSection
      questionCount={questionCount}
      currentIndex={currentIndex}
      setCurrentIndex={setCurrentIndex}
      currentQuestion={currentQuestion}
    />
  ) : (
    <QuestionNotFound />
  );
};
