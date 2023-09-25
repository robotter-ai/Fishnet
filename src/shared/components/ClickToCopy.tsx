import { CopyIcon } from '@assets/icons';
import { toast } from 'sonner';

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
    toast.success('Copied!');
  };

  return (
    <div
      role="button"
      className="w-fit bg-primary/10 p-2 rounded-full"
      onClick={handleCopyText}
    >
      <CopyIcon color={color} />
    </div>
  );
};

export default ClickToCopy;
