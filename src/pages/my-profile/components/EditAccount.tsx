import TextInput from '@components/form/TextInput';
import CustomButton from '@components/ui/Button';
import { UserProps } from '@slices/profileSlice/profileService';
import TransactionTable from './TransactionTable';

interface IEditAccountProps {
  inputs: UserProps;
  transactions: any;
  address: any;
  isLoading: boolean;
  handleOnChange: (input: string, value: any) => void;
  handleUpdateProfile: () => void;
}

const EditAccount: React.FC<IEditAccountProps> = ({
  inputs,
  isLoading,
  transactions,
  address,
  handleOnChange,
  handleUpdateProfile,
}) => {
  return (
    <div className="grid grid-cols-2 gap-5 mt-8">
      <div className="flex flex-col gap-6 w-3/4 bg-[#FAFAFA] rounded-lg p-8">
        <TextInput
          label="Username"
          placeholder="Your name for other users?"
          value={inputs.username}
          onChange={(e) => handleOnChange('username', e.target.value)}
          fullWidth
        />
        <TextInput
          label="Email"
          type="email"
          placeholder="Email address (optional)"
          value={inputs.email}
          onChange={(e) => handleOnChange('email', e.target.value)}
          fullWidth
        />
        <TextInput
          label="Link"
          placeholder="Social media (optional)"
          value={inputs.link}
          onChange={(e) => handleOnChange('link', e.target.value)}
          fullWidth
        />
        <TextInput
          label="Description"
          placeholder="Description (optional)"
          value={inputs.bio}
          onChange={(e) => handleOnChange('bio', e.target.value)}
          fullWidth
        />
        <CustomButton
          text="Save"
          size="lg"
          onClick={handleUpdateProfile}
          isLoading={isLoading}
          fullWidth
        />
      </div>
      <TransactionTable address={address} data={transactions} />
    </div>
  );
};

export default EditAccount;
