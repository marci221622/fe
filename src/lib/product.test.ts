import { Item } from '@/generated/customer_hub/entities/item.v1';
import { Size } from '@/generated/customer_hub/entities/size.v1';

import { createRowScheme } from './product';

describe('lib/product', () => {
  describe('createRowScheme', () => {
    it('should works correctly', () => {
      expect(
        createRowScheme({
          needToFullListPreparation: true,
          items: [
            // нету комента (из-за того что есть в наличии)
            // Нету тега
            // нету размера
            // Нету скидки
            Item.create({ code: `code-0`, title: `title-0`, quantity: '10' }),
            // Есть размер
            Item.create({
              code: `code-1`,
              title: `title-1`,
              size: Size.create({ vendorLabel: 'EN', russianLabel: 'RU', russianSize: '10', vendorSize: '20' }),
              quantity: '10',
            }),
            Item.create({ code: `code-2`, title: `title-2`, quantity: '0' }),
            Item.create({ code: `code-3`, title: `title-3`, quantity: '0' }),
          ],
        }),
      ).toEqual({
        perRow2: {
          'code-0': {
            tagsVisibility: false,
            sizeVisibility: true,
            hasDiscountInRow: false,
            hasComments: false,
            priceVertical: false,
            titleOnlyOneRow: true,
            hasPriceInRow: true,
          },
          'code-1': {
            tagsVisibility: false,
            sizeVisibility: true,
            hasDiscountInRow: false,
            hasComments: false,
            priceVertical: false,
            titleOnlyOneRow: true,
            hasPriceInRow: true,
          },
          'code-2': {
            tagsVisibility: false,
            sizeVisibility: false,
            hasDiscountInRow: false,
            hasComments: true,
            priceVertical: false,
            titleOnlyOneRow: false,
            hasPriceInRow: false,
          },
          'code-3': {
            tagsVisibility: false,
            sizeVisibility: false,
            hasDiscountInRow: false,
            hasComments: true,
            priceVertical: false,
            titleOnlyOneRow: false,
            hasPriceInRow: false,
          },
        },
        perRow3: {
          'code-0': {
            tagsVisibility: false,
            sizeVisibility: true,
            hasDiscountInRow: false,
            hasComments: true,
            priceVertical: false,
            titleOnlyOneRow: true,
            hasPriceInRow: true,
          },
          'code-1': {
            tagsVisibility: false,
            sizeVisibility: true,
            hasDiscountInRow: false,
            hasComments: true,
            priceVertical: false,
            titleOnlyOneRow: true,
            hasPriceInRow: true,
          },
          'code-2': {
            tagsVisibility: false,
            sizeVisibility: true,
            hasDiscountInRow: false,
            hasComments: true,
            priceVertical: false,
            titleOnlyOneRow: true,
            hasPriceInRow: true,
          },
          'code-3': {
            tagsVisibility: false,
            sizeVisibility: false,
            hasDiscountInRow: false,
            hasComments: true,
            priceVertical: false,
            titleOnlyOneRow: false,
            hasPriceInRow: false,
          },
        },
        perRow4: {
          'code-0': {
            tagsVisibility: false,
            sizeVisibility: true,
            hasDiscountInRow: false,
            hasComments: true,
            priceVertical: false,
            titleOnlyOneRow: true,
            hasPriceInRow: true,
          },
          'code-1': {
            tagsVisibility: false,
            sizeVisibility: true,
            hasDiscountInRow: false,
            hasComments: true,
            priceVertical: false,
            titleOnlyOneRow: true,
            hasPriceInRow: true,
          },
          'code-2': {
            tagsVisibility: false,
            sizeVisibility: true,
            hasDiscountInRow: false,
            hasComments: true,
            priceVertical: false,
            titleOnlyOneRow: true,
            hasPriceInRow: true,
          },
          'code-3': {
            tagsVisibility: false,
            sizeVisibility: true,
            hasDiscountInRow: false,
            hasComments: true,
            priceVertical: false,
            titleOnlyOneRow: true,
            hasPriceInRow: true,
          },
        },
        __: {
          'code-0': {
            tagsVisibility: false,
            sizeVisibility: true,
            hasDiscountInRow: false,
            hasComments: true,
            priceVertical: false,
            titleOnlyOneRow: true,
            hasPriceInRow: true,
          },
          'code-1': {
            tagsVisibility: false,
            sizeVisibility: true,
            hasDiscountInRow: false,
            hasComments: true,
            priceVertical: false,
            titleOnlyOneRow: true,
            hasPriceInRow: true,
          },
          'code-2': {
            tagsVisibility: false,
            sizeVisibility: true,
            hasDiscountInRow: false,
            hasComments: true,
            priceVertical: false,
            titleOnlyOneRow: true,
            hasPriceInRow: true,
          },
          'code-3': {
            tagsVisibility: false,
            sizeVisibility: true,
            hasDiscountInRow: false,
            hasComments: true,
            priceVertical: false,
            titleOnlyOneRow: true,
            hasPriceInRow: true,
          },
        },
      });
    });
  });
});
