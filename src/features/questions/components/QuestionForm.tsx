import { z } from 'zod';
import { Question } from './Question';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../../../components/Button';
import { QuestionType } from '../../../types';
import { ErrorBanner } from '../../../components/ErrorBanner';
import { SuccessBanner } from '../../../components/SuccessBanner';
import { useEffect } from 'react';

const quizSchema = z
  .object({
    results: z.array(
      z.object({
        id: z.string(),
        question: z.string(),
        answer: z.string().min(1, { message: 'You must select an answer' }),
        options: z.array(z.string()),
      })
    ),
  })
  .strict();

type Inputs = z.infer<typeof quizSchema>;

type Props = {
  currentIndex: number;
  currentQuestion: QuestionType;
  questions: QuestionType[];
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
};

export const QuestionForm = ({
  currentIndex,
  setCurrentIndex,
  questions,
  currentQuestion,
}: Props) => {
  const isFirstQuestion = currentIndex === 0;
  const isLastQuestion = currentIndex === questions.length - 1;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Inputs>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      results: [
        {
          id: currentQuestion.id,
          question: currentQuestion.question,
          options: currentQuestion.options,
          answer: '',
        },
      ],
    },
  });

  const { fields, append } = useFieldArray<Inputs>({
    name: 'results',
    control,
    rules: {
      minLength: questions.length,
      required: true,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log('submitted data', data);
  };

  useEffect(() => {
    if (errors.results?.length) {
      const index = (errors.results as { answer?: string }[]).findIndex(
        (result) => result?.answer
      );
      setCurrentIndex(index);
    }
  }, [errors, setCurrentIndex]);

  return (
    <form className='grid grid-cols-2 gap-8 w-200'>
      {errors.results?.[currentIndex]?.answer ? (
        <ErrorBanner>You must select an answer</ErrorBanner>
      ) : null}
      {isSubmitSuccessful ? (
        <SuccessBanner>Thanks for taking the quiz</SuccessBanner>
      ) : null}
      <Question question={fields[currentIndex].question} />
      <div className='flex flex-col gap-4 h-100'>
        {fields[currentIndex].options.map((option) => (
          <div key={option} className='flex justify-between items-center'>
            <label htmlFor={option} className='text-lg'>
              {option}
            </label>
            <input
              type='radio'
              id={option}
              className='w-6 h-6 rounded-sm'
              value={option}
              {...register(`results.${currentIndex}.answer`)}
            />
          </div>
        ))}
      </div>
      <div className='col-span-2'>
        <div className='flex justify-between items-center'>
          <Button
            type='button'
            isDisabled={isFirstQuestion}
            handleClick={() => setCurrentIndex((index: number) => index - 1)}
            label='Back'
          />
          <Button
            type='button'
            handleClick={() => {
              if (!isLastQuestion) {
                setCurrentIndex((index: number) => index + 1);
                append({
                  id: questions[currentIndex + 1].id,
                  question: questions[currentIndex + 1].question,
                  options: questions[currentIndex + 1].options,
                  answer: '',
                });
              } else {
                console.log('submitted');
                handleSubmit(onSubmit)();
              }
            }}
            label='Next'
          />
        </div>
      </div>
    </form>
  );
};
