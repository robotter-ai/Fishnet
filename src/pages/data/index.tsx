import { ReactNode, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import classNames from 'classnames';
import Button from '@components/ui/Button';
import AppModal from '@components/ui/AppModal';
import useModal from '@shared/hooks/useModal';
import { BrowseDataTable, PublishedTable, useDataTable } from '@features/data';
import { SearchInput } from '@components/form';
import { FileUploader } from 'react-drag-drop-files';

const MyData = () => {
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const { data, handleCsvToJson, isLoading } = useDataTable();
  const [searchParam, setSearchParams] = useSearchParams();
  const { isOpen, handleOpen, handleClose } = useModal();

  const tabs = [
    { key: 'published', name: 'Published' },
    { key: 'browse-data', name: 'Browse data' },
  ];
  const TableMapper: { [key: string]: ReactNode } = {
    published: <PublishedTable data={data} isLoading={isLoading} />,
    'browse-data': <BrowseDataTable />,
  };
  const query: null | string = searchParam.get('tab') || 'published';
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
        <div className="flex gap-4 items-center">
          <SearchInput />
          <Button size="md" onClick={handleOpen}>
            <div className="flex gap-3 items-center">
              <MdAdd size={20} />
              <span>Upload data</span>
            </div>
          </Button>
        </div>
      </div>
      {TableComponent}
      <AppModal
        title="Select file (.csv)"
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
        />
        <FileUploader
          name="file"
          types={['CSV']}
          handleChange={(file: any) => handleCsvToJson(file)}
        >
          <div className="flex justify-center items-center h-[207px] bg-light-20 rounded-[10px]">
            <p className="text-blue text-2xl">Drag and Drop</p>
          </div>
        </FileUploader>
        <div className="flex flex-col mt-[20px] gap-4">
          <Button
            text="No, back"
            size="lg"
            fullWidth
            onClick={() => inputFileRef.current?.click()}
          >
            <div className="flex justify-center gap-3 items-center">
              <MdAdd size={20} />
              <span>Choose data</span>
            </div>
          </Button>
        </div>
      </AppModal>
    </div>
  );
};

export default MyData;
