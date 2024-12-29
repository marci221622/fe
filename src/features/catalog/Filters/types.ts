import { CatalogFilter_Value } from '@/generated/customer_hub/entities/catalog_filter.v1';

export type DraftFilters = Record<string, CatalogFilter_Value[]> & { collections: string[] };
