import { ReactNode, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import classNames from 'classnames';
import Button from '@components/ui/Button';
import AppModal from '@components/ui/AppModal';
import useModal from '@shared/hooks/useModal';
import { SearchInput } from '@components/form';
import { FileUploader } from 'react-drag-drop-files';
import { FadeLoader } from 'react-spinners';
import BrowseDataTable from './components/BrowseDataTable';
import PublishedTable from './components/PublishedTable';
import useDataTable from './hooks/useDataTable';

const MyData = () => {
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const {
    data,
    handleCsvToJson,
    isLoading,
    isLoadingUploadTimeseries,
    filterParams,
    handleFilterTable,
    publishedDatasets,
  } = useDataTable();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isOpen, handleOpen, handleClose } = useModal();

  const tabs = [
    { key: 'browse-data', name: 'Browse data' },
    { key: 'published', name: 'Published' },
  ];
  const TableMapper: { [key: string]: ReactNode } = {
    published: (
      <PublishedTable data={data} isLoading={publishedDatasets.isLoading} />
    ),
    'browse-data': <BrowseDataTable data={data} isLoading={isLoading} />,
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
                  '!text-dark-50 !border-blue': item.key === query,
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
          <Button size="md" onClick={handleOpen}>
            <div className="flex gap-3 items-center">
              <MdAdd size={15} />
              <span>Upload data</span>
            </div>
          </Button>
        </div>
      </div>
      {TableComponent}
      <AppModal
        title={
          isLoadingUploadTimeseries ? 'Uploading...' : 'Select file (.csv)'
        }
        isOpen={isOpen}
        handleClose={handleClose}
        withInfo
      >
        <p className="my-[20px]">
          The data remains on your computer until you publish it. At this stage,
          the data is not published
        </p>

        <input
          type="file"
          accept=".csv"
          ref={inputFileRef}
          style={{ display: 'none' }}
          onChange={(e) => handleCsvToJson(e.target.files![0])}
          disabled={isLoadingUploadTimeseries}
        />
        <FileUploader
          name="file"
          types={['CSV']}
          handleChange={(file: any) => handleCsvToJson(file)}
        >
          <div className="flex justify-center items-center h-[207px] bg-light-20 rounded-[10px]">
            {isLoadingUploadTimeseries ? (
              <FadeLoader color="#0054ff" height={10} margin={-5} width={3} />
            ) : (
              <p className="text-blue text-2xl">Drag and Drop</p>
            )}
          </div>
        </FileUploader>
        <div className="flex flex-col mt-[20px] gap-4">
          <Button
            size="lg"
            fullWidth
            onClick={() => inputFileRef.current?.click()}
            disabled={isLoadingUploadTimeseries}
          >
            <div className="flex justify-center gap-3 items-center">
              <MdAdd size={15} />
              <span>Choose data</span>
            </div>
          </Button>
        </div>
      </AppModal>
    </div>
  );
};

export default MyData;
