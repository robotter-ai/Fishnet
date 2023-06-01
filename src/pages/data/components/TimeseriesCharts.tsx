import { PlusCircleIcon } from '@assets/icons';
import AppModal from '@components/ui/AppModal';
import { VALUES_AND_INTERVAL } from '@shared/constant';
import { CheckBox } from '@components/form';
import Button from '@components/ui/Button';
import DataChart from './DataChart';
import useTimeseriesChart from '../hooks/useTimeseriesChart';

const TimeseriesCharts = () => {
  const {
    charts,
    csvJson,
    isOpen,
    handleOpenChart,
    handleClose,
    handleSaveChart,
    handleOnchangeChart,
    selectedChart,
    handleDeleteChart,
  } = useTimeseriesChart();

  return (
    <div>
      <div className="grid grid-cols-2 gap-5 mb-5">
        {charts.map((item, idx) => (
          <DataChart
            key={idx}
            data={csvJson}
            chart={item}
            handleOpenChart={() => handleOpenChart(item.id as string)}
            handleDeleteChart={() => handleDeleteChart(item.id as string)}
          />
        ))}
        <div
          className="flex items-center justify-center min-h-[391px] bg-[#FAFAFA] rounded-[10px] cursor-pointer"
          onClick={() => handleOpenChart('new')}
        >
          <PlusCircleIcon className="text-blue" height={120} width={120} />
        </div>
      </div>
      {/* <div className="mt-8 flex flex-col gap-3">
      <h1>Dataset</h1>
      <p>
        Check the data you want to upload. Select a time interval. You can
        also rename the indicator.
      </p>
      <EditDataTable isPublished={isPublished} />
    </div> */}
      <AppModal
        title="Values and Interval"
        isOpen={isOpen}
        handleClose={handleClose}
        fullWidth
      >
        <div className="grid grid-cols-7 gap-3 shadow-lg p-4 rounded">
          {VALUES_AND_INTERVAL.map((item, i) => {
            return (
              <div key={i}>
                <CheckBox
                  label={item}
                  checked={
                    selectedChart.keys
                      ? selectedChart.keys.includes(item)
                      : false
                  }
                  onChange={() => handleOnchangeChart('keys', item)}
                />
              </div>
            );
          })}
        </div>
        <div className="flex justify-center mt-5">
          <Button text="Save" size="lg" onClick={handleSaveChart} />
        </div>
      </AppModal>
    </div>
  );
};

export default TimeseriesCharts;
