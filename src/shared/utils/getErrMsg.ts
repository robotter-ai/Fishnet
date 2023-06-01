export default (err: any) => {
  const errMsg =
    err.response && err.response.data.message
      ? err.response.data.message
      : err.message;

  return errMsg;
};
