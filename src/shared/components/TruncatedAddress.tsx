import ClickToCopy from '@shared/components/ClickToCopy';
import classNames from 'classnames';

interface ITruncatedAddress {
  hash: string;
  color?: 'primary';
  withCopy?: boolean;
}

const TruncatedAddress: React.FC<ITruncatedAddress> = ({
  hash,
  withCopy,
  color,
}) => {
  const getTruncatedAddress = () => {
    if (!hash) return '';
    const hashArray = hash.split('');
    const firstHalf = hashArray.slice(0, 4);
    const secondHalf = hashArray.slice(-4);
    return `${firstHalf.join('')}...${secondHalf.join('')}`;
  };

  return (
    <div className="flex gap-3 items-center">
      <p
        className={classNames({
          'text-blue': color === 'primary',
        })}
      >
        {getTruncatedAddress()}
      </p>
      {withCopy ? <ClickToCopy text={hash} /> : null}
    </div>
  );
};

export default TruncatedAddress;