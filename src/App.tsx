import { PropsWithChildren, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useQuery } from '@tanstack/react-query';

type QuestionType = {
  id: string;
  question: string;
  options: string[];
  answer: string;
  bgColor: string;
};

type FormFooterProps = {
  questionCount: number;
  questionIndex: number;
  setQuestionIndex: (index: number) => void;
};

type ButtonProps = {
  isDisabled: boolean;
  handleClick: () => void;
  label: string;
};

type QuestionProps = Pick<QuestionType, 'question'>;
type OptionsListProps = Pick<QuestionType, 'options'>;
type CenteredProps = { bgColor?: string };
type OptionItemProps = { option: string };
type BgColorProps = { [key: string]: string };

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
    bgColor: 'slate',
  },
  {
    id: uuid(),
    question: 'In which HTML tag do we put the JavaScript code?',
    options: ['<js>', '<scripting>', '<script>', '<javascript>'],
    answer: '<script>',
    bgColor: 'teal',
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

const bgColorConfig: BgColorProps = {
  blue: 'bg-blue-800',
  green: 'bg-green-800',
  slate: 'bg-slate-800',
  teal: 'bg-teal-800',
  purple: 'bg-purple-800',
};

const fetchQuestions = (): Promise<QuestionType[]> => {
  return new Promise<QuestionType[]>((resolve, reject) => {
    const status = 200;
    if (status == 200) {
      setTimeout(() => {
        resolve(questions);
      }, 2000);
    } else {
      reject('There is an Error!');
    }
  });
};

const useFetchQuestions = () => {
  return useQuery({
    queryKey: ['questions'],
    queryFn: fetchQuestions,
  });
};

const CenteredElement = ({
  children,
  bgColor = 'bg-pink-400',
}: PropsWithChildren<CenteredProps>) => (
  <div className={`flex justify-center items-center h-screen ${bgColor}`}>
    {children}
  </div>
);

const Button = ({ isDisabled, handleClick, label }: ButtonProps) => (
  <button disabled={isDisabled} onClick={handleClick}>
    {label}
  </button>
);

const Question = ({ question }: QuestionProps) => (
  <div className='h-100'>
    <h3 className='font-bold text-5xl/16'>{question}</h3>
  </div>
);

const OptionItem = ({ option }: OptionItemProps) => (
  <div className='flex justify-between items-center'>
    <label htmlFor={option} className='text-lg'>
      {option}
    </label>
    <input id={option} type='checkbox' className='w-6 h-6 rounded-sm' />
  </div>
);

const OptionsList = ({ options }: OptionsListProps) => (
  <div className='flex flex-col gap-4 h-100'>
    {options.map((option) => (
      <OptionItem key={option} option={option} />
    ))}
  </div>
);

const FormFooter = ({
  questionCount,
  questionIndex,
  setQuestionIndex,
}: FormFooterProps) => {
  return (
    <div className='col-span-2'>
      <div className='flex justify-between items-center'>
        <Button
          isDisabled={questionIndex === 0}
          handleClick={() => setQuestionIndex(questionIndex - 1)}
          label='Back'
        />
        <Button
          isDisabled={questionIndex === questionCount - 1}
          handleClick={() => {
            if (questionIndex === questionCount - 1) return; // submit form
            else setQuestionIndex(questionIndex + 1);
          }}
          label='Next'
        />
      </div>
    </div>
  );
};

export default function App() {
  const { data: questions, isLoading, isError } = useFetchQuestions();
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const question = questions?.[questionIndex];

  return isLoading ? (
    <CenteredElement>Loading your data...</CenteredElement>
  ) : isError ? (
    <CenteredElement>Error while fetching your data</CenteredElement>
  ) : question ? (
    <CenteredElement bgColor={bgColorConfig[question.bgColor]}>
      <div className='grid grid-cols-2 gap-8 w-200'>
        <Question question={question.question} />
        <OptionsList options={question.options} />
        <FormFooter
          questionCount={questions.length}
          questionIndex={questionIndex}
          setQuestionIndex={setQuestionIndex}
        />
      </div>
    </CenteredElement>
  ) : (
    <CenteredElement>Sorry, question can not be found</CenteredElement>
  );
}
