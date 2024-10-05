import { ITabs } from '../hooks/useProfile';
import { IHeaderProps } from './Header';
import classNames from 'classnames';
import React from 'react';

interface ISwitcherProps extends IHeaderProps {
  keyQuery: string;
  isHeader?: boolean;
}

const Switcher: React.FC<ISwitcherProps> = ({
  keyQuery,
  tabs,
  query,
  searchParams,
  isHeader,
  setSearchParams,
}) => {
  const handleOnClick = (item: ITabs) => {
    searchParams.set(keyQuery, item.key);
    setSearchParams(searchParams);
  };

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
          onClick={() => handleOnClick(item)}
        >
          {item.icon && <span>{item.icon}</span>}{' '}
          <span className={isHeader ? 'hidden md:flex' : ''}>{item.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Switcher;
