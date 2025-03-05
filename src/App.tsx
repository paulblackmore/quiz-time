import { PropsWithChildren, useState } from 'react';

type Question = {
  id: number;
  question: string;
  options: string[];
  answer: string;
  bgColor: string;
};

type QuestionProps = {
  question: Question;
};

const dummy_questions: Question[] = [
  {
    id: 1,
    question: 'A long strig of text and this What is 2 + 2?',
    options: ['1', '2', '3', '4'],
    answer: '4',
    bgColor: 'blue',
  },
  {
    id: 2,
    question: 'What is 3 + 3?',
    options: ['1', '2', '3', '4'],
    answer: '6',
    bgColor: 'green',
  },
  {
    id: 3,
    question: 'What is 4 + 4?',
    options: ['1', '2', '3', '4'],
    answer: '8',
    bgColor: 'yellow',
  },
  {
    id: 4,
    question: 'What is 5 + 5?',
    options: ['1', '2', '3', '4'],
    answer: '10',
    bgColor: 'orange',
  },
];

const Question = ({ children, question }: PropsWithChildren<QuestionProps>) => {
  return (
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
  );
};

function App() {
  const [question, setQuestion] = useState(dummy_questions[0]);

  return (
    <div>
      <Question question={question}>
        <div className='col-span-2 h-12'>
          <div className='flex justify-between items-center'>
            <button
              onClick={() => setQuestion(dummy_questions[question.id - 1])}
            >
              Back
            </button>
            <button onClick={() => setQuestion(dummy_questions[question.id])}>
              Next
            </button>
          </div>
        </div>
      </Question>
    </div>
  );
}

export default App;
