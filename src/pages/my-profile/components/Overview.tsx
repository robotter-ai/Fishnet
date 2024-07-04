import React from 'react';
import { IUserInfo } from '@store/profile/types';
import DataSummary from '@shared/components/Summary';
import TruncatedAddress from '@shared/components/TruncatedAddress';
import TransactionTable from './TransactionTable';

interface IOverviewProps {
  user: IUserInfo;
  transactions: any;
  address: string;
}

const Overview: React.FC<IOverviewProps> = ({
  user,
  transactions,
  address,
}) => {
  const ACCOUNT = [
    {
      name: 'Wallet address',
      value: <TruncatedAddress address={address} copy />,
    },
    {
      name: 'Username',
      value: user?.username,
    },
    {
      name: 'Email',
      value: user?.email,
    },
    {
      name: 'Link',
      value: user?.link,
    },
    {
      name: 'Total downloads',
      value: user?.downloads,
    },
    {
      name: 'Description',
      value: user?.bio,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-5 mt-8">
      <div className="max-w-[75%]">
        <DataSummary title="Your account" summary={ACCOUNT} />
      </div>
      <TransactionTable address={address} data={transactions} />
    </div>
  );
};

export default Overview;
