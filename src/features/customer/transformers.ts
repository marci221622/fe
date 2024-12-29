
import { Contact } from '@/generated/customer_hub/entities/contact.v1';
import { ContactType } from '@/generated/customer_hub/enums/contact_type';

type Props = {
  value: string;
  type: ContactType;
  personName: string;
  id?: string;
};

export function createContactFromValue({ value, type, personName, id }: Props): Contact {
  return {
    id: id ?? '0',
    type,
    personName,
    value,
  };
}
