import TextInput from '@components/form/TextInput';
import CustomButton from '@components/ui/Button';
import ClickToCopy from '@components/ui/ClickToCopy';
import { useAppSelector } from '@shared/hooks/useStore';
import { VscAdd, VscArrowRight, VscChromeMinimize } from 'react-icons/vsc';

const Account = () => {
  const { address } = useAppSelector((state) => state.user);
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
          fullWidth
        />
        <TextInput
          label="Email"
          placeholder="Email address (optional)"
          fullWidth
        />
        <TextInput
          label="Link"
          placeholder="Social media (optional)"
          fullWidth
        />
        <TextInput
          label="Description"
          placeholder="Description (optional)"
          fullWidth
        />
        <CustomButton text="Save" size="lg" fullWidth />
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
          <p>{address}</p>
          <ClickToCopy text={address} color="#0458FF" />
        </div>
        <button type="button" className="mt-4 text-[#FD686A] text-lg">
          Log out
        </button>
      </div>
    </div>
  );
};

export default Account;
