import { FreeTagIcon } from '@assets/icons';
import CustomButton from '@components/ui/Button';
import CustomTable, { ITableColumns } from '@components/ui/CustomTable';
import PriceButton from '@components/ui/PriceButton';
import ClickToCopy from '@shared/components/ClickToCopy';
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
    cell: (item) => <p className="w-[210px] line-clamp-3">{item.desc}</p>,
    sortWith: 'desc',
  },
  {
    header: 'HASH',
    cell: (item) => (
      <div className="w-[100px] flex justify-between gap-3 mr-10 items-center">
        <p className="truncate w-[60px]">{item.item_hash}</p>
        <div className=" h-9 w-9 flex items-center justify-center bg-[#E6FAFF] rounded-full">
          <ClickToCopy text={item.item_hash} />
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
    cell: ({ available, timestamp }) =>
      // TIMESTAMP WAS USED BELOW SINCE IT'S A NUMBER AND THE ENDPOINT FOR MONETIZATION IS YET TO BE PROVIDED
      available ? (
        <PriceButton paymentTrigger price={timestamp} />
      ) : (
        // TEMPORARILY SWITCHED THIS TO TEST THE PAYMENT MODAL, THE CODE BELOW SHOULD BE THE FIRST CONDITION IN THE TERNARY
        <div className="flex gap-3 items-center">
          <div className="h-[30px] w-[30px] flex items-center justify-center bg-{#E6FAFF} rounded-full">
            <FreeTagIcon />
          </div>
          <p className="w-[120px]">Free</p>
        </div>
      ),
    sortWith: 'price',
  },
  {
    header: '     ',
    cell: () => (
      <div className="w-auto flex items-end justify-end">
        <CustomButton btnStyle="outline-blue" size="sm" fullWidth>
          Download
        </CustomButton>
      </div>
    ),
  },
];
const PublishedTable = ({
  data,
  isLoading,
}: {
  data: Record<string, any>[];
  isLoading: boolean;
}) => {
  return <CustomTable data={data} columns={COLUMNS} isLoading={isLoading} />;
};

export default PublishedTable;
