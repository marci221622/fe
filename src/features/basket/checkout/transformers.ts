import { AddressData } from '@/generated/customer_hub/entities/address.v1';
import { CartItem } from '@/generated/customer_hub/entities/cart.v1';
import { Delivery } from '@/generated/customer_hub/entities/delivery.v1';

export function groupDeliveries(deliveries: Delivery[]) {
  const groups: Record<string, Delivery[]> = {};
  const keysWeights: Record<string, number> = {};

  for (let i = 0; i < deliveries.length; i++) {
    const delivery = deliveries[i];
    // TODO deprecation - обновить с новым чекаутом
    // eslint-disable-next-line deprecation/deprecation
    const id = delivery.lots.map(lot => lot.itemCode).join(',');

    if (!groups[id]) {
      keysWeights[id] = i;
      groups[id] = [];
    }

    groups[id].push(delivery);
  }

  return {
    scheme: groups,
    groups: Object.keys(groups)
      .sort((x, y) => keysWeights[x] - keysWeights[y])
      .map(key => groups[key]),
  };
}

export function selectProductByDeliveries({ products, delivery }: { products: CartItem[]; delivery: Delivery }) {
  // TODO deprecation - обновить с новым чекаутом
  // eslint-disable-next-line deprecation/deprecation
  return products.filter(product => delivery.lots.find(lot => lot.itemCode === product.id) && product.selected);
}

export function selectAvailableDelivery(deliveries: Delivery[]): Delivery[] {
  return deliveries.filter(it => it.available);
}

export function allDeliviriesAreAvailabled(deliveries: Delivery[]) {
  return deliveries.length > 0 && deliveries.every(it => it.available);
}

export function selectCodesFromDeliviries({
  deliveries,
  date,
  time,
}: {
  deliveries: Delivery[];
  date: number;
  time: number;
}) {
  const availabledDeliviries = selectAvailableDelivery(deliveries);
  const { groups } = groupDeliveries(availabledDeliviries);

  return groups.map(group => group[date]?.deliveryIntervals[time]?.code);
}

export function getAddressFromAddressData(data?: AddressData) {
  let address = '';

  if (data?.description) {
    address = data.description;

    if (data.country) {
      address = address.replace(`${data.country},`, '').replace(`${data.country}`, '');
    }

    if (data.zip) {
      address = address.replace(`${data.zip},`, '').replace(`${data.zip}`, '');
    }
  }

  return address.trim();
}
