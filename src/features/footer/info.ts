import { MessageDescriptor } from '@lingui/core';
import { defineMessage } from '@lingui/macro';

import { FooterLinks } from '@/shared/configs';
import { DescriptionModals } from '@/shared/description-modals';

import { paths } from '@/constants/paths';

export type InfoLink = {
  text: MessageDescriptor;
  href?: string;
  command?: string;
  target?: string;
};

export type InfoItem = {
  title: MessageDescriptor | string;
  links: InfoLink[];
};

type Props = {
  customer: FooterLinks;
  seller: FooterLinks;
};

export function buildFooterInfo({ customer, seller }: Props) {
  return [
    {
      title: defineMessage({ message: 'О tsum collect' }),
      links: [
        { text: defineMessage({ message: 'Гарантия подлинности' }), command: DescriptionModals.Garantie },
        { text: defineMessage({ message: 'Вопросы и ответы' }), href: paths.landings.faq() },
      ],
    },
    {
      title: defineMessage({ message: 'Покупателям' }),
      links: [
        { text: defineMessage({ message: 'Оплата' }), command: DescriptionModals.Payment },
        { text: defineMessage({ message: 'Доставка' }), command: DescriptionModals.Delivery },
        { text: defineMessage({ message: 'Возврат' }), command: DescriptionModals.Returns },
        ...(customer.enabled
          ? customer.links.map(link => ({ text: link.title, href: link.link, target: link.target }))
          : []),
      ],
    },
    {
      title: defineMessage({ message: 'Продавцам' }),
      links: [
        { text: defineMessage({ message: 'Продать вещь' }), href: paths.landings.seller() },
        ...(seller.enabled
          ? seller.links.map(link => ({ text: link.title, href: link.link, target: link.target }))
          : []),
      ],
    },
  ] as InfoItem[];
}
