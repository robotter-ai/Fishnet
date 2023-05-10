import TextInput from '@components/form/TextInput';
import CustomButton from '@components/ui/Button';
import ClickToCopy from '@shared/components/ClickToCopy';
import useAuth from '@shared/hooks/useAuth';
import { UserProps } from '@slices/profileSlice/profileService';
import { VscAdd, VscArrowRight, VscChromeMinimize } from 'react-icons/vsc';

interface IAccountProps {
  inputs: UserProps;
  isLoading: boolean;
  handleOnChange: (input: string, value: any) => void;
  handleUpdateProfile: () => void;
}

const Account: React.FC<IAccountProps> = ({
  inputs,
  isLoading,
  handleOnChange,
  handleUpdateProfile,
}) => {
  const auth = useAuth();
  const actions = [
    { icon: <VscAdd /> },
    { icon: <VscChromeMinimize /> },
    { icon: <VscArrowRight /> },
  ];

  return (
    <div className="flex gap-3 mt-9">
      <div className="flex flex-col gap-6 w-3/4 bg-[#FAFAFA] rounded-lg p-8">
        <TextInput
          label="Public account name"
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
      <div className="w-full flex flex-col justify-center items-center gap-6">
        <div className="text-center">
          <h1>13 550</h1>
          <p>Tickets</p>
        </div>
        <div className="flex gap-8 items-center">
          {actions.map((item, i) => (
            <div key={i} className="p-2 w-fit shadow-md rounded-lg">
              {item.icon}
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center gap-2">
          <p>{auth?.address}</p>
          <ClickToCopy text={auth?.address} color="#0458FF" />
        </div>
        <button type="button" className="mt-4 text-[#FD686A] text-lg">
          Log out
        </button>
      </div>
    </div>
  );
};

export default Account;
