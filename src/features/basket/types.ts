import { Money } from '@/generated/common/money.v1';
import { Brand } from '@/generated/customer_hub/entities/brand.v1';
import { CartItem } from '@/generated/customer_hub/entities/cart.v1';
import { Size } from '@/generated/customer_hub/entities/size.v1';

export enum GuardSteps {
  initial,
  done,
  name,
  phone,
  address,
}

export type AddedToCartParams = {
  itemCode: string;
  offerCodes: string[];
  title: string;
  brand?: Brand;
  tsumPrice?: Money;
  finalPrice?: Money;
  size?: Size;
  place: string;
  discountPercent?: number;
};

export type RemoveFromCartParams = { items: CartItem[] };

export type ToggleSelectParams = { items: CartItem[]; selected: boolean };
