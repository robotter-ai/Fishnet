import { robotterApi } from '@store/config';
import { INotification, IUserInfo, UserProps } from './types';

const profileApi = robotterApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserInfo: builder.query<IUserInfo, { address: string }>({
      query: ({ address }) => ({
        method: 'GET',
        url: `/users/${address}`,
      }),
      providesTags: ['Profile'],
    }),

    getAllUsers: builder.query<IUserInfo[], void>({
      query: () => ({
        method: 'GET',
        url: '/users',
      }),
      providesTags: ['Profile'],
    }),

    updateUserInfo: builder.mutation<void, UserProps>({
      query: (data) => ({
        method: 'PUT',
        url: '/users',
        data,
      }),
      invalidatesTags: ['Profile'],
    }),

    getNotifications: builder.query<INotification[], { address: string }>({
      query: ({ address }) => ({
        method: 'GET',
        url: `/users/${address}/notifications`,
      }),
      providesTags: ['Profile'],
    }),
  }),
});

export const {
  useGetUserInfoQuery,
  useGetAllUsersQuery,
  useGetNotificationsQuery,
  useUpdateUserInfoMutation,
} = profileApi;
