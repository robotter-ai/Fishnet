import {fishnetApi} from "@slices/fishnetApi";
import {toQueryString} from "@slices/utils";

export interface IInitProductTree {
  signer: string;
  marketplace: string;
  paymentMint: string;
  id: string;
  productPrice: number;
  feeBasisPoints: number;
  height: number;
  buffer: number;
  canopy: number;
  name: string;
  metadataUrl: string;
}

export interface IRegisterBuy {
  signer: string;
  marketplace: string;
  productId: string;
  paymentMint: string;
  seller: string;
  marketplaceAuth: string;
  rewardsActive: boolean;
  amount: number;
  name: string;
}

export interface IValidateSignature {
  signature: string;
  itemHash: string;
}

const transactionApiSlice = fishnetApi.injectEndpoints({
  endpoints: (builder) => ({
    initProductTree: builder.query<any, IInitProductTree | null>({
      query: (params) => `/tx-builder/initProductTree${toQueryString(params)}`,
      providesTags: (result, error, arg, meta) =>
        arg ? [
        { type: 'InitProductTree', id: arg.signer + arg.marketplace + arg.paymentMint + arg.id },
      ] : [],
    }),
    registerBuy: builder.query<any, IRegisterBuy | null>({
      query: (params) => `/tx-builder/registerBuy${toQueryString(params)}`,
      providesTags: (result, error, arg, meta) =>
        arg ? [
        { type: 'RegisterBuy', id: arg.signer + arg.marketplace + arg.productId + arg.paymentMint + arg.seller + arg.marketplaceAuth },
      ] : [],
    }),
    validateSignature: builder.mutation<any, IValidateSignature | null>({
      // @todo: deploy changed tx-builder and make hotfix on frontend before merging this
      query: (params) => `/tx-builder/validateSignature${toQueryString(params)}`,
      invalidatesTags: (result, error, arg, meta) =>
        arg ? [
          { type: 'Dataset' },
          { type: 'Timeseries' },
        ] : [],
    }),
  }),
});

export const {
  useInitProductTreeQuery,
  useRegisterBuyQuery,
  useValidateSignatureMutation,
} = transactionApiSlice;

