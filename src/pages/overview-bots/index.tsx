import useProfile, { ITab } from './hooks/useProfile';
import Overview from './components/Overview';
import Training from './components/Training';
import Header from './components/Header';
import Bots from './components/Bots';

const OverviewBots = () => {
  const {
    tabs,
    dateTabs,
    timeTabs,
    perfTabs,
    stratTabs,
    tradeDateTabs,
    chartTypeTabs,
    cryptoStats,
    cryptoStatsBots,
    statsData,
    statsDataOTN,
    statsDataSOL,
    statsDataLock,
    cardBotData,
    cardBotDataBT,
    user,
    query,
    dateQuery,
    timeQuery,
    perfQuery,
    stratQuery,
    tradeDateQuery,
    chartTypeQuery,
    stratTable,
    infoTable,
    solData,
    search,
    address,
    setSearch,
    transactions,
    searchParams,
    setSearchParams,
  } = useProfile();

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
        timeQuery={timeQuery}
        timeTabs={timeTabs}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        cardBotData={cardBotDataBT}
      />
    ),
    bots: (
      <Bots
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
      />
    ),
    tutorial: <></>,
  };

  const Component = Mapper[query];

  return (
    <div className="py-8 px-6 max-w-[90rem] w-full mx-auto overflow-x-hidden">
      <Header
        query={query}
        tabs={tabs}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <div>
        {Component}
      </div>
      
    </div>
  );
};

export default OverviewBots;
