import ClickToCopy from '@shared/components/ClickToCopy';
import classNames from 'classnames';
import React from "react";

enum Type {
  Solana = 'solana',
  Ethereum = 'ethereum'
}

interface ITruncatedAddress {
  address: string;
  color?: 'primary';
  copy?: boolean;
  link?: boolean;
}

const TruncatedAddress: React.FC<ITruncatedAddress> = ({
  address,
  copy,
  color,
}) => {
  const getTruncatedAddress = () => {
    if (!address) return '';
    const hashArray = address.split('');
    const firstHalf = hashArray.slice(0, 4);
    const secondHalf = hashArray.slice(-4);
    return `${firstHalf.join('')}...${secondHalf.join('')}`;
  };

  let url = '';
  if(!!address) {
    if (address.startsWith('0x')) {
      url = `https://etherscan.io/address/${address}`;
    } else {
      url = `https://solana.fm/address/${address}`;
    }
  }

  return (
    <div className="flex gap-2 items-center">
      <p
        className={classNames({
          'text-primary': color === 'primary',
        })}
      >
        <a className="text-primary hover:underline" href={url} target="_blank" rel="noreferrer">
          {getTruncatedAddress()}
        </a>
      </p>
      {copy ? <ClickToCopy text={address} /> : null}
    </div>
  );
};

export default TruncatedAddress;
