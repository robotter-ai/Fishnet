import { FreeTagIcon } from '@assets/icons';
import CustomButton from '@components/ui/Button';
import CustomTable, { ITableColumns } from '@components/ui/CustomTable';
import PriceButton from '@components/ui/PriceButton';
import TruncatedAddress from '@shared/components/TruncatedAddress';
import { Link } from 'react-router-dom';

const COLUMNS: ITableColumns[] = [
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
    header: 'SELLERS WALLET',
    cell: (item) => <TruncatedAddress hash={item.owner} withCopy />,
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
    cell: ({ available, item_hash, permission_status }) => (
      <div className="w-auto flex items-end justify-end">
        {/* eslint-disable-next-line no-nested-ternary */}
        {available ? (
          <CustomButton
            text="Download"
            btnStyle="outline-blue"
            size="sm"
            icon="download"
          />
        ) : available && permission_status === 'NOT GRANTED' ? (
          <CustomButton
            text="Request"
            size="sm"
            icon="lock"
            btnStyle="outline-blue"
          />
        ) : (
          <CustomButton
            text="Buy"
            size="sm"
            icon="buy"
            btnStyle="solid-blue"
            href={`/data/${item_hash}/details`}
          />
        )}
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
  return <CustomTable data={data} columns={COLUMNS} isLoading={isLoading} />;
};

export default BrowseDataTable;
