import { AppVariant } from '@/shared/configs';

import { HEADERS } from './constants';
import { resolveAppVariant } from './variant-resolver';

describe('server/app-variant-resolver', () => {
  it('should return full variant', () => {
    const variant = resolveAppVariant({});

    expect(variant).toBe(AppVariant.full);
  });

  it(`should return short variant by deprecated header: ${HEADERS.deprecatedHeader}`, () => {
    expect(
      resolveAppVariant({
        [HEADERS.deprecatedHeader]: '0',
      }),
    ).toBe(AppVariant.short);
    expect(
      resolveAppVariant({
        [HEADERS.deprecatedHeader]: '1',
      }),
    ).toBe(AppVariant.short);
    expect(
      resolveAppVariant({
        [HEADERS.deprecatedHeader]: 'true',
      }),
    ).toBe(AppVariant.short);
    expect(
      resolveAppVariant({
        [HEADERS.deprecatedHeader]: 'false',
      }),
    ).toBe(AppVariant.short);
  });

  it(`should return full variant by header: ${HEADERS.appVariantHeader} (value incorrect)`, () => {
    const variant = resolveAppVariant({
      [HEADERS.appVariantHeader]: '1',
    });

    expect(variant).toBe(AppVariant.full);
  });

  it(`should return short variant by header: ${HEADERS.appVariantHeader} (value correct)`, () => {
    const variant = resolveAppVariant({
      [HEADERS.appVariantHeader]: 'short',
    });

    expect(variant).toBe(AppVariant.short);
  });

  it(`should return full variant by header: ${HEADERS.appVariantHeader} (value correct)`, () => {
    const variant = resolveAppVariant({
      [HEADERS.appVariantHeader]: 'full',
    });

    expect(variant).toBe(AppVariant.full);
  });
});
