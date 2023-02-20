type RegExps = {
  first_name: RegExp;
  second_name: RegExp;
  login: RegExp;
  email: RegExp;
  password: RegExp;
  phone: RegExp;
  old_password: RegExp;
  new_password: RegExp;
};

const regexps = {
  first_name: /^[A-Z]{1}[a-z-]+$/,
  second_name: /^[A-Z]{1}[a-z-]+$/,
  login: /^(?=[a-zA-Z0-9_-]{3,20}$)(?!.*[_-]{2})[^_-].*[^_-]$/,
  email: /.{1,}/,
  phone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,9}$/,
  password: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,40}$/,
  old_password: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,40}$/,
  new_password: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,40}$/,
} as RegExps;

export const inputValidation = (input: HTMLInputElement): boolean => {
  const isValid = regexps[input.name as keyof RegExps].test(input.value);
  if (isValid) {
    const errorMessage = input.parentNode?.querySelector("p") as HTMLElement;
    input.className = "success";
    errorMessage.className = "success";
  } else {
    const errorMessage = input.parentNode?.querySelector("p") as HTMLElement;
    input.className = "error";
    errorMessage.className = "error";
  }
  return isValid;
};