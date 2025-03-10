import { useState } from 'react';
import { CenteredElement } from '../../../components/CenteredElement';
import { bgColorConfig } from '../../../utils/background-color';
import { useFetchQuestions } from '../hooks';
import { QuestionNotFound } from './QuestionNotFound';
import { QuestionForm } from './QuestionForm';

export const QuestionsLayout = () => {
  const { data: questions = [] } = useFetchQuestions();
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  return questions.length ? (
    <CenteredElement bgColor={bgColorConfig[questions[currentIndex].bgColor]}>
      <QuestionForm
        questions={questions}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
    </CenteredElement>
  ) : (
    <QuestionNotFound />
  );
};
