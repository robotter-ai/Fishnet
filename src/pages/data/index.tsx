import { SearchInput } from '@components/form';
import AppModal from '@components/ui/AppModal';
import Button from '@components/ui/Button';
import useModal from '@shared/hooks/useModal';
import classNames from 'classnames';
import { ReactNode, useRef } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { useSearchParams } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
import { useAuth } from '@contexts/auth-provider';
import BrowseDataTable from './components/BrowseDataTable';
import PublishedTable from './components/PublishedTable';
import useDataTable from './hooks/useDataTable';

const MyData = () => {
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const {
    tabs,
    data,
    handleCsvToJson,
    filterParams,
    handleFilterTable,
    isLoadingBrowseData,
    isLoadingPublishedData,
    isLoadingPreprocessTimeseries,
  } = useDataTable();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isOpen, handleOpen, handleClose } = useModal();
  const { address } = useAuth();

  const TableMapper: { [key: string]: ReactNode } = {
    published: (
      <PublishedTable data={data} isLoading={isLoadingPublishedData} />
    ),
    'browse-data': (
      <BrowseDataTable data={data} isLoading={isLoadingBrowseData} />
    ),
  };
  const query: null | string = searchParams.get('tab') || 'browse-data';
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
                  '!text-dark-50 !border-primary': item.key === query,
                }
              )}
              onClick={() => {
                searchParams.set('tab', item.key);
                setSearchParams(searchParams);
              }}
            >
              {item.name}
            </div>
          ))}
        </div>
        <div className="flex gap-4 items-center">
          <SearchInput
            value={filterParams.value}
            onChange={(value) => handleFilterTable(value)}
          />
          <Button
            size="md"
            text="Upload data"
            icon="upload"
            disabled={address === ''}
            onClick={handleOpen}
          />
        </div>
      </div>
      {TableComponent}
      <AppModal
        title={
          isLoadingPreprocessTimeseries ? 'Uploading...' : 'Select file (.csv)'
        }
        isOpen={isOpen}
        handleClose={handleClose}
      >
        <p className="my-[20px] text-sm leading-5">
          The data remains on your computer until you publish it. At this stage,
          the data is not published
        </p>

        <input
          type="file"
          accept=".csv"
          ref={inputFileRef}
          style={{ display: 'none' }}
          onChange={(e) => handleCsvToJson(e.target.files![0])}
          disabled={isLoadingPreprocessTimeseries}
        />
        <FileUploader
          name="file"
          types={['CSV']}
          handleChange={(file: File) => handleCsvToJson(file)}
        >
          <div className="flex justify-center items-center h-[207px] bg-light-20 my-8 rounded-[32px]">
            {isLoadingPreprocessTimeseries ? (
              <FadeLoader color="#1DC3CF" height={10} margin={-5} width={3} />
            ) : (
              <p className="text-primary text-2xl">Drag and Drop</p>
            )}
          </div>
        </FileUploader>
        <div className="flex flex-col mt-[20px] gap-4">
          <Button
            size="lg"
            fullWidth
            text="Choose data"
            icon="attach"
            onClick={() => inputFileRef.current?.click()}
            disabled={isLoadingPreprocessTimeseries}
          />
        </div>
      </AppModal>
    </div>
  );
};

export default MyData;
