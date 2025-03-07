import { useQuery } from '@tanstack/react-query';
import { fetchQuestions } from '../../services';

export const useFetchQuestions = () => {
  return useQuery({
    queryKey: ['questions'],
    queryFn: fetchQuestions,
  });
};
