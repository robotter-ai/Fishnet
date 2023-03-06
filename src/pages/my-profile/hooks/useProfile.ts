import { useEffect } from 'react';
import usePageTitle from '@shared/hooks/usePageTitle';
import useSelectData from '@shared/hooks/useSelectData';

export default () => {
  const { setTitle } = usePageTitle();
  const { isSelect } = useSelectData();

  useEffect(() => {
    if (isSelect) {
      setTitle('Select user');
    } else {
      setTitle('Profile');
    }
  }, [isSelect]);

  return { isSelectUser: isSelect };
};
