import {fishnetApi} from "@slices/fishnetApi";
import {toQueryString} from "@slices/utils";

export interface IInitProductTree {
  params: {
    signer: string;
    marketplace: string;
    paymentMint: string;
    params: {
      id: string;
      productPrice: number;
      feeBasisPoints: number;
      height: number;
      buffer: number;
      canopy: number;
      name: string;
      metadataUrl: string;
    }
  }
}

export interface IRegisterBuy {
  params: {
    signer: string;
    marketplace: string;
    productId: string;
    paymentMint: string;
    seller: string;
    marketplaceAuth: string;
    params: {
      rewardsActive: boolean;
      amount: number;
      name: string;
    }
  }
}

export interface IValidateSignature {
  params: {
    signature: string;
    itemHash: string;
  }
}

const transactionApiSlice = fishnetApi.injectEndpoints({
  endpoints: (builder) => ({
    initProductTree: builder.query<any, IInitProductTree | null>({
      query: (params) => `/tx-builder/initProductTree${toQueryString(params)}`,
      providesTags: (result, error, arg, meta) =>
        arg ? [
        { type: 'InitProductTree', id: arg.params.signer + arg.params.marketplace + arg.params.paymentMint + arg.params.params.id },
      ] : [],
    }),
    registerBuy: builder.query<any, IRegisterBuy | null>({
      query: (params) => `/tx-builder/registerBuy${toQueryString(params)}`,
      providesTags: (result, error, arg, meta) =>
        arg ? [
        { type: 'RegisterBuy', id: arg.params.signer + arg.params.marketplace + arg.params.productId + arg.params.paymentMint + arg.params.seller + arg.params.marketplaceAuth },
      ] : [],
    }),
    validateSignature: builder.mutation<any, IValidateSignature | null>({
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

