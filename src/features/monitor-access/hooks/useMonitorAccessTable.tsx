import { useEffect } from 'react';
import usePageTitle from '@shared/hooks/usePageTitle';

export default () => {
  const { setTitle } = usePageTitle();

  useEffect(() => {
    setTitle('Monitor Access');
  }, []);
};
