import { useState } from 'react';
import { RxCaretLeft, RxCopy } from 'react-icons/rx';
import { IoCheckbox } from 'react-icons/io5';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { Link } from 'react-router-dom';
import Button from '@components/ui/Button';
import AppModal from '@components/ui/AppModal';
import useModal from '@hooks/useModal';
import { DataChart, DataSummary, EditDataTable } from '@features/my-data';
import { VALUES_AND_INTERVAL } from '@constants/options';
import { CheckBox } from '@components/form';

const DataDetails = () => {
  const { isOpen, handleOpen, handleClose } = useModal();
  const {
    isOpen: isOpenNewChart,
    handleOpen: handleOpenNewChart,
    handleClose: handleCloseNewChart,
  } = useModal();
  const [isPublished, setIsPublished] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <div>
          <Link to="/my-data" className="flex items-center text-blue">
            <RxCaretLeft size={30} />
            My data
          </Link>
        </div>
        <div>
          {isPublished ? (
            <div className="flex gap-4">
              <Button text="Use" size="md" btnStyle="outline-blue" />
              <Button text="Save" size="md" />
            </div>
          ) : (
            <Button
              text="Publish"
              size="md"
              onClick={() => {
                handleOpen();
                setIsPublished(true);
              }}
            />
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <DataSummary />
        {[1, 2].map((item, i) => (
          <DataChart key={i} />
        ))}
        <div
          className="flex items-center justify-center h-full bg-[#FAFAFA] rounded-[10px] cursor-pointer"
          onClick={handleOpenNewChart}
        >
          <IoIosAddCircleOutline className="text-blue" size={150} />
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-3">
        <h1>Dataset</h1>
        <p>
          Check the data you want to upload. Select a time interval. You can
          also rename the indicator.
        </p>
        <EditDataTable isPublished={isPublished} />
      </div>
      <AppModal
        title="Values and Interval"
        isOpen={isOpenNewChart}
        handleClose={handleCloseNewChart}
        fullWidth
      >
        <div className="grid grid-cols-7 gap-3 shadow-lg p-4 rounded">
          {VALUES_AND_INTERVAL.map((item, i) => (
            <div key={i}>
              <CheckBox label={item} />
            </div>
          ))}
        </div>
        <div className="text-center mt-5">
          <Button text="Save" size="lg" onClick={handleClose} />
        </div>
      </AppModal>
      <AppModal
        title="Select file (.csv)"
        isOpen={isOpen}
        handleClose={handleClose}
        withInfo
        withHeader={false}
      >
        <div className="flex flex-col items-center gap-4">
          <h1>Data published!</h1>
          <IoCheckbox className="text-blue" size={70} />
          <p>Data &lt;name&gt; published</p>
          <div className="flex flex-col items-center gap-2">
            <p className="text-blue">
              0x0e500536374891a286e0aad2fc6adf64b083fcdb
            </p>
            <RxCopy />
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-7">
          <Button
            text="Edit data"
            size="lg"
            btnStyle="outline-blue"
            fullWidth
            onClick={handleClose}
          />
          <Button text="My Data" size="lg" fullWidth onClick={handleClose} />
        </div>
      </AppModal>
    </div>
  );
};

export default DataDetails;
