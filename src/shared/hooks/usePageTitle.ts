import { setPageTitle } from '@slices/appSlice';
import { useAppDispatch, useAppSelector } from './useStore';

export default () => {
  const dispatch = useAppDispatch();
  const { pageTitle } = useAppSelector((state) => state.app);

  const handleSetTitle = (title: string) => dispatch(setPageTitle(title));

  return { title: pageTitle, setTitle: handleSetTitle };
};
