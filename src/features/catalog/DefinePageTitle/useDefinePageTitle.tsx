import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { FiltersScheme } from '@/shared/catalog';

import { filtersCodes } from '@/constants/hardcode';

export const useDefinePageTitle = (filters: FiltersScheme, title: string) => {
  const location = useLocation();

  const brandCode = Object.fromEntries(new URLSearchParams(location.search))[filtersCodes.brands];
  const selectedBrandsCount = brandCode?.split(',').length;
  const hasFilters = !!filters.brands;
  const updatedTitle = useMemo(() => {
    if (selectedBrandsCount === 1 && hasFilters) {
      const currentBrand = filters.brands?.values.find(brand => brand.selected);
      const brandLabel = currentBrand?.label;

      return `${title} ${brandLabel}`;
    }

    return title;
  }, [selectedBrandsCount, hasFilters, filters, title]);

  return updatedTitle;
};
