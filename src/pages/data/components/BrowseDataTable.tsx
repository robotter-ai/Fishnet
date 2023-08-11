import { FreeTagIcon, PriceTagIcon } from '@assets/icons';
import CustomButton from '@components/ui/Button';
import CustomTable, { ITableColumns } from '@components/ui/CustomTable';
import PriceButton from '@components/ui/PriceButton';
import ClickToCopy from '@shared/components/ClickToCopy';
import useAuth from '@shared/hooks/useAuth';
import useTransaction from '@shared/hooks/useTransaction';
import { Link } from 'react-router-dom';

// const { setRecipientAddress } = useTransaction()
const COLUMNS = (address: string): ITableColumns[] => [
  {
    header: 'NAME',
    cell: (item) => (
      <div className="min-w-[210px]">
        <Link
          to={`/data/${item.item_hash}/details`}
          className="text-blue whitespace-nowrap"
        >
          {item.name}
        </Link>
      </div>
    ),
    sortWith: 'name',
  },
  {
    header: 'DESCRIPTION',
    cell: (item) => <p className="w-[190px] line-clamp-3">{item.desc}</p>,
    sortWith: 'desc',
  },
  {
    header: 'SELLER',
    cell: (item) => (
      <div className="w-[150px] flex gap-3">
        <p className="truncate w-[100px]">{item.owner}</p>
        <div className="h-9 w-9 flex items-center justify-center bg-[#E6FAFF] rounded-full">
          <ClickToCopy text={item.owner} />
        </div>
      </div>
    ),
    sortWith: 'owner',
  },
  {
    header: 'DLS',
    cell: (item) => (
      <div className="flex w-[100px] gap-3">{item?.forgotten}</div>
    ),
    sortWith: '',
  },
  {
    header: 'PRICE',
    cell: ({ available, price }) =>
      available ? (
        <div className="flex gap-3 items-center">
          <div className="h-[30px] w-[30px] flex items-center justify-center bg-{#E6FAFF} rounded-full">
            <FreeTagIcon />
          </div>
          <p className="w-[120px]">Free</p>
        </div>
      ) : (
        // make this a component so you can pass use the transaction hook that you wrote in it
        <PriceButton price={price} />
      ),
    sortWith: 'price',
  },
  {
    header: '',
    cell: ({ available, item_hash, permission_status }) =>
      // eslint-disable-next-line no-nested-ternary
      available ? (
        <div className="w-auto flex items-end justify-end">
          <CustomButton
            text="Download"
            btnStyle="outline-blue"
            size="sm"
            fullWidth
          />
        </div>
      ) : available && permission_status === 'NOT GRANTED' ? (
        <div className="w-auto flex items-end justify-end">
          <CustomButton
            text="Request Access"
            size="sm"
            btnStyle="outline-blue"
            fullWidth
          />
        </div>
      ) : (
        <div className="w-auto flex items-end justify-end">
          <CustomButton
            text="Request Access"
            size="sm"
            fullWidth
            btnStyle="solid-blue"
            linkTo={`/data/${item_hash}/details`}
          />
        </div>
      ),
  },
];

const BrowseDataTable = ({
  data,
  isLoading,
}: {
  data: Record<string, any>[];
  isLoading: boolean;
}) => {
  const auth = useAuth();
  return (
    <CustomTable
      data={data}
      columns={COLUMNS(auth?.address)}
      isLoading={isLoading}
    />
  );
};

export default BrowseDataTable;
