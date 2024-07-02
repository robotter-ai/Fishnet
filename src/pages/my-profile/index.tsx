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
    user,
    query,
    address,
    transactions,
    searchParams,
    setSearchParams,
  } = useProfile();

  const TableMapper: Record<ITab, React.ReactNode> = {
    overview: (
      <Overview user={user} address={address} transactions={transactions} />
    ),
    'edit-account': <EditAccount user={user} transactions={transactions} />,
    'browse-users': <BrowseUsers />,
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
