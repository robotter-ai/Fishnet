import React from 'react';
import { UserProps } from '@slices/profileSlice/profileService';
import DataSummary from '@shared/components/Summary';
import TransactionTable from './TransactionTable';

interface IOverviewProps {
  inputs: UserProps;
  isLoading: boolean;
  handleOnChange: (input: string, value: any) => void;
  handleUpdateProfile: () => void;
}

const Overview: React.FC<IOverviewProps> = ({ inputs }) => {
  const ACCOUNT = [
    {
      name: 'Wallet address',
      value: inputs.address,
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
      <TransactionTable />
    </div>
  );
};

export default Overview;