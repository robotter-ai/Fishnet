import { UserProps } from '@slices/profileSlice/profileService';
import DataSummary from '@shared/components/Summary';
import TransactionTable from './TransactionTable';

interface IOverviewProps {
  inputs: UserProps;
  isLoading: boolean;
  handleOnChange: (input: string, value: any) => void;
  handleUpdateProfile: () => void;
}

const ACCOUNT = [
  {
    name: 'Wallet address',
    value: '0xe5...48sx',
  },
  {
    name: 'Username',
    value: 'MikeMilkyway',
  },
  {
    name: 'Emal',
    value: 'mikemilkyway@gmail.com',
  },
  {
    name: 'Link',
    value: 'Fishnet.tech',
  },
  {
    name: 'Total downloads',
    value: 2158,
  },
  {
    name: 'Description',
    value: '',
  },
];

const Overview: React.FC<IOverviewProps> = () => {
  return (
    <div className="grid grid-cols-2 gap-5 mt-8">
      <DataSummary title="Your account" summary={ACCOUNT} />
      <TransactionTable />
    </div>
  );
};

export default Overview;
