import { useFetchQuestions } from '../features/questions/hooks';
import { QuestionsLayout } from '../features/questions/components';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

export const HomePage = () => {
  const { isLoading, isError } = useFetchQuestions();
  return isLoading ? <Loading /> : isError ? <Error /> : <QuestionsLayout />;
};
