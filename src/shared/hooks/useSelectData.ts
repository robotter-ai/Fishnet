import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

type PathProps = '/' | '/algorithms' | '/monitor-access' | '/profile';

export default () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('select');
  const isSelect = query && JSON.parse(query);

  const handleNavigateWithSelect = (path: PathProps) => {
    navigate({
      pathname: path,
      search: createSearchParams({
        select: 'true',
      }).toString(),
    });
  };

  return { isSelect, handleNavigateWithSelect };
};
