import { render } from '@testing-library/react';

import { TestsWrapper } from '../../../tests';

import { OrderAgreement } from './View';

describe('@/shared/OrderAgreement', () => {
  it('renders correctly', () => {
    const { asFragment } = render(<OrderAgreement />, {
      wrapper: TestsWrapper,
    });

    expect(asFragment()).toMatchInlineSnapshot(`
     <DocumentFragment>
       <p
         class="undefined"
         role="presentation"
       >
         Оформляя заказ, я соглашаюсь с 
         <a
           href="/terms"
           target="_blank"
         >
           Условиями продажи и возврата товара
         </a>
       </p>
     </DocumentFragment>
  `);
  });
});
