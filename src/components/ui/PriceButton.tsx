/* eslint-disable react/require-default-props */
import { PriceTagIcon } from '@assets/icons';
import TextInput from '@components/form/TextInput';
import useModal from '@shared/hooks/useModal';
import useTransaction from '@shared/hooks/useTransaction';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Slide, toast } from 'react-toastify';
import AppModal from './AppModal';
import CustomButton from './Button';

export default function PriceButton({
  price,
  paymentTrigger,
}: {
  price: string;
  paymentTrigger?: boolean;
}) {
  const { setPrice } = useTransaction();
  const [fieldPrice, setFieldPrice] = useState(0);
  const { isOpen, handleOpen, handleClose } = useModal();
  const navigate = useNavigate();
  useEffect(() => {
    setPrice(price);
  }, []);
  const handleInput = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    // Regular expression to match only numbers and decimal inputs
    const regex = /^[0-9]*\.?[0-9]*$/;

    const inputValue = event.target.value;
    setFieldPrice(Number(inputValue));

    // Validate the input against the regular expression
    if (!regex.test(inputValue)) {
      event.preventDefault();
      setFieldPrice(0);
      toast.error('Kindly enter a number', {
        hideProgressBar: true,
        autoClose: 2000,
        theme: 'light',
        transition: Slide,
      });
    }
  };
  return paymentTrigger ? (
    <>
      <div
        className="flex gap-3 items-center"
        role="button"
        onClick={() => {
          handleOpen();
        }}
      >
        <div className="h-[30px] w-[30px] flex items-center justify-center bg-{#E6FAFF} rounded-full">
          <PriceTagIcon />
        </div>
        <p className="text-dark">{price} USDC </p>
      </div>
      <AppModal
        title="Payment Settings"
        isOpen={isOpen}
        handleClose={handleClose}
      >
        <p className="my-[20px] text-sm">The network fee: &lt;1-5%&gt;</p>
        <TextInput
          placeholder=""
          label="enter your price"
          fullWidth
          bgColor="#0093A714"
          withRoundBorder
          inputType
          value={fieldPrice}
          onChange={(e) => handleInput(e)}
        />
        <div className="flex flex-col mt-[20px] gap-4">
          <CustomButton
            size="lg"
            fullWidth
            onClick={() => {
              handleClose();
              navigate('/data?tab=published');
            }}
          >
            <div className="flex justify-center gap-3 items-center">
              <span>Save</span>
            </div>
          </CustomButton>
        </div>
      </AppModal>
    </>
  ) : (
    <div
      className="flex gap-3"
      role="button"
    >
      <div className="h-[30px] w-[30px] flex items-center justify-center bg-{#E6FAFF} rounded-full">
        <PriceTagIcon />
      </div>
      <p className="text-dark">{price} USDC </p>
    </div>
  );
}
