import cn from 'classnames';
import { ReactNode } from 'react';

import { Accordion, useAccordionTrigger } from '@/ui/index';

import { Chevron } from '@/ui/assets/icons';

import st from './styles.module.scss';

type Props = {
  data: {
    title: string;
    content: {
      question: string;
      answer: ReactNode;
    }[];
  };
  hideTitle?: boolean;
  dividerClassName?: string;
  answerClassName?: string;
};

export function FaqList({ data, hideTitle, dividerClassName, answerClassName }: Props) {
  const [activePanels, { changePanels }] = useAccordionTrigger({
    isMultiply: false,
    needCloseCurrent: true,
  });

  return (
    <section>
      {!hideTitle && <h2 className={st.h2}>{data.title}</h2>}
      <div>
        <Accordion
          activePanels={activePanels}
          onChange={changePanels}
          shouldScrollToTop={false}
          containerClassName={st.accordionWrapper}
        >
          {data.content.map((item, index) => (
            /* @ts-ignore: Unreachable code error */
            <Accordion.Panel
              containerClassName={st.panelWrapper}
              titleClassName={st.panelTitleWrapper}
              title={({ isActive }) => (
                <p className={cn(st.devider, dividerClassName)}>
                  {item.question}
                  <Chevron className={cn(st.chevron)} direction={isActive ? 'right' : 'bottom'} />
                </p>
              )}
              // eslint-disable-next-line react/no-array-index-key
              key={index}
            >
              <div className={cn(st.text, answerClassName)}>{item.answer}</div>
            </Accordion.Panel>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
