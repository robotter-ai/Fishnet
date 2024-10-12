import { useAppSelector } from './useStore';

const useOwner = () => {
  const { address } = useAppSelector((state) => state.auth);
};
