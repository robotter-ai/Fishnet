/* eslint-disable no-nested-ternary */
import { PlusCircleIcon } from '@assets/icons';
import { CheckBox } from '@components/form';
import AppModal from '@components/ui/AppModal';
import Button from '@components/ui/Button';
import { VALUES_AND_INTERVAL } from '@shared/constant';
import { useAppSelector } from '@shared/hooks/useStore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DataSummary from '@shared/components/Summary';
import useDataDetails from '../hooks/useDataDetails';
import useTimeseriesChart, { ChartProps } from '../hooks/useTimeseriesChart';
import DataChart from './DataChart';
import EditDataTable from './EditDataTable';

const TimeseriesCharts = ({ isOwner, summary }: any) => {
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
    timeseries,
  } = useTimeseriesChart();
  const { handleGetViews } = useDataDetails();
  const { id } = useParams<{ id: string }>();
  const [viewData, setViewData] = useState({ data: [], columnValue: [] });
  const [isViewValue, setViewValue] = useState(false);

  const { views } = useAppSelector((state) => state.datasets);
  function getData() {
    let data;
    let columnValue;
    if (!csvJson.length && id === 'upload') {
      data = csvJson;
    } else if (!views.length && id !== 'upload') {
      data = localStorage.getItem('viewValues');
    } else if (csvJson.length) {
      data = csvJson;
    } else {
      data = views[0].values;
      columnValue = views[0].columns;
      setViewValue(true);
    }
    return { data, columnValue };
  }
  useEffect(() => {
    setViewData(getData());
  }, []);
  const { data, columnValue } = viewData;

  return (
    <div>
      <div className="grid grid-cols-2 gap-5 mb-5">
        {!isOwner ? <DataSummary summary={summary} /> : null}
        {charts.map((item, idx) => (
          <DataChart
            key={idx}
            columns={columnValue}
            // data={data}
            data={csvJson}
            // isViewValue={isViewValue}
            chart={item as ChartProps}
            withActions={isOwner}
            handleOpenChart={() => handleOpenChart(item.id as string)}
            handleDeleteChart={() => handleDeleteChart(item.id as string)}
          />
        ))}
      </div>
      {isOwner ? (
        <div className="flex gap-5">
          {[1, 2].map((_, idx) => (
            <div
              key={idx}
              className="flex-1 flex gap-4 items-center justify-center text-primary h-16 bg-[#E6FBFF] rounded-[32px] cursor-pointer"
              onClick={() => handleOpenChart('new')}
            >
              <PlusCircleIcon className="text-primary" height={35} width={35} />
              <span>New chart</span>
            </div>
          ))}
        </div>
      ) : null}
      <div className="mt-8 flex flex-col gap-3">
        <h1>Datasets records</h1>
        <EditDataTable data={timeseries} isPublished />
      </div>
      <AppModal
        title="Select values for the chart"
        isOpen={isOpen}
        handleClose={handleClose}
      >
        <div className="grid grid-cols-2 gap-4 rounded">
          {VALUES_AND_INTERVAL.map((item, i) => {
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
