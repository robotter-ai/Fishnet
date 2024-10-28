import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  setBotData,
  updateBotStats,
  setUsdcBalance,
  addBot,
} from '@store/auth/slice';

export const websocketApi = createApi({
  reducerPath: 'websocketApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/ws' }),
  endpoints: (builder) => ({
    getWebsocketUpdates: builder.query<void, string>({
      queryFn: () => ({ data: undefined }),
      async onCacheEntryAdded(
        address,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch }
      ) {
        const ws = new WebSocket(
          `${import.meta.env.VITE_TRANSACTIONS_API_URL}/ws`
        );

        try {
          await cacheDataLoaded;

          const listener = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            switch (data.type) {
              case 'connectionSuccess':
                dispatch(setBotData(data.payload.bots));
                break;
              case 'newBot':
                console.log(data);
                dispatch(addBot(data.payload.bot));
                break;
              case 'update':
                handleUpdate(data.payload.event, dispatch);
                break;
              case 'error':
                console.error('WebSocket error:', data.payload.message);
                break;
              default:
                console.log('Unhandled message type:', data.type);
            }
          };

          ws.addEventListener('open', () => {
            ws.send(`connect:${address}`);
          });

          ws.addEventListener('message', listener);
          ws.addEventListener('error', (error) => {
            console.error('WebSocket error:', error);
          });

          ws.addEventListener('close', () => {
            console.log('WebSocket connection closed');
          });
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`
        }

        await cacheEntryRemoved;
        ws.send(`disconnect:${address}`);
        ws.close();
      },
    }),
  }),
});

function handleUpdate(event: any, dispatch: any) {
  switch (event.type) {
    case 'botUpdate':
      dispatch(
        updateBotStats({
          id: event.botId,
          events: event,
        })
      );
      break;
    case 'balanceUpdate':
      dispatch(setUsdcBalance(event.balance));
      break;
    // Add more cases as needed
    default:
      console.log('Unhandled event type:', event.type);
  }
}

export const { useGetWebsocketUpdatesQuery, middleware: websocketMiddleware } =
  websocketApi;
