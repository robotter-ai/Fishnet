import { useEffect } from 'react';
import useTitle from '@shared/hooks/useTitle';

export default () => {
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle('Monitor Access');
  }, []);
};
