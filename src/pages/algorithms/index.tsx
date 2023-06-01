import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchInput } from '@components/form';
import { MdAdd } from 'react-icons/md';
import Button from '@components/ui/Button';
import AppModal from '@components/ui/AppModal';
import { PublishedModal } from '@shared/components/Prompts';
import ViewLoader from '@shared/components/ViewLoader';
import useAlgorithmsTable from './hooks/useAlgorithmsTable';
import PublishedTable from './components/PublishedTable';
import BrowseAlgorithmsTable from './components/BrowseAlgorithmsTable';
import ExecutionHistoryTable from './components/ExecutionHistoryTable';
import AlgorithmDetails from './components/AlgorithmDetails';

const Algorithms = () => {
  const {
    isSelectAlgorithm,
    algorithms,
    executions,
    isLoading,
    algorithmDetails,
    handleCloseAlgoDetails,
    handleClosePublished,
    handleOpenAlgoDetails,
    isOpenPublished,
    isLoadingUpload,
    isLoadingExecution,
    isLoadingGetAlgoByID,
    publishedAlgorithms,
  } = useAlgorithmsTable();
  const [searchParams, setSearchParams] = useSearchParams();

  const tabs = [
    { key: 'browse-algorithms', name: 'Browse algorithms' },
    { key: 'published', name: 'Published' },
    ...(!isSelectAlgorithm
      ? [{ key: 'execution-history', name: 'Execution history' }]
      : []),
  ];

  const TableMapper: { [key: string]: React.ReactNode } = {
    published: (
      <PublishedTable
        data={publishedAlgorithms.data}
        isLoading={publishedAlgorithms.isLoading}
        handleOpenAlgoDetails={handleOpenAlgoDetails}
      />
    ),
    'browse-algorithms': (
      <BrowseAlgorithmsTable
        data={algorithms}
        isLoading={isLoading}
        handleOpenAlgoDetails={handleOpenAlgoDetails}
      />
    ),
    'execution-history': (
      <ExecutionHistoryTable data={executions} isLoading={isLoadingExecution} />
    ),
  };
  const query: null | string = searchParams.get('tab') || 'browse-algorithms';
  const TableComponent = TableMapper?.[query];

  return (
    <>
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
          <SearchInput />
          {!isSelectAlgorithm &&
          searchParams.get('tab') !== 'execution-history' ? (
            <Button size="md" onClick={() => handleOpenAlgoDetails('upload')}>
              <div className="flex gap-3 items-center">
                <MdAdd size={15} />
                <span>Upload algorithm</span>
              </div>
            </Button>
          ) : null}
        </div>
      </div>
      {TableComponent}
      <AppModal
        title="Online Editor"
        isOpen={!!searchParams.get('details')}
        handleClose={handleCloseAlgoDetails}
        fullWidth
      >
        <ViewLoader isLoading={isLoadingGetAlgoByID} />
        <AlgorithmDetails isLoadingUpload={isLoadingUpload} />
      </AppModal>
      <PublishedModal
        title="Algorithm"
        isOpen={isOpenPublished}
        handleClose={handleClosePublished}
        hash={algorithmDetails?.item_hash}
        publishedName={algorithmDetails?.name}
        backTo="/algorithms"
      />
    </>
  );
};

export default Algorithms;
