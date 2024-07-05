import { PlusCircleIcon } from '@assets/icons';
import { CheckBox } from '@components/form';
import AppModal from '@components/ui/AppModal';
import Button from '@components/ui/Button';
import DataSummary from '@shared/components/Summary';
import { IChartProps } from '@store/data/types';
import useTimeseriesChart from '../hooks/useTimeseriesChart';
import DataChart from './DataChart';
import EditDataTable from './EditDataTable';

const TimeseriesCharts = ({ isOwner, summary }: any) => {
  const {
    isUpload,
    charts,
    isOpen,
    columns,
    handleOpenChart,
    handleClose,
    handleSaveChart,
    handleOnchangeChart,
    selectedChart,
    handleDeleteChart,
    timeseries,
  } = useTimeseriesChart();

  return (
    <div>
      <div className="grid grid-cols-2 gap-5 mb-5">
        {!isOwner ? <DataSummary summary={summary} /> : null}
        {charts.map((item, idx) => (
          <DataChart
            key={idx}
            data={
              item.data as {
                date: number;
                [key: string]: number;
              }[]
            }
            chart={item as IChartProps}
            withActions={isOwner}
            handleOpenChart={() => handleOpenChart(item.id as string)}
            handleDeleteChart={() => handleDeleteChart(item.id as string)}
            isView={!isOwner}
          />
        ))}
      </div>
      {isUpload ? (
        <div className="flex gap-5">
          {[1, 2].map((_, idx) => (
            <div
              key={idx}
              className="flex-1 flex gap-4 items-center justify-center text-primary h-16 bg-[#E6FBFF] rounded-[32px] cursor-pointer"
              onClick={() => handleOpenChart('new')}
            >
              <PlusCircleIcon className="text-primary" height={35} width={35} />
              <span className="text-lg font-bold">New chart</span>
            </div>
          ))}
        </div>
      ) : null}
      <div className="mt-8 flex flex-col gap-3">
        <h1>Columns</h1>
        <EditDataTable data={timeseries} />
      </div>
      <AppModal
        title="Select values for the chart"
        isOpen={isOpen}
        handleClose={handleClose}
      >
        <div className="grid grid-cols-2 gap-4 rounded">
          {columns.map((item, i) => {
            return (
              <div key={i}>
                <CheckBox
                  label={item}
                  checked={selectedChart?.keys?.some((x) => x.name === item)}
                  onChange={() => handleOnchangeChart('keys', item)}
                />
              </div>
            );
          })}
        </div>
        <div className="w-full flex justify-center mt-6">
          <Button
            text="Save"
            size="md"
            icon="box"
            fullWidth
            onClick={handleSaveChart}
          />
        </div>
      </AppModal>
    </div>
  );
};

export default TimeseriesCharts;
