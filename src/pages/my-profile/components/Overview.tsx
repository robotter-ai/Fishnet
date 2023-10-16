import React from 'react';
import { UserProps } from '@slices/profileSlice/profileService';
import DataSummary from '@shared/components/Summary';
import TruncatedAddress from '@shared/components/TruncatedAddress';
import TransactionTable from './TransactionTable';

interface IOverviewProps {
  inputs: UserProps;
  transactions: any;
  address: any;
}

const Overview: React.FC<IOverviewProps> = ({
  inputs,
  transactions,
  address,
}) => {
  const ACCOUNT = [
    {
      name: 'Wallet address',
      value: <TruncatedAddress hash={inputs.address} copy />,
    },
    {
      name: 'Username',
      value: inputs.username,
    },
    {
      name: 'Email',
      value: inputs.email,
    },
    {
      name: 'Link',
      value: inputs.link,
    },
    {
      name: 'Total downloads',
      value: 0,
    },
    {
      name: 'Description',
      value: inputs.bio,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-5 mt-8">
      <DataSummary title="Your account" summary={ACCOUNT} />
      <TransactionTable address={address} data={transactions} />
    </div>
  );
};

export default Overview;
