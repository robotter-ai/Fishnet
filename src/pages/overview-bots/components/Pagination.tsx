import React from 'react';
import classNames from 'classnames';
import { ArrowLeftIcon, ArrowRightIcon } from '@assets/icons';
import { useSearchParams } from 'react-router-dom';

const Pagination: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const getParams = searchParams.get('page') || 1;

  return (
    <div className="flex justify-between items-center bg-blue-100 text-blue-200 w-full h-full rounded-[76px] px-2">
      <span className='flex justify-center items-center cursor-pointer w-6 h-6 rounded-full transition-colors hover:bg-blue-200/40 hover:text-white'>
        <ArrowLeftIcon />
      </span>
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className={classNames(
            'flex gap-x-1 justify-center w-[3.375rem] h-full border border-transparent text-blue-200 text-xs cursor-pointer items-center px-3',
            {
              '!text-blue !bg-white !rounded-[30px] !border !border-blue':
                +getParams === index + 1,
            }
          )}
          onClick={() => {
            searchParams.set('page', `${index + 1}`);
            setSearchParams(searchParams);
          }}
        >
          <span>{index + 1}</span>
        </div>
      ))}
      <span>...</span>
      <span className='flex justify-center items-center cursor-pointer w-6 h-6 rounded-full transition-colors hover:bg-blue-200/40 hover:text-white'>
        <ArrowRightIcon />
      </span>
    </div>
  );
};

export default Pagination;
