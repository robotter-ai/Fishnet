import { TiArrowUnsorted } from 'react-icons/ti';
import { MdDeleteOutline } from 'react-icons/md';
import { ReactComponent as EditIcon } from '@assets/icons/edit-pencil.svg';
import { CheckBox } from '@components/form';
import { LineChart, Line, XAxis, YAxis, AreaChart, Area } from 'recharts';
import CustomTable, { ITableColumns } from '@components/ui/CustomTable';

// const data = [
//   {
//     name: 'Page A',
//     uv: 40,
//   },
//   {
//     name: 'Page B',
//     uv: 3000,
//   },
//   {
//     name: 'Page C',
//     uv: 2000,
//   },
// ];

const COLUMNS: ITableColumns[] = [
  {
    header: 'Indicator',
    cell: (item) => (
      <div className="flex gap-3">
        {item.name}
        <EditIcon color="#0054ff" className="cursor-pointer" />
      </div>
    ),
    sortWith: 'name',
  },
  {
    header: 'Chart',
    cell: ({ data }) => {
      const dataToUse = data
        .map((item: any[]) => ({ date: item[0], value: item[1] }))
        .slice(0, 10);
      return (
        <AreaChart width={100} height={50} data={dataToUse}>
          <Area
            type="monotone"
            dataKey="value"
            stroke="#0054ff"
            fillOpacity={1}
            fill="url(#colorValue)"
          />
          <XAxis dataKey="date" hide />
          <YAxis hide />
        </AreaChart>
      );
    },
  },
  {
    header: 'Values',
    cell: ({ data }) => {
      const dataToUse = data.map((item: any[]) => item[1]);
      return (
        <div>
          {Math.min(...dataToUse).toFixed(1)} :{' '}
          {Math.max(...dataToUse).toFixed(1)}
        </div>
      );
    },
  },
  {
    header: 'Time interval',
    cell: (item) => '',
  },
  {
    header: '',
    cell: (item) => (
      <div className="cursor-pointer">
        {/* <MdDeleteOutline size={24} color="#172025" /> */}
        {/* <CheckBox /> */}
      </div>
    ),
  },
];

const EditDataTable = ({
  data,
  isPublished,
}: {
  data: any[];
  isPublished: any;
}) => {
  return (
    <CustomTable
      data={data}
      columns={COLUMNS}
      // isLoading={isLoading}
    />
  );
};

export default EditDataTable;
