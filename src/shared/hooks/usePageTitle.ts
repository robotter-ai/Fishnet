import { setPageDetails } from '@slices/appSlice';
import { useAppDispatch, useAppSelector } from './useStore';

export default () => {
  const dispatch = useAppDispatch();
  const { pageTitle, pageStatus } = useAppSelector((state) => state.app);

  const handleSetTitle = (title: string, status?: string) =>
    dispatch(setPageDetails({ pageTitle: title, pageStatus: status }));

  return { title: pageTitle, pageStatus, setTitle: handleSetTitle };
};
