import { IoCopyOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';

interface ClickToCopyProps {
  text: string;
  color?: '#29324A' | '#0458FF';
}

const ClickToCopy: React.FC<ClickToCopyProps> = ({
  text,
  color = '#29324A',
}) => {
  const handleCopyText = () => {
    navigator.clipboard.writeText(text);
    toast.success('Copied!', {
      position: 'top-center',
      hideProgressBar: true,
      autoClose: 1000,
    });
  };

  return (
    <div role="button" className="w-fit" onClick={handleCopyText}>
      <IoCopyOutline size={20} color={color} />
    </div>
  );
};

export default ClickToCopy;
