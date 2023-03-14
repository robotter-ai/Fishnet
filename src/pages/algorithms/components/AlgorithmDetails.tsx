import { useEffect } from 'react';
import dayjs from 'dayjs';
import ClickToCopy from '@components/ui/ClickToCopy';
import CustomButton from '@components/ui/Button';
import DataSummary from '@shared/components/Summary';
import TextInput from '@components/form/TextInput';
import { useAppDispatch, useAppSelector } from '@shared/hooks/useStore';
import {
  changeAlgorithmDetails,
  getAlgorithmByID,
  resetAlgorithmDetails,
  uploadgetAlgorithm,
} from '@slices/algorithmSlice';
import { useSearchParams } from 'react-router-dom';

const AlgorithmDetails = ({
  isLoadingUpload,
}: {
  isLoadingUpload: boolean;
}) => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const { algorithmDetails } = useAppSelector((state) => state.algorithm);
  const { userInfo } = useAppSelector((state) => state.profile);
  const isViewById = !!searchParams.get('details');

  useEffect(() => {
    if (isViewById) {
      if (searchParams.get('details') !== 'upload') {
        dispatch(getAlgorithmByID(searchParams.get('details') as string));
      } else {
        dispatch(resetAlgorithmDetails());
        dispatch(
          changeAlgorithmDetails({
            name: 'owner',
            value: userInfo?.username || '',
          })
        );
        dispatch(changeAlgorithmDetails({ name: 'code', value: '{data: {}}' }));
      }
    }

    return () => {
      dispatch(resetAlgorithmDetails());
    };
  }, [isViewById]);

  const summary = [
    {
      name: 'Hash',
      value: (
        <div className="flex items-center gap-[11px]">
          <p className="w-[200px] truncate">
            {algorithmDetails?.id_hash || ''}
          </p>
          <ClickToCopy text={algorithmDetails?.id_hash || ''} />
        </div>
      ),
    },
    {
      name: 'Owner',
      value: <p className="text-blue">{algorithmDetails?.owner}</p>,
    },
    {
      name: 'Creation date',
      value: (
        <p>
          {dayjs
            .unix(algorithmDetails?.timestamp || Date.now() / 1000)
            .format('DD/MM/YYYY')}
        </p>
      ),
    },
    {
      name: 'Usages',
      value: 0,
    },
  ];

  return (
    <>
      <div>
        <div className="grid grid-cols-2 gap-5">
          <div className="bg-[#FAFAFA] flex flex-col gap-4 p-6 rounded-[10px]">
            <TextInput
              label="Algorithm name"
              placeholder="Name the algorithm"
              value={algorithmDetails?.name}
              onChange={(e) =>
                dispatch(
                  changeAlgorithmDetails({
                    name: 'name',
                    value: e.target.value,
                  })
                )
              }
              fullWidth
            />
            <TextInput
              label="Description"
              placeholder="What is the algorithm about?"
              value={algorithmDetails?.desc}
              onChange={(e) =>
                dispatch(
                  changeAlgorithmDetails({
                    name: 'desc',
                    value: e.target.value,
                  })
                )
              }
              fullWidth
            />
          </div>
          <DataSummary summary={summary} />
        </div>
        <div className="bg-[#f3f3f3] w-full h-40 rounded mt-4" />
      </div>
      <div className="flex justify-center mt-5">
        <CustomButton
          text="Publish"
          size="lg"
          isLoading={isLoadingUpload}
          onClick={() => dispatch(uploadgetAlgorithm(algorithmDetails))}
        />
      </div>
    </>
  );
};

export default AlgorithmDetails;
