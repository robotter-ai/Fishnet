import { useAppSelector } from './useStore';

export default (owner: string) => {
  const { address } = useAppSelector((state) => state.profile.auth);

  const isOwner = address === owner;

  return { isOwner };
};
