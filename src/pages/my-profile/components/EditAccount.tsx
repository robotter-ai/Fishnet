import TextInput from '@components/form/TextInput';
import CustomButton from '@components/ui/Button';
import { IUserInfo } from '@store/profile/types';
import useOnChange from '@shared/hooks/useOnChange';
import { toast } from 'sonner';
import { useUpdateUserInfoMutation } from '@store/profile/api';
import TransactionTable from './TransactionTable';
import { useAuth } from '@contexts/auth-provider';

interface IEditAccountProps {
  user: IUserInfo;
  transactions: any;
}

const EditAccount: React.FC<IEditAccountProps> = ({ user, transactions }) => {
  const session = useAuth();
  const [updateUserInfo, { isLoading }] = useUpdateUserInfoMutation();

  const { inputs, handleOnChange } = useOnChange({
    username: user?.username || '',
    bio: user?.bio || '',
    email: user?.email || '',
    link: user?.link || '',
    downloads: user?.downloads || 0,
  });

  const handleUpdateProfile = () => {
    updateUserInfo({ ...inputs, address: session?.address })
      .unwrap()
      .then(() => toast.success('Profile updated successfully'));
  };

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
          size="md"
          icon="box"
          onClick={handleUpdateProfile}
          isLoading={isLoading}
          fullWidth
        />
      </div>
      <TransactionTable address={session?.address} data={transactions} />
    </div>
  );
};

export default EditAccount;
