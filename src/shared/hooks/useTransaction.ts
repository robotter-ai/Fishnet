import { useState } from 'react';
import { parseEther } from 'viem';
import { usePrepareSendTransaction, useSendTransaction } from 'wagmi';

export default () => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  // const { owner, price } = useAppSelector(
  //   (state) => state.datasets.dataDetails
  // );
  const [dataPrice, setPrice] = useState<number>(0);
  const [recipientAddress, setRecipientAddress] =
    useState<string>('hashtagggsomething');
  const { config } = usePrepareSendTransaction({
    to: recipientAddress,
    value: dataPrice !== undefined ? parseEther(`${dataPrice}`) : undefined,
  });
  const { sendTransaction } = useSendTransaction(config);
  return { setPrice, setRecipientAddress, sendTransaction };
};
