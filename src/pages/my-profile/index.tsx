import { SearchInput } from '@components/form';
import classNames from 'classnames';
import React from 'react';
import Overview from './components/Overview';
import BrowseUsers from './components/BrowseUsers';
import useProfile, { ITab } from './hooks/useProfile';
import EditAccount from './components/EditAccount';

const MyProfile = () => {
  const {
    tabs,
    query,
    isSelectUser,
    inputs,
    handleOnChange,
    handleUpdateProfile,
    isLoading,
    allUsers,
    searchParams,
    setSearchParams,
    transactions,
    address,
  } = useProfile();

  const TableMapper: Record<ITab, React.ReactNode> = {
    overview: (
      <Overview inputs={inputs} address={address} transactions={transactions} />
    ),
    'edit-account': (
      <EditAccount
        inputs={inputs}
        handleOnChange={handleOnChange}
        isLoading={isLoading}
        address={address}
        transactions={transactions}
        handleUpdateProfile={handleUpdateProfile}
      />
    ),
    'browse-users': (
      <BrowseUsers allUsers={allUsers} isSelectUser={isSelectUser} />
    ),
  };

  const TableComponent = TableMapper[query];

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
                  '!text-dark-50 !border-primary': item.key === query,
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
        <SearchInput value="" onChange={() => null} />
      </div>
      {TableComponent}
    </div>
  );
};

export default MyProfile;
