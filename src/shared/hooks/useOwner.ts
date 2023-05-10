import useAuth from './useAuth';

export default (owner: string) => {
  const auth = useAuth();

  const isOwner = auth?.address === owner;

  return { isOwner };
};
