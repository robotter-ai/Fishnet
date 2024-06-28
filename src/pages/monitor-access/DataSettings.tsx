import TextInput from '@components/form/TextInput';
import AppModal from '@components/ui/AppModal';
import CustomButton from '@components/ui/Button';
import useModal from '@shared/hooks/useModal';
import { RxCaretLeft } from 'react-icons/rx';
import { createSearchParams, Link, useParams } from 'react-router-dom';
import DataSummary from '@shared/components/Summary';
import DataChart from '@pages/data/components/DataChart';
import { nanoid } from 'nanoid';
import useDataSettings from './hooks/useDataSettings';
import TableMapper from './components/SettingsTableMapper';
import { PriceTagIcon } from '@assets/icons';
import { useAppSelector } from '@store/hooks';

const DataSettings = () => {
  const { isOpen, handleOpen, handleClose } = useModal();
  const {
    dataset,
    datasetInfo,
    isLoading,
    datasetPermission,
    handleAddAccess,
    handleOnchangeInput,
    isOpenAccessSettings,
    handleOpenAccessSettings,
    handleCloseAccessSettings,
  } = useDataSettings();
  const { getTransactions } = useAppSelector((app) => app.transactions);
  const datasetSales = getTransactions.sales.filter(x => x.datasetId === datasetInfo.item_hash);
  
  const STATISTICS = [
    {
      name: 'Total profit',
      value: getTransactions.datasetSales[datasetInfo.item_hash]?.profit || 0,
    },
    {
      name: 'Total sales',
      value: getTransactions.datasetSales[datasetInfo.item_hash]?.sales || 0,
    },
    {
      name: 'Total downloads',
      value: datasetInfo?.downloads || 0,
    },
    {
      name: 'Price',
      value: (
        <div className="flex gap-2 items-center" role="button">
          {datasetInfo.price} USDC <PriceTagIcon width={24} height={24} />
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
        <DataChart
          data={[]}
          chart={{
            id: nanoid(4),
            interval: '',
            keys: [
              { name: 'Profit', color: '#0093A7' },
              { name: 'Downloads', color: '#0055FF' },
            ],
          }}
        />
      </div>
      <TableMapper
        sales={datasetSales}
        datasetPermission={datasetPermission}
        handleOpenRefuseAccess={handleOpen}
      />
      <AppModal
        title="Access Settings"
        withInfo
        isOpen={isOpenAccessSettings}
        handleClose={handleCloseAccessSettings}
      >
        <div className="flex flex-col gap-5">
          <div>
            <div className="text-[#29324A] text-sm mb-4">
              <span>Enter a wallet address or choose from</span>{' '}
              <Link
                to={{
                  pathname: '/profile',
                  search: createSearchParams({
                    select: 'true',
                    tab: 'browse-users',
                  }).toString(),
                }}
                className="text-primary hover:underline"
              >
                the provided list
              </Link>
            </div>
            <TextInput
              placeholder="User hash"
              bgColor="#F6F8FB"
              size="lg"
              fullWidth
              value={dataset.requestor}
              onChange={(e) => handleOnchangeInput('requestor', e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-8 mt-3">
            <CustomButton
              text="Add access"
              size="lg"
              icon="lock"
              fullWidth
              isLoading={isLoading}
              onClick={handleAddAccess}
            />
            <CustomButton
              text="Choose a user"
              size="lg"
              btnStyle="outline-primary"
              fullWidth
              isLoading={isLoading}
              onClick={() => {}}
            />
          </div>
        </div>
      </AppModal>
    </div>
  );
};

export default DataSettings;
