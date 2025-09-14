import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export const deliveryOptions = [{
  id: '1', 
  deliveryDays: 7,
  priceCents: 0
}, {
  id: '2',
  deliveryDays: 3,
  priceCents: 499
}, {
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}];

function isWeekend(date) {
  if (date.day() === 6) {
    return date.add(2, 'days').format('dddd, MMMM D');
  } else if (date.day() === 0) {
    return date.add(1, 'days').format('dddd, MMMM D');
  } else {
    return date.format('dddd, MMMM D');
  }
}

export function calculateDeliveryDate(deliveryOption) {
  if (deliveryOption === '1') {
    const deliveryDate = dayjs().add(7, 'days');
      return isWeekend(deliveryDate);
  } else if (deliveryOption === '2') {
    const deliveryDate = dayjs().add(3, 'days');
    return isWeekend(deliveryDate);
  } else if (deliveryOption === '3') {
    const deliveryDate = dayjs().add(1, 'days');
    return isWeekend(deliveryDate);
  } else {
    return 'Invalid delivery option';
  }
}
