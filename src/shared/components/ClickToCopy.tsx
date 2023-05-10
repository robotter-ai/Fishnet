import { toast } from 'react-toastify';
import { CopyIcon } from '@assets/icons';

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
      <CopyIcon color={color} />
    </div>
  );
};

export default ClickToCopy;
