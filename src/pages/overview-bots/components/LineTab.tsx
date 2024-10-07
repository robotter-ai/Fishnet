import { SetURLSearchParams } from 'react-router-dom';
import { IDateTabs } from '../hooks/useProfile';
import classNames from 'classnames';
import React from 'react';

interface ILineTabProps {
  data: IDateTabs[];
  keyQuery: string;
  query: string;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}

const LineTab: React.FC<ILineTabProps> = ({
  keyQuery,
  data,
  query,
  searchParams,
  setSearchParams,
}) => {
  return (
    <div
      id="date_tabs"
      className="flex gap-x-6 border-b border-light-400 w-fit mt-5"
    >
      {data.map((item, i) => (
        <div
          key={i}
          className={classNames(
            'text-dark-20 cursor-pointer font-normal text-xs transition-colors duration-300 hover:text-dark',
            {
              '!text-blue-300 border-b !border-blue-300 pb-3':
                item.key === query,
            }
          )}
          onClick={() => {
            searchParams.set(keyQuery, item.key);
            setSearchParams(searchParams);
          }}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default LineTab;
