import {IDataset, useGetDatasetsQuery} from "@slices/dataSlice";
import CustomButton from "@components/ui/Button";
import useAuth from "@shared/hooks/useAuth";
import useDownloadDataset from "@pages/data/hooks/useDownloadDataset";
import {useAppDispatch} from "@shared/hooks/useStore";
import {useWallet} from "@solana/wallet-adapter-react";
import {useEffect, useState} from "react";
import {FISHNET_MARKETPLACE, FISHNET_MARKETPLACE_AUTH, SOLANA_CONNECTION, USDC_MINT} from "@shared/constant";
import {Buffer} from "buffer";
import {VersionedTransaction} from "@solana/web3.js";

export function DataActionButton({dataset} : {dataset: IDataset}) {
  const { address, hasValidToken } = useAuth();
  const { handleDownload, isLoading : isDownloading } = useDownloadDataset();


  return <>
    {/* eslint-disable-next-line no-nested-ternary */}
    {dataset.available && dataset.price == 0 || dataset.permission_status === 'GRANTED' ? (
      <CustomButton
        text="Download"
        btnStyle="outline-primary"
        size="sm"
        icon="download"
        isLoading={isDownloading}
        onClick={() => handleDownload(dataset)}
      />
    ) : address === undefined || !hasValidToken ?
      <CustomButton
        text="Wallet required"
        size="sm"
        icon="lock"
        btnStyle="outline-primary"
        disabled={true}
      /> : !dataset.available &&
      dataset.permission_status === 'NOT GRANTED' &&
      dataset.price === '0' ? (
        <CustomButton
          text="Request"
          size="sm"
          icon="lock"
          btnStyle="outline-primary"
        />
      ) : (
        <CustomButton
          text="Buy"
          size="sm"
          icon="buy"
          btnStyle="solid-secondary"
          onClick={() => handlePurchase(dataset)}
        />
      )}
  </>;
}