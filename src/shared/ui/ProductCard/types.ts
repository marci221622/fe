import { ComponentPropsWithoutRef, ReactNode } from 'react';

import { Money } from '@/generated/common/money.v1';
import { Item } from '@/generated/customer_hub/entities/item.v1';

export type ProductCardPropsImage = { small: string; large?: string; middle?: string };

type ProductCardBaseProps = {
  product: Item;
  action?: (params: { className: string }) => ReactNode;
  // Описание в стилях
  type?: 'large' | 'middle' | 'minimal' | 'default' | 'desktopOnlyMinimal';
  hasItem?: boolean;
  isCollected?: boolean;
  inFavorite?: boolean;
  handleFavorite?: (params: {
    id: string;
    isActive: boolean;
    price?: Money;
    title: string;
    size?: string;
    offerId?: string;
  }) => void;
  // Поля что бы схлопнуть или не схлопнуть данные в ряду
  tagsVisibility?: boolean;
  sizeVisibility?: boolean;
  hasDiscountInRow?: boolean;
  hasComments?: boolean;
  brandVisibility?: boolean;
  priceVisibility?: boolean;
  titleOnlyOneRow?: boolean;
  priceDirection?: 'horizontal' | 'vertical';
  /**
   * Выводим вместо цены какую то строку из ФБ
   */
  priceByRequestDescription?: string;
  openInNewTab?: boolean;
} & Omit<ComponentPropsWithoutRef<'a'>, 'id' | 'title' | 'onClick'>;

export type ProductCardProps = ProductCardBaseProps &
  Omit<ComponentPropsWithoutRef<'div'>, 'id' | 'title' | 'onClick'> & { onClick?: (item: Item) => void };
