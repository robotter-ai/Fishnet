import { CopyIcon } from '@assets/icons';
import React, { useState } from 'react';
import { MdCheck } from 'react-icons/md';

interface ClickToCopyProps {
  text: string;
  color?: '#1DC3CF' | '#566164';
}

const ClickToCopy: React.FC<ClickToCopyProps> = ({
  text,
  color = '#1DC3CF',
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyText = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(text);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <div
      role="button"
      className="w-fit bg-primary/10 p-2 flex rounded-full"
      onClick={handleCopyText}
    >
      {isCopied ? (
        <MdCheck color={color} size={20} />
      ) : (
        <CopyIcon color={color} />
      )}
    </div>
  );
};

export default ClickToCopy;
