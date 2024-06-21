import { useState } from 'react';

export default (initialState: any) => {
  const [inputs, setInputs] = useState(initialState);

  const handleOnChange = (input: string, value: any) => {
    setInputs((prevState: any) => ({ ...prevState, [input]: value }));
  };

  return { inputs, handleOnChange };
};
