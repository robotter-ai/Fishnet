import React from 'react';
import classNames from 'classnames';
import { IHeaderProps } from './Header';

interface ICustomTabsProps extends IHeaderProps {
  isTab: boolean;
}

const CustomTabs: React.FC<ICustomTabsProps> = ({
  isTab,
  tabs,
  query,
  searchParams,
  setSearchParams,
}) => {
  return (
    <div className="flex justify-between bg-blue-100 items-center w-full h-full rounded-[76px]">
      {tabs.map((item, i) => (
        <div
          key={i}
          className={classNames(
            'flex gap-x-1 justify-center w-full h-full border border-transparent text-blue-200 text-xs cursor-pointer items-center px-3',
            {
              '!text-blue !bg-white !rounded-[30px] !border !border-blue':
                item.key === query,
            }
          )}
          onClick={() => {
            searchParams.set(isTab ? 'tab' : 'time', item.key);
            setSearchParams(searchParams);
          }}
        >
          {item.icon && <span>{item.icon}</span>} <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
};

export default CustomTabs;