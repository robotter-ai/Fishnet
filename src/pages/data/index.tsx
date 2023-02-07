import { ReactNode } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import classNames from 'classnames';
import Button from '@components/ui/Button';
import AppModal from '@components/ui/AppModal';
import useModal from '@shared/hooks/useModal';
import { BrowseDataTable, PublishedTable, useDataTable } from '@features/data';
import { SearchInput } from '@components/form';

const MyData = () => {
  const { data } = useDataTable();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParam, setSearchParams] = useSearchParams();
  const { isOpen, handleOpen, handleClose } = useModal();
  const {
    isOpen: openUploadData,
    handleOpen: handleOpenUploadData,
    handleClose: handleCloseAppData,
  } = useModal();

  const tabs = [
    { key: 'published', name: 'Published' },
    { key: 'browse-data', name: 'Browse data' },
  ];
  const TableMapper: { [key: string]: ReactNode } = {
    published: <PublishedTable handleOpen={handleOpen} />,
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
          <Button size="md" onClick={handleOpenUploadData}>
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
        isOpen={openUploadData}
        handleClose={handleCloseAppData}
        withInfo
      >
        <p className="my-[20px]">
          The data remains on your computer until you publish it. At this stage,
          the data is not published
        </p>
        <div className="flex justify-center items-center h-[207px] bg-light-20 rounded-[10px] mb-[20px]">
          <p className="text-blue text-2xl">Drag and Drop</p>
        </div>
        <div className="flex flex-col gap-4">
          <Button
            text="No, back"
            size="lg"
            fullWidth
            onClick={() => navigate(`${pathname}/${54}`)}
          >
            <div className="flex justify-center gap-3 items-center">
              <MdAdd size={20} />
              <span>Choose data</span>
            </div>
          </Button>
        </div>
      </AppModal>
      <AppModal
        title="Deleted file cannot be restored"
        isOpen={isOpen}
        handleClose={handleClose}
      >
        <div className="my-[20px]">
          <p>Are you sure?</p>
        </div>
        <div className="flex flex-col gap-4">
          <Button
            text="Yes, delete"
            btnStyle="outline-red"
            size="lg"
            fullWidth
          />
          <Button text="No, back" size="lg" fullWidth />
        </div>
      </AppModal>
    </div>
  );
};

export default MyData;
