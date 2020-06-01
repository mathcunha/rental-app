const FormControlValidation = (err, formControl) => {
  let message = "";
  let visibility = "hidden";
  const status = err ? err.json.status : 0;
  if (status === 400) {
    if (err.json.errors) {
      for (let index = 0; index < err.json.errors.length; index++) {
        const element = err.json.errors[index];
        if (element.property === formControl) {
          message = element.message;
          visibility = "visible";
        }
      }
    } else if (err.json.message.includes(`${formControl}`)) {
      message = `invalid ${formControl} value`;
      visibility = "visible";
    }
  }
  if (status === 409) {
    if (err.json.message.includes(`_${formControl}`)) {
      message = `${formControl} already in use`;
      visibility = "visible";
    }
  } else if (status === 500) {
    const paragraph = err.json.trace ? err.json.trace : err.json.message;
    const pattern = `'.+', propertyPath=${formControl}`;
    const regex = new RegExp(pattern, "g");
    const found = paragraph.match(regex);
    if (found !== null) {
      visibility = "visible";
      for (let index = 0; index < found.length; index++) {
        message = found[index].replace(`, propertyPath=${formControl}`, "");
      }
    }
  }
  return message;
};

export default FormControlValidation;
