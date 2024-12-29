import { filtersCodes } from '@/constants/hardcode';

export function indexMetaNeeded(search: string) {
  if (!search) {
    return false;
  }

  try {
    const params = new URLSearchParams(search);
    const entries = [...params.entries()];
    const brands = params.get(filtersCodes.brands);

    if (brands && brands.split(',').length === 1 && entries.length === 1) {
      return false;
    }

    return true;
  } catch (_) {
    return true;
  }
}

export function needToRemoveCanonical(search: string) {
  try {
    const params = new URLSearchParams(search);
    const entries = [...params.entries()];
    const brands = params.get(filtersCodes.brands);

    if (brands && brands.split(',').length === 1 && entries.length === 1) {
      return true;
    }

    return false;
  } catch (_) {
    return false;
  }
}
