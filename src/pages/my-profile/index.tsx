import { SearchInput } from '@components/form';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import Account from './components/Account';
import BrowseUsers from './components/BrowseUsers';
import useProfile from './hooks/useProfile';

const MyProfile = () => {
  const {
    isSelectUser,
    inputs,
    handleOnChange,
    handleUpdateProfile,
    isLoading,
    allUsers,
  } = useProfile();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabs = [
    { key: 'account', name: 'Account' },
    { key: 'browse-users', name: 'Browse users' },
  ];
  const TableMapper: { [key: string]: React.ReactNode } = {
    account: (
      <Account
        inputs={inputs}
        handleOnChange={handleOnChange}
        isLoading={isLoading}
        handleUpdateProfile={handleUpdateProfile}
      />
    ),
    'browse-users': (
      <BrowseUsers allUsers={allUsers} isSelectUser={isSelectUser} />
    ),
  };
  const query: null | string = searchParams.get('tab') || 'account';
  const TableComponent = TableMapper?.[query];

  return (
    <div id="profile">
      <div className="flex justify-between items-center mb-5">
        <div className="flex gap-4">
          {tabs.map((item, i) => (
            <div
              key={i}
              className={classNames(
                'text-dark-20 border-b-2 border-transparent cursor-pointer',
                {
                  '!text-dark-50 !border-blue': item.key === query,
                }
              )}
              onClick={() => {
                searchParams.set('tab', item.key);
                setSearchParams(searchParams);
              }}
            >
              {item.name}
            </div>
          ))}
        </div>
        {searchParams.get('tab') === 'browse-users' ? <SearchInput /> : null}
      </div>
      {TableComponent}
    </div>
  );
};

export default MyProfile;
