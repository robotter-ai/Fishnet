import { SearchInput } from '@components/form';
import AppModal from '@components/ui/AppModal';
import Button from '@components/ui/Button';
import useModal from '@shared/hooks/useModal';
import classNames from 'classnames';
import { ReactNode } from 'react';
import IncomingTable from './components/IncomingTable';
import PublishedTable from './components/PublishedTable';
import useMonitorAccessTable, { ITab } from './hooks/useMonitorAccessTable';
import BoughtDataTable from './components/BoughtDataTable';
import SoldDataTable from './components/SoldDataTable';

const MonitorAccess = () => {
  const { tabs, query, setSearchParams } = useMonitorAccessTable();
  const { isOpen, handleClose } = useModal();

  const TableMapper: Record<ITab, ReactNode> = {
    published: <PublishedTable />,
    bought: <BoughtDataTable />,
    sold: <SoldDataTable />,
    incoming: <IncomingTable />,
  };

  const TableComponent = TableMapper[query];

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
                  '!text-dark-50 !border-primary': item.key === query,
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
