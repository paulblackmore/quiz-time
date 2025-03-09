import { useState } from 'react';
import { CenteredElement } from '../../../components/CenteredElement';
import { bgColorConfig } from '../../../utils/background-color';
import { useFetchQuestions } from '../hooks';
import { QuestionNotFound } from './QuestionNotFound';
import { QuestionForm } from './QuestionForm';

export const QuestionsLayout = () => {
  const { data: questions = [] } = useFetchQuestions();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const currentQuestion = questions[currentIndex];

  return questions.length ? (
    <CenteredElement bgColor={bgColorConfig[currentQuestion.bgColor]}>
      <QuestionForm
        questions={questions}
        currentIndex={currentIndex}
        currentQuestion={currentQuestion}
        setCurrentIndex={setCurrentIndex}
      />
    </CenteredElement>
  ) : (
    <QuestionNotFound />
  );
};
