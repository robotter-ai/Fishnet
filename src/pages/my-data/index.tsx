import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import classNames from 'classnames';
import Button from '@components/ui/Button';
import AppModal from '@components/ui/AppModal';
import useModal from '@hooks/useModal';
import { MyDataTable } from '@features/my-data';

const MyData = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { isOpen, handleOpen, handleClose } = useModal();
  const {
    isOpen: openUploadData,
    handleOpen: handleOpenUploadData,
    handleClose: handleCloseAppData,
  } = useModal();
  const [activeTab, setActiveTab] = useState(1);
  const tabs = ['Published', 'Deleted'];

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
                  '!text-dark-50 !border-blue': i + 1 === activeTab,
                }
              )}
              onClick={() => setActiveTab(i + 1)}
            >
              {item}
            </div>
          ))}
        </div>
        <div className="flex gap-4 items-center">
          <div>
            <input
              className="bg-light-20 outline-light-20 h-[44px] p-[16px] py-[10px] rounded-[10px]"
              type="text"
              placeholder="Search"
            />
          </div>
          <Button size="md" onClick={handleOpenUploadData}>
            <div className="flex gap-3 items-center">
              <MdAdd size={20} />
              <span>Upload data</span>
            </div>
          </Button>
        </div>
      </div>
      <MyDataTable handleOpen={handleOpen} />
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
            onClick={() => navigate(`${pathname}/56`)}
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
