import ClickToCopy from '@shared/components/ClickToCopy';

interface IAddressWrap {
  hash: string;
  withoutCopy?: boolean;
}

const AddressWrap: React.FC<IAddressWrap> = ({ hash, withoutCopy }) => {
  return (
    <div className="flex gap-3 items-center">
      <p className="w-[100px] truncate">{hash}</p>
      {withoutCopy ? <ClickToCopy text={hash} /> : null}
    </div>
  );
};

export default AddressWrap;
