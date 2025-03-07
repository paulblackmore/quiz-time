import { Button } from '../../components/Button';

type Props = {
  questionCount: number;
  currentIndex: number;
  setCurrentIndex: (cb: (currentIndex: number) => number) => void;
};

export const FormFooter = ({
  questionCount,
  currentIndex,
  setCurrentIndex,
}: Props) => {
  const isFirstQuestion = currentIndex === 0;
  const isLastQuestion = currentIndex === questionCount - 1;

  return (
    <div className='col-span-2'>
      <div className='flex justify-between items-center'>
        <Button
          isDisabled={isFirstQuestion}
          handleClick={() => setCurrentIndex((index: number) => index - 1)}
          label='Back'
        />
        <Button
          isDisabled={isLastQuestion}
          handleClick={() => {
            if (isLastQuestion) return; // submit form
            else setCurrentIndex((index: number) => index + 1);
          }}
          label='Next'
        />
      </div>
    </div>
  );
};
