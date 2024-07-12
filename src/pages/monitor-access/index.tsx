import { SearchInput } from '@components/form';
import classNames from 'classnames';
import { ReactNode } from 'react';
import { IMonitorAccessTab } from '@store/monitor-access/types';
import IncomingTable from './components/IncomingTable';
import PublishedTable from './components/PublishedTable';
import useMonitorAccessTable from './hooks/useMonitorAccessTable';
import BoughtDataTable from './components/BoughtDataTable';
import SoldDataTable from './components/SoldDataTable';

const MonitorAccess = () => {
  const { tabs, query, search, setSearchParams, onChangeSearch } =
    useMonitorAccessTable();

  const TableMapper: Record<IMonitorAccessTab, ReactNode> = {
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
        <SearchInput value={search} onChange={onChangeSearch} />
      </div>
      {TableComponent}
    </div>
  );
};

export default MonitorAccess;
