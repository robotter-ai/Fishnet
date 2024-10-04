import CustomButton from '@components/ui/Button';
import { RxCaretLeft } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import DataSummary from '@shared/components/Summary';
import DataChart from '@pages/data/components/DataChart';
import { PriceTagIcon } from '@assets/icons';
import { useAppSelector } from '@store/hooks';
import AddAccessModal from '@shared/components/AddAccessModal';
import TableMapper from './components/SettingsTableMapper';
import useDataSettings from './hooks/useDataSettings';

const DataSettings = () => {
  const {
    dataset,
    isOpenAccessSettings,
    handleOpenAccessSettings,
    handleCloseAccessSettings,
  } = useDataSettings();
  
  const STATISTICS = [
    {
      name: 'Total profit',
      value: 0,
    },
    {
      name: 'Total sales',
      value: 0,
    },
    {
      name: 'Total downloads',
      value: dataset?.downloads || 0,
    },
    {
      name: 'Price',
      value: (
        <div className="flex gap-2 items-center" role="button">
          {dataset?.price} USDC <PriceTagIcon width={24} height={24} />
        </div>
      ),
    },
  ];

  return (
    <div id="data-settings">
      <div className="flex justify-between items-center mb-5">
        <div>
          <Link to="/monitor-access" className="flex items-center text-primary">
            <RxCaretLeft size={30} />
            Back
          </Link>
        </div>
        <div>
          <CustomButton
            text="Add access"
            size="md"
            icon="lock"
            onClick={handleOpenAccessSettings}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5 mb-8">
        <DataSummary title="Comprehensive statistics" summary={STATISTICS} />
        {/* <DataChart
          data={[]}
          chart={{
            id: nanoid(4),
            interval: '',
            keys: [
              { name: 'Profit', color: '#0093A7' },
              { name: 'Downloads', color: '#0055FF' },
            ],
          }}
        /> */}
      </div>
      <AddAccessModal
        isOpen={isOpenAccessSettings}
        handleClose={handleCloseAccessSettings}
      />
    </div>
  );
};

export default DataSettings;
