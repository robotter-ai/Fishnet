import { IoCopyOutline } from 'react-icons/io5';
import classNames from 'classnames';
import { ReactComponent as EditIcon } from '@assets/icons/edit-pencil.svg';

const DataSummary = () => {
  const summary = [
    {
      name: 'Data name',
      value: (
        <div className="flex items-center gap-[11px]">
          <p>Mydataset.csv</p>
          <EditIcon />
        </div>
      ),
    },
    {
      name: 'Hash',
      value: (
        <div className="flex items-center gap-[11px]">
          <p>8743b52063cd84097a65d1633f5c74f552063ccd97a65</p>
          <IoCopyOutline size={20} />
        </div>
      ),
    },
    {
      name: 'Owner',
      value: <p className="text-blue">Profile &lt;Name&gt;</p>,
    },
    {
      name: 'Creation date',
      value: <p>19/01/2023</p>,
    },
    {
      name: 'Usages',
      value: <p>214</p>,
    },
    {
      name: 'Description',
      value: (
        <div className="flex gap-[11px]">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <div>
            <EditIcon />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-[#FAFAFA] rounded-[10px]">
      <h1 className="p-4 px-6">Summary</h1>
      {summary.map((item, i) => (
        <div
          key={i}
          className={classNames('flex justify-between gap-5 py-2 px-6', {
            'bg-[#E6EEFF]': (i + 1) % 2 !== 0,
          })}
        >
          <p>{item.name}:</p>
          {item.value}
        </div>
      ))}
    </div>
  );
};

export default DataSummary;
