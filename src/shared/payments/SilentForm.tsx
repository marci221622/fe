import { forwardRef } from 'react';

import {
  ProcessCheckoutResponse,
  ProcessCheckoutResponse_Result,
} from '@/generated/customer_hub/methods/checkout/process_checkout.v1';

import { FRAME_PAYMEN_NAME, runtimeConfig } from '@/constants/runtimeConfig';

import st from './styles.module.scss';

type Props = {
  processResult: ProcessCheckoutResponse | null;
};

// форма для создания айфрейма с 3дс

export const SilentForm = forwardRef<HTMLFormElement, Props>(({ processResult }, ref) => {
  if (
    processResult?.threedsData &&
    processResult?.result === ProcessCheckoutResponse_Result.PROCESS_RESULT_3DS_PENDING
  ) {
    return (
      <form
        action={processResult.threedsData.acsUrl}
        method="post"
        target={FRAME_PAYMEN_NAME}
        className={st.silentForm}
        ref={ref}
      >
        <input type="text" name="PaReq" value={processResult.threedsData.paReq} />
        <input type="text" name="MD" value={processResult.threedsData.transactionExtId} />
        <input type="text" name="TermUrl" value={`${runtimeConfig.HOSTNAME}/payment-term`} />
      </form>
    );
  }

  return null;
});
