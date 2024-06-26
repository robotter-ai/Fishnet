import { useAuth } from '@contexts/auth-provider';

export default (owner: string) => {
  const auth = useAuth();

  const isOwner = auth?.address === owner;

  return { isOwner };
};
