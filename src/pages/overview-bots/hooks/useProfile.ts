import { createElement, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import usePageTitle from '@shared/hooks/usePageTitle';
import { useAppSelector } from '@shared/hooks/useStore';
import { useAuth } from '@contexts/auth-provider';
import { useGetUserInfoQuery } from '@store/profile/api';
import { IUserInfo } from '@store/profile/types';
import {
  ChartminiIcon,
  FolderIcon,
  HomeIcon,
  TrainingIcon,
  TutorialIcon,
} from '@assets/icons';

export type ITab = 'overview' | 'datasets' | 'training' | 'bots' | 'tutorial';
export type ITimeTab = 'minute' | 'hour' | 'day' | 'week' | 'month';
export type IDateTab = 'day' | 'week' | 'month' | 'time';
export type IStratTab = 'strat' | 'hyper';
export type IChatTab = 'trades' | 'pnl';
export type IPerfTab = 'best' | 'worst';

export interface ITabs {
  key: ITab | ITimeTab | IDateTab | IStratTab | IChatTab | IPerfTab;
  name: string;
  icon: JSX.Element | null;
}

export interface IStatsTableData {
  label: string;
  value: string;
  chartData: null | number[];
  progressValue: null | number;
  color: string | null;
  toolTipText: string | null;
}

export interface ICryptoStats {
  amount: number;
  tag: string;
  percentage: number;
  value: number | null;
  isProfit: boolean;
  color: string;
}

export interface ISolData {
  name: string;
  isChecked: null;
}

export interface ICardBotData {
  name: string;
  rate: number;
  isPositive: boolean;
  pieChartData: ICryptoStats[];
  lineChartData: number[] | null;
  tableData: {
    labelA: (string | number)[];
    labelB: (string | number)[];
    percentage: number | null;
    isProfit: boolean | null;
  }[];
}

export interface IBotData {
  id: number;
  name: string;
  status: 'Active' | 'Stopped';
  pnl: {
    value: number;
    percentage: number;
    isPositive: boolean;
    chartData: number[];
  };
  portfolio: {
    value: number;
    percentage: number;
  };
  accuracy: number;
  sharpeRatio: number;
  apr: number;
  delegate: string;
  events: {
    event_category: 'deposit' | 'withdraw' | 'trade';
    timestamp: string;
    [key: string]: any;
  }[];
}

export interface IDateTabs {
  key: string;
  name: string;
}

export interface ISolData {
  name: string;
  isChecked: null;
}

export default () => {
  const session = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const { setTitle } = usePageTitle();

  const [search, setSearch] = useState('');

  //const { data } = useGetUserInfoQuery({ address: session?.address });

  //const user = data as IUserInfo;

  const query: ITab = (searchParams.get('tab') as ITab) || 'overview';
  const dateQuery = (searchParams.get('date') as IDateTab) || 'week';
  const tradeDateQuery = (searchParams.get('trade_date') as IDateTab) || 'day';
  const timeQuery = (searchParams.get('time') as ITimeTab) || 'day';
  const perfQuery = (searchParams.get('perf') as IPerfTab) || 'best';
  const stratQuery = (searchParams.get('strat') as IStratTab) || 'strat';
  const chartTypeQuery = (searchParams.get('chart') as IChatTab) || 'trades';

  const tabs: ITabs[] = [
    {
      key: 'overview',
      name: 'Overview',
      icon: createElement(HomeIcon, {
        style: { width: '1rem', height: '1rem' },
      }),
    },
    {
      key: 'datasets',
      name: 'Datasets',
      icon: createElement(FolderIcon, {
        style: { width: '1rem', height: '1rem' },
      }),
    },
    {
      key: 'training',
      name: 'Training',
      icon: createElement(TrainingIcon, {
        style: { width: '1rem', height: '1rem' },
      }),
    },
    {
      key: 'bots',
      name: 'Bots',
      icon: createElement(ChartminiIcon, {
        style: { width: '1rem', height: '1rem' },
      }),
    },
    {
      key: 'tutorial',
      name: 'Tutorial',
      icon: createElement(TutorialIcon, {
        style: { width: '1rem', height: '1rem' },
      }),
    },
  ];

  const dateTabs: ITabs[] = [
    { key: 'day', name: 'Last Day', icon: null },
    { key: 'week', name: 'Last Week', icon: null },
    { key: 'month', name: 'Last Month', icon: null },
    { key: 'time', name: 'All time', icon: null },
  ];

  const tradeDateTabs: ITabs[] = [
    { key: 'day', name: 'Day', icon: null },
    { key: 'week', name: 'Week', icon: null },
    { key: 'month', name: 'Month', icon: null },
  ];

  const timeTabs: ITabs[] = [
    { key: 'minute', name: '15m', icon: null },
    { key: 'hour', name: '1h', icon: null },
    { key: 'day', name: '1d', icon: null },
    { key: 'week', name: '1w', icon: null },
    { key: 'month', name: '1M', icon: null },
  ];

  const perfTabs: ITabs[] = [
    { key: 'best', name: 'Best Performance', icon: null },
    { key: 'worst', name: 'Worst Performance', icon: null },
  ];

  const stratTabs: ITabs[] = [
    { key: 'strat', name: 'Strategy', icon: null },
    { key: 'hyper', name: 'Hyperparameters', icon: null },
  ];

  const chartTypeTabs: ITabs[] = [
    { key: 'pnl', name: 'P&L', icon: null },
    { key: 'trades', name: 'Trades', icon: null },
  ];

  const PAGE_TITLE: Record<ITab, string> = {
    overview: 'Overview',
    datasets: 'Datasets',
    training: 'Training',
    bots: 'Bots',
    tutorial: 'Tutorial',
  };

  const cryptoStats: ICryptoStats[] = [
    {
      amount: 9186,
      tag: 'Big Brain',
      percentage: 20,
      value: null,
      isProfit: true,
      color: '#3AA8F0',
    },
    {
      amount: 7036,
      tag: 'Trade Genius',
      percentage: 11,
      value: null,
      isProfit: true,
      color: '#1F609C',
    },
    {
      amount: 3127,
      tag: 'Alpha Trader',
      percentage: 1,
      value: null,
      isProfit: false,
      color: '#4AB6C4',
    },
  ];

  const cryptoStatsBots: ICryptoStats[] = [
    {
      amount: 42.6,
      tag: 'SOL',
      percentage: 11,
      value: 4.6,
      isProfit: true,
      color: '#1F609C',
    },
    {
      amount: 0.13,
      tag: 'BTC',
      percentage: 10,
      value: 0.013,
      isProfit: true,
      color: '#3AA8F0',
    },
    {
      amount: 550,
      tag: 'OTN',
      percentage: 9,
      value: 49.5,
      isProfit: true,
      color: '#4AB6C4',
    },
  ];

  const statsData: IStatsTableData[] = [
    {
      label: 'P&L',
      value: '+$3909 (20%)',
      chartData: [50, 60, 40, 49, 38, 34, 80, 76, 95, 100],
      progressValue: null,
      color: '#4CAF50',
      toolTipText:
        'Shows the net gain or loss from your trades over a selected time period, helping you track performance',
    },
    {
      label: 'Traded volume',
      value: '$36 367',
      chartData: [50, 60, 40, 49, 38, 34, 80, 76, 95, 100],
      progressValue: null,
      color: '#4CAF50',
      toolTipText:
        'Represents the total value of all assets traded by your bots during the selected period, providing insight into your trading activity.',
    },
    {
      label: 'Total trades',
      value: '250',
      chartData: [98, 40, 60, 38, 42, 46, 40, 90, 95, 50],
      progressValue: null,
      color: '#F44336',
      toolTipText:
        'The number of all executed buy and sell orders by your bots during the selected period, showing the overall trading activity.',
    },
    {
      label: 'Total accuracy',
      value: '53%',
      chartData: [50, 60, 40, 49, 38, 34, 80, 76, 95, 100],
      progressValue: null,
      color: '#4CAF50',
      toolTipText:
        'The percentage of successful trades made by your bots, indicating how often their predictions were correct.',
    },
    {
      label: 'APR',
      value: '200%',
      chartData: [50, 60, 40, 49, 38, 34, 80, 76, 95, 100],
      progressValue: null,
      color: '#4CAF50',
      toolTipText:
        'The projected annual return on your trading strategies, expressed as a percentage, based on current performance and compounding',
    },
  ];

  const statsDataSOL: IStatsTableData[] = [
    {
      label: 'Unrealized P&L',
      value: '-$20',
      chartData: [50, 60, 40, 49, 38, 34, 80, 76, 95, 100],
      progressValue: null,
      color: '#F44336',
      toolTipText: null,
    },
    {
      label: 'Portfolio',
      value: '$9186',
      chartData: [50, 60, 40, 49, 38, 34, 80, 76, 95, 100],
      progressValue: null,
      color: '#4CAF50',
      toolTipText: null,
    },
    {
      label: 'Traded volume',
      value: '$16532',
      chartData: [98, 40, 60, 38, 42, 46, 40, 90, 95, 50],
      progressValue: null,
      color: '#4CAF50',
      toolTipText: null,
    },
    {
      label: 'Total trades',
      value: '14',
      chartData: [50, 60, 40, 49, 38, 34, 80, 76, 95, 100],
      progressValue: null,
      color: '#F44336',
      toolTipText: null,
    },
    {
      label: 'APR',
      value: '210%',
      chartData: null,
      progressValue: null,
      color: null,
      toolTipText: null,
    },
    {
      label: 'Sharpe ratio',
      value: '2.81',
      chartData: null,
      progressValue: null,
      color: null,
      toolTipText: null,
    },
  ];

  const statsDataOTN: IStatsTableData[] = [
    {
      label: 'OTN Balance',
      value: '550',
      chartData: null,
      progressValue: 50,
      color: '',
      toolTipText:
        "The amount of OTN (Robotter's native token) you hold. Staking OTN can reduce your trading fees and unlock additional rewards for increased profitability.",
    },
    {
      label: 'Monthly compute costs',
      value: '$150',
      chartData: [98, 40, 60, 38, 42, 46, 40, 90, 95, 50],
      progressValue: null,
      color: '#F44336',
      toolTipText:
        'The estimated cost for running your trading bots, including data processing and computational resources, billed monthly',
    },
    {
      label: 'Av. maker fee',
      value: '2%',
      chartData: null,
      progressValue: 20,
      color: '',
      toolTipText:
        'The average fee charged for placing limit orders that add liquidity to the market. Lower maker fees can reduce your overall trading costs.',
    },
    {
      label: 'Av taker fee',
      value: '3%',
      chartData: null,
      progressValue: 30,
      color: '',
      toolTipText:
        'The average fee charged for executing market orders that remove liquidity from the market. Higher taker fees can impact your overall trading profitability.',
    },
  ];

  const statsDataLock: IStatsTableData[] = [
    {
      label: 'OTN',
      value: '550',
      chartData: null,
      progressValue: 50,
      color: null,
      toolTipText: null,
    },
    {
      label: 'Monthly compute costs',
      value: '$50',
      chartData: [98, 40, 60, 38, 42, 46, 40, 90, 95, 50],
      progressValue: null,
      color: '#F44336',
      toolTipText: null,
    },
    {
      label: 'Maker fee',
      value: '2%',
      chartData: null,
      progressValue: 20,
      color: null,
      toolTipText: null,
    },
    {
      label: 'Taker fee',
      value: '3%',
      chartData: null,
      progressValue: 30,
      color: null,
      toolTipText: null,
    },
  ];

  const cardBotData: ICardBotData[] = [
    {
      name: 'Big Brain',
      rate: 1837,
      isPositive: true,
      pieChartData: [
        {
          amount: 65,
          tag: 'profit',
          percentage: 65,
          color: '#218358',
          isProfit: true,
          value: null,
        },
        {
          amount: 35,
          tag: 'loss',
          percentage: 35,
          color: '#CE2C31',
          isProfit: false,
          value: null,
        },
      ],
      lineChartData: [50, 60, 40, 49, 38, 34, 80, 76, 95, 100],
      tableData: [
        {
          labelA: [210, 'APR'],
          labelB: [42.6, 'SOL'],
          percentage: 11,
          isProfit: true,
        },
        {
          labelA: [2.81, 'Sharpe ratio'],
          labelB: [0.13, 'BTC'],
          percentage: 10,
          isProfit: true,
        },
        {
          labelA: [14, 'Trades'],
          labelB: [550, 'OTN'],
          percentage: 9,
          isProfit: true,
        },
      ],
    },
    {
      name: 'Trade Genius',
      rate: 773,
      isPositive: true,
      pieChartData: [
        {
          amount: 59,
          tag: 'profit',
          percentage: 59,
          color: '#218358',
          isProfit: true,
          value: null,
        },
        {
          amount: 41,
          tag: 'loss',
          percentage: 41,
          color: '#CE2C31',
          isProfit: false,
          value: null,
        },
      ],
      lineChartData: [50, 60, 40, 49, 38, 34, 80, 76, 95, 100],
      tableData: [
        {
          labelA: [187, 'APR'],
          labelB: [2.35, 'SOL'],
          percentage: 16,
          isProfit: true,
        },
        {
          labelA: [2.01, 'Sharpe ratio'],
          labelB: [0.0034, 'BTC'],
          percentage: 14,
          isProfit: true,
        },
        {
          labelA: [36, 'Trades'],
          labelB: [83, 'OTN'],
          percentage: 2,
          isProfit: true,
        },
      ],
    },
    {
      name: 'Alpha Trader',
      rate: 31,
      isPositive: false,
      pieChartData: [
        {
          amount: 49,
          tag: 'profit',
          percentage: 49,
          color: '#218358',
          isProfit: true,
          value: null,
        },
        {
          amount: 51,
          tag: 'loss',
          percentage: 51,
          color: '#CE2C31',
          isProfit: true,
          value: null,
        },
      ],
      lineChartData: [90, 85, 80, 70, 60, 65, 75, 76, 95, 80],
      tableData: [
        {
          labelA: [165, 'APR'],
          labelB: [3.68, 'SOL'],
          percentage: 1,
          isProfit: true,
        },
        {
          labelA: [1.75, 'Sharpe ratio'],
          labelB: [0.0001, 'BTC'],
          percentage: 8,
          isProfit: false,
        },
        {
          labelA: [120, 'Trades'],
          labelB: [89, 'OTN'],
          percentage: 4,
          isProfit: true,
        },
      ],
    },
  ];

  const cardBotDataBT: ICardBotData[] = [
    {
      name: '2024-06-23 19:23',
      rate: 1256,
      isPositive: true,
      pieChartData: [
        { amount: 68, tag: 'profit', percentage: 68, color: '#218358', isProfit: true, value: null },
        { amount: 32, tag: 'loss', percentage: 32, color: '#CE2C31', isProfit: false, value: null },
      ],
      lineChartData: null,
      tableData: [
        {
          labelA: [150, 'APR'],
          labelB: [12, 'Max Dropdown'],
          percentage: null,
          isProfit: null,
        },
        {
          labelA: [3.21, 'Sharpe ratio'],
          labelB: [110, 'Successful sells'],
          percentage: null,
          isProfit: null,
        },
        {
          labelA: [70, 'Sentiment'],
          labelB: [90, 'Loss sells'],
          percentage: null,
          isProfit: null,
        },
      ],
    },
    {
      name: '2024-06-19 20:01',
      rate: 941,
      isPositive: true,
      pieChartData: [
        { amount: 65, tag: 'profit', percentage: 65, color: '#218358', isProfit: true, value: null },
        { amount: 35, tag: 'loss', percentage: 35, color: '#CE2C31', isProfit: false, value: null },
      ],
      lineChartData: null,
      tableData: [
        {
          labelA: [124, 'APR'],
          labelB: [15, 'Max Dropdown'],
          percentage: null,
          isProfit: null,
        },
        {
          labelA: [2.84, 'Sharpe ratio'],
          labelB: [64, 'Successful sells'],
          percentage: null,
          isProfit: null,
        },
        {
          labelA: [75, 'Sentiment'],
          labelB: [36, 'Loss sells'],
          percentage: null,
          isProfit: null,
        },
      ],
    },
    {
      name: '2024-06-11 12:05',
      rate: 322,
      isPositive: false,
      pieChartData: [
        { amount: 48, tag: 'profit', percentage: 48, color: '#218358', isProfit: true, value: null },
        { amount: 52, tag: 'loss', percentage: 52, color: '#CE2C31', isProfit: false, value: null },
      ],
      lineChartData: null,
      tableData: [
        {
          labelA: [-20, 'APR'],
          labelB: [53, 'Max Dropdown'],
          percentage: null,
          isProfit: null,
        },
        {
          labelA: [1.37, 'Sharpe ratio'],
          labelB: [34, 'Successful sells'],
          percentage: null,
          isProfit: null,
        },
        {
          labelA: [42, 'Sentiment'],
          labelB: [40, 'Loss sells'],
          percentage: null,
          isProfit: null,
        },
      ],
    },
    {
      name: '2024-06-09 07:53',
      rate: 500,
      isPositive: false,
      pieChartData: [
        { amount: 46, tag: 'profit', percentage: 46, color: '#218358', isProfit: true, value: null },
        { amount: 54, tag: 'loss', percentage: 54, color: '#CE2C31', isProfit: false, value: null },
      ],
      lineChartData: null,
      tableData: [
        {
          labelA: [-17, 'APR'],
          labelB: [58, 'Max Dropdown'],
          percentage: null,
          isProfit: null,
        },
        {
          labelA: [1.21, 'Sharpe ratio'],
          labelB: [58, 'Successful sells'],
          percentage: null,
          isProfit: null,
        },
        {
          labelA: [44, 'Sentiment'],
          labelB: [42, 'Loss sells'],
          percentage: null,
          isProfit: null,
        },
      ],
    },
  ];

  const botData: IBotData[] = [
    {
      id: 1,
      name: 'Big Brain',
      status: 'Active',
      pnl: {
        value: 1837,
        percentage: 20,
        isPositive: true,
        chartData: [50, 60, 40, 49, 38, 34, 80, 76, 95, 100],
      },
      portfolio: {
        value: 9186,
        percentage: 20,
      },
      accuracy: 65,
      sharpeRatio: 2.81,
      apr: 210,
      delegate: 'rikiFB2VznT2izUT7UffzWCn1X4gNmGutX7XEqFdpRR',
      events: []
    },
    {
      id: 2,
      name: 'Trade Genius',
      status: 'Active',
      pnl: {
        value: 773,
        percentage: 11,
        isPositive: true,
        chartData: [50, 60, 40, 49, 38, 34, 80, 76, 95, 100],
      },
      portfolio: {
        value: 7036,
        percentage: 11,
      },
      accuracy: 59,
      sharpeRatio: 2.01,
      apr: 187,
      delegate: 'rikiFB2VznT2izUT7UffzWCn1X4gNmGutX7XEqFdpRR',
      events: []
    },
    {
      id: 3,
      name: 'Alpha Trader',
      status: 'Active',
      pnl: {
        value: 31,
        percentage: 1,
        isPositive: false,
        chartData: [90, 85, 80, 70, 60, 65, 75, 76, 95, 80],
      },
      portfolio: {
        value: 3127,
        percentage: 1,
      },
      accuracy: 49,
      sharpeRatio: 1.75,
      apr: 165,
      delegate: 'rikiFB2VznT2izUT7UffzWCn1X4gNmGutX7XEqFdpRR',
      events: []
    },
  ];

  const solData: ISolData[] = [
    { name: 'SOL/USDC', isChecked: null },
    { name: 'SOL/BNB', isChecked: null },
    { name: 'SOL/JUP', isChecked: null },
  ];

  const infoTable = [
    ['Start date', '2024-30-27'],
    ['Initial amount', '$1487'],
    ['Deposit address', 'B2hj...k2oT'],
  ];

  const stratTable = [
    ['Exchange', 'Binance'],
    ['Strategy/Value', 'Bar Up Down / 0.5'],
    ['Market trend', 'Bullish / 67%'],
    ['Leverage', 'x4'],
    ['Take profit', '+20%'],
    ['Stop loss', '-10%'],
  ];

  useEffect(() => {
    setTitle(PAGE_TITLE[query]);
  }, [query]);

  return {
    tabs,
    dateTabs,
    timeTabs,
    perfTabs,
    stratTabs,
    tradeDateTabs,
    chartTypeTabs,
    statsData,
    statsDataOTN,
    statsDataSOL,
    statsDataLock,
    cryptoStats,
    cryptoStatsBots,
    cardBotData,
    cardBotDataBT,
    solData,
    infoTable,
    stratTable,
    //user,
    query,
    dateQuery,
    timeQuery,
    perfQuery,
    tradeDateQuery,
    stratQuery,
    chartTypeQuery,
    search,
    setSearch,
    searchParams,
    setSearchParams,
    address: session?.address,
  };
};
