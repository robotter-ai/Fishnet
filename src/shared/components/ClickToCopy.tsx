import { CopyIcon } from '@assets/icons';
import { toast } from 'react-toastify';

interface ClickToCopyProps {
  text: string;
  color?: '#1DC3CF' | '#566164';
}

const ClickToCopy: React.FC<ClickToCopyProps> = ({
  text,
  color = '#1DC3CF',
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
