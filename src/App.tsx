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

type NavigationButtonsProps = {
  questionId: string | undefined;
  setQuestionIndex: (index: number) => void;
};

const questions: Question[] = [
  {
    id: uuid(),
    question: 'What does CSS stand for?',
    options: [
      'Computer Style Sheets',
      'Cascading Style Sheets',
      'Creative Style Systems',
      'Colorful Style Sheets',
    ],
    answer: 'Cascading Style Sheets',
    bgColor: 'blue',
  },
  {
    id: uuid(),
    question: 'Which of the following is not a JavaScript data type?',
    options: ['Undefined', 'Boolean', 'String', 'Character'],
    answer: 'Character',
    bgColor: 'green',
  },
  {
    id: uuid(),
    question: 'What is the purpose of the "this" keyword in JavaScript?',
    options: [
      'To refer to the global object',
      'To refer to the current object',
      'To create a new object',
      'To define a function',
    ],
    answer: 'To refer to the current object',
    bgColor: 'yellow',
  },
  {
    id: uuid(),
    question: 'In which HTML tag do we put the JavaScript code?',
    options: ['<js>', '<scripting>', '<script>', '<javascript>'],
    answer: '<script>',
    bgColor: 'orange',
  },
  {
    id: uuid(),
    question: 'What is the main advantage of using React.js?',
    options: [
      'It only uses JavaScript',
      'It allows building reusable UI components',
      'It requires less server-side programming',
      'It is the fastest framework available',
    ],
    answer: 'It allows building reusable UI components',
    bgColor: 'purple',
  },
];

const fetchQuestions = () => {
  return new Promise<Question[]>((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.open('GET', '');
    req.onload = () => {
      if (req.status == 200) {
        setTimeout(() => {
          resolve(questions);
        }, 2000);
      } else {
        reject('There is an Error!');
      }
    };
    req.send();
  });
};

const Loading = () => (
  <div className='flex justify-center items-center h-screen'>
    Loading your data...
  </div>
);

const Error = () => (
  <div className='flex justify-center items-center h-screen'>
    Error while fetching your data
  </div>
);

const NoQuestions = () => (
  <div className='flex justify-center items-center h-screen'>
    No questions have been added
  </div>
);

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
  questionId,
  setQuestionIndex,
}: NavigationButtonsProps) => {
  const findQuestionIndex = (id: string): number =>
    questions.findIndex((q) => q.id === id);

  return questionId ? (
    <div className='col-span-2 h-12'>
      <div className='flex justify-between items-center'>
        <button
          disabled={findQuestionIndex(questionId) === 0}
          onClick={() => {
            const index = findQuestionIndex(questionId);
            setQuestionIndex(index - 1);
          }}
        >
          Back
        </button>
        <button
          disabled={findQuestionIndex(questionId) === questions.length - 1}
          onClick={() => {
            const index = findQuestionIndex(questionId);

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
            questionId={questions[questionIndex].id}
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
