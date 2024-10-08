import { robotterApi } from './config';

const robotterEndpoints = robotterApi.injectEndpoints({
    endpoints: (builder) => ({
        createInstance: builder.mutation<
        { instance_id: string; wallet_address: string; market: string },
        { strategy_name: string; strategy_parameters: Record<string, any>; market: string }
      >({
        query: (data) => {
          console.log('createInstance request body:', data);
          return {
            url: '/instances',
            method: 'POST',
            data,
          };
        },
      }),

    getInstanceWallet: builder.query<string, string>({
        query: (instanceId) => ({
          url: `/instances/${instanceId}/wallet`,
          method: 'GET',
        }),
    }),

    startInstance: builder.mutation<
        string,
        { instanceId: string; strategy_name: string; parameters: Record<string, any> }
    >({
        query: ({ instanceId, ...data }) => ({
        url: `/instances/${instanceId}/start`,
        method: 'POST',
        body: data,
        }),
    }),

    stopInstance: builder.mutation<string, string>({
      query: (instanceId) => ({
        url: `/instances/${instanceId}/stop`,
        method: 'POST',
      }),
    }),

    getStrategies: builder.query<Record<string, Record<string, any>>, void>({
        query: () => ({
          url: '/strategies',
          method: 'GET',
        }),
      }),

    getHistoricalCandles: builder.mutation<
      { data: Array<{ o: number; h: number; l: number; c: number; v: number; unixTime: number; address: string; type: string }> },
      { connector_name: string; trading_pair: string; market_address: string; interval: string; start_time: number; end_time: number; limit?: number }
    >({
      query: (body) => ({
        url: '/historical-candles',
        method: 'POST',
        body,
      }),
    }),

    runBacktest: builder.mutation<
      {
        executors: Array<{
          level_id: string;
          timestamp: number;
          connector_name: string;
          trading_pair: string;
          entry_price: number;
          amount: number;
          side: string;
          leverage: number;
          position_mode: string;
        }>;
        processed_data: {
          features: Record<string, Array<number | string>>;
        };
        results: {
          total_pnl: number;
          total_trades: number;
          win_rate: number;
          profit_loss_ratio: number;
          sharpe_ratio: number;
          max_drawdown: number;
          start_timestamp: number;
          end_timestamp: number;
        };
      },
      {
        start_time: number;
        end_time: number;
        backtesting_resolution?: string;
        trade_cost?: number;
        config?: any;
      }
    >({
      query: (body) => ({
        url: '/backtest',
        method: 'POST',
        body,
      }),
    }),

    requestChallenge: builder.mutation<
      {
        address: string;
        chain: 'SOL' | 'ETH';
        valid_til: number;
        challenge: string;
      },
      { address: string; chain: 'SOL' | 'ETH' }
    >({
      query: ({ address, chain }) => ({
        url: `/authorization/challenge?address=${address}&chain=${chain}`,
        method: 'POST',
      }),
    }),

    solveChallenge: builder.mutation<
      {
        address: string;
        chain: 'SOL' | 'ETH';
        valid_til: number;
        token: string;
      },
      { address: string; chain: 'SOL' | 'ETH'; signature: string }
    >({
      query: ({ address, chain, signature }) => ({
        url: `/authorization/solve?address=${address}&chain=${chain}&signature=${signature}`,
        method: 'POST',
      }),
    }),

    refreshToken: builder.mutation<
      {
        address: string;
        chain: 'SOL' | 'ETH';
        valid_til: number;
        token: string;
      },
      { token: string }
    >({
      query: ({ token }) => ({
        url: `/authorization/refresh?token=${token}`,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useCreateInstanceMutation,
  useGetInstanceWalletQuery,
  useStartInstanceMutation,
  useStopInstanceMutation,
  useGetStrategiesQuery,
  useGetHistoricalCandlesMutation,
  useRunBacktestMutation,
  useRequestChallengeMutation,
  useSolveChallengeMutation,
  useRefreshTokenMutation,
} = robotterEndpoints;
