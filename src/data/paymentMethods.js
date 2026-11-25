// Shared storefront payment catalog. Recurring subscriptions retain their
// existing bank_transfer payload ID for backward compatibility.
export const paymentMethods = [
  ['cash','Կանխիկ','Վճարում ստանալիս'],
  ['card','Բանկային քարտ','Visa · MasterCard'],
  ['idram','Idram','Արագ վճարում'],
  ['telcell','TelCell','Վճարում TelCell-ով'],
  ['bank','Բանկային փոխանցում','Հարմար է կազմակերպությունների համար'],
];

const icons = { cash:'banknote', card:'card', idram:'wallet', telcell:'mobile', bank:'building' };

export function recurringPaymentOptions(customerType) {
  return paymentMethods
    .filter(([id]) => customerType === 'corporate' ? id === 'bank' : id !== 'bank')
    .map(([id,label,description]) => ({
      id:id === 'bank' ? 'bank_transfer' : id,
      label,
      description,
      icon:icons[id],
    }));
}

export function normalizeRecurringPayment(customerType, value) {
  const options = recurringPaymentOptions(customerType);
  const id = value === 'bank' ? 'bank_transfer' : value;
  return options.some(option => option.id === id) ? id : options[0].id;
}

export function recurringPaymentLabel(customerType, value) {
  const id = normalizeRecurringPayment(customerType,value);
  return recurringPaymentOptions(customerType).find(option => option.id === id).label;
}
