import { SearchInput } from '@components/form';
import AppModal from '@components/ui/AppModal';
import Button from '@components/ui/Button';
import useModal from '@shared/hooks/useModal';
import classNames from 'classnames';
import { ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import IncomingTable from './components/IncomingTable';
import MyDataTable from './components/MyDataTable';
import OutgoingTable from './components/OutgoingTable';
import useMonitorAccessTable from './hooks/useMonitorAccessTable';

const MonitorAccess = () => {
  useMonitorAccessTable();
  const [searchParam, setSearchParams] = useSearchParams();
  const { isOpen, handleClose } = useModal();

  const tabs = [
    { key: 'my-data', name: 'My data' },
    { key: 'outgoing', name: 'Outgoing' },
    { key: 'incoming', name: 'Incoming' },
  ];

  const TableMapper: { [key: string]: ReactNode } = {
    'my-data': <MyDataTable />,
    outgoing: <OutgoingTable />,
    incoming: <IncomingTable />,
  };
  const query: null | string = searchParam.get('tab') || 'my-data';
  const TableComponent = TableMapper?.[query];

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <div className="flex gap-4">
          {tabs.map((item, i) => (
            <div
              key={i}
              className={classNames(
                'text-dark-20 border-b-2 border-transparent cursor-pointer',
                {
                  '!text-dark-50 !border-blue': item.key === query,
                }
              )}
              onClick={() => {
                setSearchParams({ tab: item.key });
              }}
            >
              {item.name}
            </div>
          ))}
        </div>
        <SearchInput value="" onChange={handleClose} />
      </div>
      {TableComponent}
      <AppModal
        title="Deleted file cannot be restored"
        isOpen={isOpen}
        handleClose={handleClose}
      >
        <div className="my-[20px]">
          <p>Are you sure?</p>
        </div>
        <div className="flex flex-col gap-4">
          <Button
            text="Yes, delete"
            btnStyle="outline-red"
            size="lg"
            fullWidth
          />
          <Button text="No, back" size="lg" fullWidth />
        </div>
      </AppModal>
    </div>
  );
};

export default MonitorAccess;
