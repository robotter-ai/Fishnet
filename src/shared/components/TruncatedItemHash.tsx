import ClickToCopy from '@shared/components/ClickToCopy';
import classNames from 'classnames';
import React from "react";

interface ITruncatedItemHash {
  hash: string;
  color?: 'primary';
  copy?: boolean;
  link?: boolean;
  type?: string;
}

const TruncatedItemHash: React.FC<ITruncatedItemHash> = ({
  hash,
  copy,
  color,
  link,
}) => {
  const getTruncatedItemHash = () => {
    if (!hash) return '';
    const hashArray = hash.split('');
    const firstHalf = hashArray.slice(0, 4);
    const secondHalf = hashArray.slice(-4);
    return `${firstHalf.join('')}...${secondHalf.join('')}`;
  };

  const url = `https://explorer.aleph.im/address/SOL/fishbsxxtW2iRwBgihKZEWGv4EMZ47G6ypx3P22Nhqx/message/POST/${hash}`;

  return (
    <div className="flex gap-2 items-center">
      <p
        className={classNames({
          'text-primary': color === 'primary',
        })}
      >
        <a className="text-primary hover:underline" href={url} target="_blank" rel="noreferrer">
          {getTruncatedItemHash()}
        </a>
      </p>
      {copy ? <ClickToCopy text={hash} /> : null}
    </div>
  );
};

export default TruncatedItemHash;
