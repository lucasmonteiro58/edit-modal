export const phoneMask = (phone: string) => {
  let p = String(phone);

  p = p.replace(/\D/g, "");
  p = p.replace(/^(\d{2})(\d)/g, "($1) $2");
  p = p.replace(/(\d)(\d{4})$/, "$1-$2");

  return p;
};

export const onlyNumbers = (number: string) => {
  let p = String(number);
  p = p.replace(/\D/g, "");
  return p;
};
