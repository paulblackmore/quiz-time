import { questions } from '../data/dummy-questions';
import { QuestionType } from '../types';

export const fetchQuestions = (): Promise<QuestionType[]> => {
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
