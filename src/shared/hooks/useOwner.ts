import { useAppSelector } from '@shared/hooks/useStore';

export default (owner: string) => {
  const auth = useAuth();

  const isOwner = auth?.address === owner;

  return { isOwner };
};
