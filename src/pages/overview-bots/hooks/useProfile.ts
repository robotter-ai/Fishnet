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

export interface ITabs {
  key: string;
  name: string;
  icon: JSX.Element | null;
}

export interface IStatsTableData {
  label: string;
  value: string;
  chartData: null | number[];
  progressValue: null | number;
  color: string;
}

export interface ICryptoStats {
  amount: number;
  tag: string;
  percentage: number;
  color: string;
}

export interface ICardBotData {
  name: string;
  rate: number;
  isPositive: boolean;
  pieChartData: {
    amount: number;
    tag: string;
    percentage: number;
    color: string;
  }[];
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
}

export interface IDateTabs {
  key: string;
  name: string;
}

export default () => {
  const session = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const { setTitle } = usePageTitle();

  const [search, setSearch] = useState('');

  //const { data } = useGetUserInfoQuery({ address: session?.address });

  //const user = data as IUserInfo;

  const query: ITab = (searchParams.get('tab') as ITab) || 'overview';
  const dateQuery: ITab = (searchParams.get('date') as ITab) || 'week';
  const timeQuery = (searchParams.get('time') as ITab) || 'day';
  const perfQuery = (searchParams.get('perf') as ITab) || 'best';

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

  const dateTabs: IDateTabs[] = [
    { key: 'day', name: 'Last Day' },
    { key: 'week', name: 'Last Week' },
    { key: 'month', name: 'Last Month' },
    { key: 'time', name: 'All time' },
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

  const PAGE_TITLE: Record<ITab, string> = {
    overview: 'Overview',
    datasets: 'Datasets',
    training: 'Training',
    bots: 'Bots',
    tutorial: 'Tutorial',
  };

  const cryptoStats: ICryptoStats[] = [
    { amount: 9186, tag: 'Big Brain', percentage: 20, color: '#3AA8F0' },
    { amount: 7036, tag: 'Trade Genius', percentage: 11, color: '#1F609C' },
    { amount: 3127, tag: 'Alpha Trader', percentage: 1, color: '#4AB6C4' },
  ];

  const statsData: IStatsTableData[] = [
    {
      label: 'P&L',
      value: '+$3909 (20%)',
      chartData: [50, 60, 40, 49, 38, 34, 80, 76, 95, 100],
      progressValue: null,
      color: '#4CAF50',
    },
    {
      label: 'Traded volume',
      value: '$36 367',
      chartData: [50, 60, 40, 49, 38, 34, 80, 76, 95, 100],
      progressValue: null,
      color: '#4CAF50',
    },
    {
      label: 'Total trades',
      value: '250',
      chartData: [98, 40, 60, 38, 42, 46, 40, 90, 95, 50],
      progressValue: null,
      color: '#F44336',
    },
    {
      label: 'Total accuracy',
      value: '53%',
      chartData: [50, 60, 40, 49, 38, 34, 80, 76, 95, 100],
      progressValue: null,
      color: '#4CAF50',
    },
    {
      label: 'APR',
      value: '200%',
      chartData: [50, 60, 40, 49, 38, 34, 80, 76, 95, 100],
      progressValue: null,
      color: '#4CAF50',
    },
  ];

  const statsDataOTN: IStatsTableData[] = [
    {
      label: 'OTN Balance',
      value: '550',
      chartData: null,
      progressValue: 50,
      color: '',
    },
    {
      label: 'Monthly compute costs',
      value: '$150',
      chartData: [98, 40, 60, 38, 42, 46, 40, 90, 95, 50],
      progressValue: null,
      color: '#F44336',
    },
    {
      label: 'Av. maker fee',
      value: '2%',
      chartData: null,
      progressValue: 20,
      color: '',
    },
    {
      label: 'Av taker fee',
      value: '3%',
      chartData: null,
      progressValue: 30,
      color: '',
    },
  ];

  const cardBotData: ICardBotData[] = [
    {
      name: 'Big Brain',
      rate: 1837,
      isPositive: true,
      pieChartData: [
        { amount: 65, tag: 'profit', percentage: 65, color: '#218358' },
        { amount: 35, tag: 'loss', percentage: 35, color: '#CE2C31' },
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
        { amount: 59, tag: 'profit', percentage: 59, color: '#218358' },
        { amount: 41, tag: 'loss', percentage: 41, color: '#CE2C31' },
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
        { amount: 49, tag: 'profit', percentage: 49, color: '#218358' },
        { amount: 51, tag: 'loss', percentage: 51, color: '#CE2C31' },
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
        { amount: 68, tag: 'profit', percentage: 68, color: '#218358' },
        { amount: 32, tag: 'loss', percentage: 32, color: '#CE2C31' },
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
        { amount: 65, tag: 'profit', percentage: 65, color: '#218358' },
        { amount: 35, tag: 'loss', percentage: 35, color: '#CE2C31' },
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
        { amount: 48, tag: 'profit', percentage: 48, color: '#218358' },
        { amount: 52, tag: 'loss', percentage: 52, color: '#CE2C31' },
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
        { amount: 46, tag: 'profit', percentage: 46, color: '#218358' },
        { amount: 54, tag: 'loss', percentage: 54, color: '#CE2C31' },
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
    },
  ];

  useEffect(() => {
    setTitle(PAGE_TITLE[query]);
  }, [query]);

  return {
    tabs,
    dateTabs,
    timeTabs,
    perfTabs,
    statsData,
    statsDataOTN,
    cryptoStats,
    cardBotData,
    cardBotDataBT,
    botData,
    //user,
    query,
    dateQuery,
    timeQuery,
    perfQuery,
    search,
    setSearch,
    searchParams,
    setSearchParams,
    address: session?.address,
  };
};
