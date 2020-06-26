const FormControlValidation = (err, formControl) => {
  let message = "";
  const status = err ? err.json.status : 0;
  if (status === 400) {
    return err.json.data[formControl];
  }

  return message;
};

export default FormControlValidation;
