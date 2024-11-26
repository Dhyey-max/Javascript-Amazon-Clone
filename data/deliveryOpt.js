export function getDeliveryOption(deliveryId) {
  let matchingId;

  deliveryOptions.forEach((deliveryOption) => {
    if (deliveryId === deliveryOption.id) {
      matchingId = deliveryOption;
    }
  });

  return matchingId;
}

export const deliveryOptions = [{
  id: '1',
  deliveryTime: 7,
  priceCents: 0
}, {
  id: '2',
  deliveryTime: 3,
  priceCents: 499,
}, {
  id: '3',
  deliveryTime: 1,
  priceCents: 999
}]