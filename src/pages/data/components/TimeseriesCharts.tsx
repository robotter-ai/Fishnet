import { PlusCircleIcon } from '@assets/icons';
import useTimeseriesChart from '../hooks/useTimeseriesChart';
import DataChart from './DataChart';
import ValuesIntervalModal from './ValuesIntervalModal';

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
      <ValuesIntervalModal
        isOpen={isOpen}
        selectedChart={selectedChart}
        handleClose={handleClose}
        handleSaveChart={handleSaveChart}
        handleOnchangeChart={handleOnchangeChart}
      />
    </div>
  );
};

export default TimeseriesCharts;
