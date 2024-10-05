import Header from './components/Header';
import useProfile, { ITab } from './hooks/useProfile';
import Overview from './components/Overview';
import Training from './components/Training';
import Bots from './components/Bots';
import { useAuth } from '@contexts/auth-provider';

const OverviewBots = () => {
  const {
    tabs,
    dateTabs,
    timeTabs,
    perfTabs,
    cryptoStats,
    statsData,
    statsDataOTN,
    cardBotData,
    cardBotDataBT,
    query,
    dateQuery,
    timeQuery,
    perfQuery,
    searchParams,
    setSearchParams,
  } = useProfile();

  const { botsData } = useAuth();

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
        botsData={botsData}
        timeTabs={timeTabs}
        timeQuery={timeQuery}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
    ),
    tutorial: <></>,
  };

  const Component = Mapper[query];

  return (
    <div className="py-8 px-6 max-w-[90rem] w-full mx-auto">
      <Header
        query={query}
        tabs={tabs}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
        {Component}
    </div>
  );
};

export default OverviewBots;
