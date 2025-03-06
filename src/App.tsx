import { PropsWithChildren, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useQuery } from '@tanstack/react-query';

type Question = {
  id: string;
  question: string;
  options: string[];
  answer: string;
  bgColor: string;
};

type Props = {
  question: Question | undefined;
};

type NavigationButtonsProps = Props & {
  setQuestionIndex: (index: number) => void;
};

const questions: Question[] = [
  {
    id: uuid(),
    question: 'A long strig of text and this What is 2 + 2?',
    options: ['1', '2', '3', '4'],
    answer: '4',
    bgColor: 'blue',
  },
  {
    id: uuid(),
    question: 'What is 3 + 3?',
    options: ['1', '2', '3', '4'],
    answer: '6',
    bgColor: 'green',
  },
  {
    id: uuid(),
    question: 'What is 4 + 4?',
    options: ['1', '2', '3', '4'],
    answer: '8',
    bgColor: 'yellow',
  },
  {
    id: uuid(),
    question: 'What is 5 + 5?',
    options: ['1', '2', '3', '4'],
    answer: '10',
    bgColor: 'orange',
  },
];

const fetchQuestions = () => {
  return new Promise<Question[]>((resolve) => {
    setTimeout(() => {
      resolve(questions);
    }, 1000);
  });
};

const Question = ({ children, question }: PropsWithChildren<Props>) => {
  return question ? (
    <div
      className={`flex justify-center items-center h-screen bg-linear-to-br from-${question.bgColor}-500 to-slate-200`}
    >
      <div className='grid grid-cols-2 gap-4 h-100 w-200'>
        <div className='h-100 p-10'>
          <h3 className='font-bold text-3xl'>{question.question}</h3>
        </div>
        <div className='h-100 p-10'>
          <h3 className='font-bold text-3xl'>{question.answer}</h3>
        </div>
        {children}
      </div>
    </div>
  ) : null;
};

const NavigationButtons = ({
  question,
  setQuestionIndex,
}: NavigationButtonsProps) => {
  const findQuestionIndex = (id: string): number =>
    questions.findIndex((q) => q.id === id);

  return question ? (
    <div className='col-span-2 h-12'>
      <div className='flex justify-between items-center'>
        <button
          disabled={findQuestionIndex(question.id) === 0}
          onClick={() => {
            const index = findQuestionIndex(question.id);
            setQuestionIndex(index - 1);
          }}
        >
          Back
        </button>
        <button
          disabled={findQuestionIndex(question.id) === questions.length - 1}
          onClick={() => {
            const index = findQuestionIndex(question.id);

            if (index === questions.length - 1) {
              // submit form
            } else {
              setQuestionIndex(index + 1);
            }
          }}
        >
          Next
        </button>
      </div>
    </div>
  ) : null;
};

const Loading = () => <div>Loading...</div>;

const Error = () => <div>Error</div>;

const NoQuestions = () => <div>No questions</div>;

function App() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const {
    data: questions,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['questions'],
    queryFn: fetchQuestions,
  });

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <Error />
      ) : questions?.length ? (
        <Question question={questions[questionIndex]}>
          <NavigationButtons
            question={questions[questionIndex]}
            setQuestionIndex={setQuestionIndex}
          />
        </Question>
      ) : (
        <NoQuestions />
      )}
    </div>
  );
}

export default App;
