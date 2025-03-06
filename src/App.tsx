import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useQuery } from '@tanstack/react-query';

type QuestionType = {
  id: string;
  question: string;
  options: string[];
  answer: string;
  bgColor: string;
};

type FormNavFooterProps = {
  questionId: string;
  setQuestionIndex: (index: number) => void;
};

type ButtonProps = {
  isDisabled: boolean;
  handleClick: () => void;
  label: string;
};

const questions: QuestionType[] = [
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

const backgroundConfig: { [key: string]: string } = {
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  yellow: 'bg-yellow-500',
  orange: 'bg-orange-500',
  purple: 'bg-purple-500',
};

const fetchQuestions = (): Promise<QuestionType[]> => {
  return new Promise<QuestionType[]>((resolve, reject) => {
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

const FallbackDisplay = ({ text }: { text: string }) => (
  <div className='flex justify-center items-center h-screen'>{text}</div>
);

const Button = ({ isDisabled, handleClick, label }: ButtonProps) => (
  <button disabled={isDisabled} onClick={handleClick}>
    {label}
  </button>
);

const Question = ({ question }: { question: string }) => (
  <div className='h-100 p-10'>
    <h3 className='font-bold text-3xl'>{question}</h3>
  </div>
);

const Option = ({ option }: { option: string }) => (
  <div className='flex  justify-between items-center'>
    <label htmlFor={option} className='ms-2 text-lg'>
      {option}
    </label>
    <input id={option} type='checkbox' className='w-6 h-6 rounded-sm' />
  </div>
);

const Options = ({ options }: { options: string[] }) => (
  <div className='flex flex-col gap-4 h-100 p-10'>
    {options.map((option) => (
      <Option key={option} option={option} />
    ))}
  </div>
);

const FormNavFooter = ({
  questionId,
  setQuestionIndex,
}: FormNavFooterProps) => {
  const findQuestionIndex = (id: string): number =>
    questions.findIndex((q) => q.id === id);

  return (
    <div className='col-span-2 h-12'>
      <div className='flex justify-between items-center'>
        <Button
          isDisabled={findQuestionIndex(questionId) === 0}
          handleClick={() => {
            const index = findQuestionIndex(questionId);
            setQuestionIndex(index - 1);
          }}
          label='Back'
        />
        <Button
          isDisabled={findQuestionIndex(questionId) === questions.length - 1}
          handleClick={() => {
            const index = findQuestionIndex(questionId);

            if (index === questions.length - 1) {
              // submit form
            } else {
              setQuestionIndex(index + 1);
            }
          }}
          label='Next'
        />
      </div>
    </div>
  );
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

  const question = questions?.[questionIndex];
  const bgColor = `${
    question ? backgroundConfig[question.bgColor] : 'bg-slate-200'
  }`;

  return isLoading ? (
    <FallbackDisplay text='Loading your data...' />
  ) : isError ? (
    <FallbackDisplay text='Error while fetching your data' />
  ) : question ? (
    <div className={`flex justify-center items-center h-screen ${bgColor}`}>
      <div className='grid grid-cols-2 gap-4 w-200'>
        <Question question={question.question} />
        <Options options={question.options} />
        <FormNavFooter
          questionId={question.id}
          setQuestionIndex={setQuestionIndex}
        />
      </div>
    </div>
  ) : (
    <FallbackDisplay text='No questions have been added' />
  );
}

export default App;
