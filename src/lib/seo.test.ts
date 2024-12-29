import { filtersCodes } from '@/constants/hardcode';

import { indexMetaNeeded, needToRemoveCanonical } from './seo';

describe('lib/seo', () => {
  describe('indexMetaNeeded', () => {
    const cases = {
      aloneParam: '?x=1',
      manyParams: '?x=1&y=2',
      manyParamsWithBrands: `?x=1&${filtersCodes.brands}=test`,
      brandsOnly: `?${filtersCodes.brands}=test`,
      manyBrands: `?${filtersCodes.brands}=A.+Testoni%2Cadidas`,
      emptySearch: ``,
    };

    it('cases should completed', () => {
      expect(indexMetaNeeded(cases.aloneParam)).toBe(true);
      expect(indexMetaNeeded(cases.manyParams)).toBe(true);
      expect(indexMetaNeeded(cases.manyParamsWithBrands)).toBe(true);
      expect(indexMetaNeeded(cases.manyBrands)).toBe(true);
      // только если один бренд удаляем индекс
      expect(indexMetaNeeded(cases.brandsOnly)).toBe(false);

      expect(indexMetaNeeded(cases.emptySearch)).toBe(false);
    });
  });

  describe('needToRemoveCanonical', () => {
    const cases = {
      aloneParam: '?x=1', // не убираем каноникал
      manyParams: '?x=1&y=2', // не убираем каноникал
      manyParamsWithBrands: `?x=1&${filtersCodes.brands}=test`, // не убираем каноникал
      brandsOnly: `?${filtersCodes.brands}=test`, // убираем каноникал
      manyBrands: `?${filtersCodes.brands}=A.+Testoni%2Cadidas`, // не убираем каноникал
    };

    it('cases should completed', () => {
      expect(needToRemoveCanonical(cases.aloneParam)).toBe(false);
      expect(needToRemoveCanonical(cases.manyParams)).toBe(false);
      expect(needToRemoveCanonical(cases.manyParamsWithBrands)).toBe(false);
      expect(needToRemoveCanonical(cases.manyBrands)).toBe(false);
      // только если один бренд удаляем индекс
      expect(needToRemoveCanonical(cases.brandsOnly)).toBe(true);
    });
  });
});
