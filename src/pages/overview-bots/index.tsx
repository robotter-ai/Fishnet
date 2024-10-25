import { useAppSelector } from '@shared/hooks/useStore';
import useModal from '@shared/hooks/useModal';
import AppModal from '@shared/components/AppModal';
import LoginForm from '@shared/components/LoginForm';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
import useProfile, { ITab } from './hooks/useProfile';
import Overview from './components/Overview';
import Training from './components/Training';
import Bots from './components/Bots';

const OverviewBots: React.FC = () => {
  const {
    tabs,
    dateTabs,
    timeTabs,
    perfTabs,
    stratTabs,
    tradeDateTabs,
    resultStratTabs,
    chartTypeTabs,
    cryptoStats,
    cryptoStatsBots,
    statsData,
    statsDataOTN,
    statsDataSOL,
    statsDataLock,
    cardBotData,
    cardBotDataBT,
    query,
    dateQuery,
    timeQuery,
    perfQuery,
    stratQuery,
    tradeDateQuery,
    resultStatQuery,
    bigStatTable,
    bigResultTable,
    chartTypeQuery,
    stratTable,
    infoTable,
    solData,
    searchParams,
    setSearchParams,
  } = useProfile();

  const { botsData } = useAppSelector((state) => state.auth);

  const { isOpen, handleOpen, handleClose } = useModal();

  const navigate = useNavigate();

  const handleSuccessfulLogin = () => {
    handleClose();
    if (searchParams.get('redirectToTraining') === 'true') {
      setSearchParams({ tab: 'training' });
    }
  };

  const handleOpenWalletModal = () => {
    // Implement the logic to open the wallet modal
    // For example:
    // setIsWalletModalOpen(true);
  };

  const Mapper: Record<ITab, React.ReactNode> = {
    overview: (
      <Overview
        dateTabs={dateTabs}
        dateQuery={dateQuery}
        timeQuery={timeQuery}
        perfQuery={perfQuery}
        timeTabs={timeTabs}
        perfTabs={perfTabs}
        statsData={statsData}
        statsDataOTN={statsDataOTN}
        cryptoStats={cryptoStats}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        cardBotData={cardBotData}
      />
    ),
    datasets: <></>,
    training: (
      <Training
        bigStatTable={bigStatTable}
        bigResultTable={bigResultTable}
        timeQuery={timeQuery}
        timeTabs={timeTabs}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        cardBotData={cardBotDataBT}
        resultStatTab={resultStratTabs}
        resultStatQuery={resultStatQuery}
      />
    ),
    bots: (
      <Bots
        botsData={botsData}
        solData={solData}
        infoTable={infoTable}
        stratTable={stratTable}
        dateQuery={dateQuery}
        timeQuery={timeQuery}
        stratQuery={stratQuery}
        tradeDateQuery={tradeDateQuery}
        chartTypeQuery={chartTypeQuery}
        timeTabs={timeTabs}
        stratTabs={stratTabs}
        tradeDateTabs={tradeDateTabs}
        chartTypeTabs={chartTypeTabs}
        statsDataSOL={statsDataSOL}
        statsDataLock={statsDataLock}
        cryptoStats={cryptoStatsBots}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        cardBotData={cardBotDataBT}
        handleOpenWalletModal={handleOpenWalletModal}
      />
    ),
    tutorial: <></>,
  };

  const Component = Mapper[query];

  return (
    <>
      <div className="py-8 px-6 max-w-[90rem] w-full mx-auto">
        <Header
          query={query}
          tabs={tabs}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
        {Component}
      </div>
      <AppModal
        title="Connect a wallet"
        isOpen={isOpen}
        handleSuccsessfulLogin={() => {}}
        handleClose={handleClose}
      >
        <LoginForm onSuccessfulLogin={handleSuccessfulLogin} />
      </AppModal>
    </>
  );
};

export default OverviewBots;
