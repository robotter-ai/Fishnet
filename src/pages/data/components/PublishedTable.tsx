import { FreeTagIcon } from '@assets/icons';
import CustomButton from '@components/ui/Button';
import CustomTable, { ITableColumns } from '@components/ui/CustomTable';
import PriceButton from '@components/ui/PriceButton';
import { Link, useNavigate } from 'react-router-dom';

const PublishedTable = ({
  data,
  isLoading,
}: {
  data: Record<string, any>[];
  isLoading: boolean;
}) => {
  const navigate = useNavigate();

  const COLUMNS: ITableColumns[] = [
    {
      header: 'NAME',
      cell: (item) => (
        <div className="min-w-[210px]">
          <Link
            to={`/data/${item.item_hash}`}
            className="text-primary whitespace-nowrap"
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
      header: 'DLS',
      cell: (item) => (
        <div className="flex w-[100px] gap-3">{item?.forgotten}</div>
      ),
      sortWith: '',
    },
    {
      header: 'PRICE',
      cell: ({ price }) =>
        price === '0' ? (
          <div className="flex gap-3 items-center">
            <div className="h-[30px] w-[30px] flex items-center justify-center bg-[#E6FAFF] rounded-full">
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
      header: '     ',
      cell: (item) => (
        <div className="w-auto flex items-end justify-end">
          <CustomButton
            text="Edit"
            icon="edit"
            btnStyle="outline-primary"
            size="sm"
            onClick={() => {
              navigate(`/data/${item.item_hash}`);
            }}
          />
        </div>
      ),
    },
  ];

  return <CustomTable data={data} columns={COLUMNS} isLoading={isLoading} />;
};

export default PublishedTable;
