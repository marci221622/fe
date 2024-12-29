import { createField } from '@/lib/createField';

export type AdditionalHeaderTitle =
  | {
      type: 'text';
      rows: string[];
    }
  | {
      type: 'image';
      src: string;
    }
  | null;

export const additionalTitle = createField<AdditionalHeaderTitle>(null);
