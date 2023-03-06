import { useSearchParams } from 'react-router-dom';
import {
  BrowseAlgorithmsTable,
  ExecutionHistoryTable,
  PublishedTable,
  useAlgorithmsTable,
} from '@features/algorithms';
import classNames from 'classnames';
import { SearchInput } from '@components/form';
import { MdAdd } from 'react-icons/md';
import Button from '@components/ui/Button';
import AppModal from '@components/ui/AppModal';
import useModal from '@shared/hooks/useModal';
import TextInput from '@components/form/TextInput';
import DataSummary from '@shared/components/Summary';
import ClickToCopy from '@components/ui/ClickToCopy';
import dayjs from 'dayjs';

const Algorithms = () => {
  const { isSelectAlgorithm } = useAlgorithmsTable();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isOpen, handleOpen, handleClose } = useModal();

  const tabs = () => {
    if (isSelectAlgorithm) {
      return [
        { key: 'published', name: 'Published' },
        { key: 'browse-algorithms', name: 'Browse algorithms' },
      ];
    }
    return [
      { key: 'published', name: 'Published' },
      { key: 'browse-algorithms', name: 'Browse algorithms' },
      { key: 'execution-history', name: 'Execution history' },
    ];
  };
  const TableMapper: { [key: string]: React.ReactNode } = {
    published: <PublishedTable isSelectAlgorithm={isSelectAlgorithm} />,
    'browse-algorithms': (
      <BrowseAlgorithmsTable isSelectAlgorithm={isSelectAlgorithm} />
    ),
    'execution-history': <ExecutionHistoryTable />,
  };
  const query: null | string = searchParams.get('tab') || 'published';
  const TableComponent = TableMapper?.[query];

  const summary = [
    {
      name: 'Hash',
      value: (
        <div className="flex items-center gap-[11px]">
          <p className="w-[200px] truncate">Hash</p>
          <ClickToCopy text="hash" />
        </div>
      ),
    },
    {
      name: 'Owner',
      value: <p className="text-blue">Owner</p>,
    },
    {
      name: 'Creation date',
      value: <p>{dayjs(new Date()).format('DD/MM/YYYY')}</p>,
    },
    {
      name: 'Usages',
      value: 0,
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <div className="flex gap-4">
          {tabs().map((item, i) => (
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
          <SearchInput />
          {!isSelectAlgorithm &&
          searchParams.get('tab') !== 'execution-history' ? (
            <Button size="md" onClick={handleOpen}>
              <div className="flex gap-3 items-center">
                <MdAdd size={20} />
                <span>Upload algorithm</span>
              </div>
            </Button>
          ) : null}
        </div>
      </div>
      {TableComponent}
      <AppModal
        title="Online Editer"
        isOpen={isOpen}
        handleClose={handleClose}
        fullWidth
      >
        <div>
          <div className="grid grid-cols-2 gap-5">
            <div className="bg-[#FAFAFA] flex flex-col gap-4 p-6 rounded-[10px]">
              <TextInput
                label="Algorithm name"
                placeholder="Name the algorithm"
                // onChange={(e) => handleOnChange('algorithmName', e.target.value)}
                fullWidth
              />
              <TextInput
                label="Description"
                placeholder="What is the algorithm about?"
                // onChange={(e) => handleOnChange('desc', e.target.value)}
                fullWidth
              />
            </div>
            <DataSummary summary={summary} />
          </div>
          <div className="bg-[#f3f3f3] w-full h-40 rounded mt-4" />
        </div>
        <div className="flex justify-center mt-5">
          <Button text="Publish" size="lg" onClick={() => {}} />
        </div>
      </AppModal>
    </div>
  );
};

export default Algorithms;
