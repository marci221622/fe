import cn from 'classnames';
import { useState } from 'react';

import { Responsive, TabLinks, Typography } from '@/ui/index';

import { FaqList } from '../FaqList';

import { useFaqData } from './data';

import st from './styles.module.scss';

const tabs = [
  {
    label: 'Купить',
    to: '#buy',
  },
  {
    label: 'Продать',
    to: '#sell',
  },
];

type Props = {
  titleClassName?: string;
  hideListTitles?: boolean;
  // Что бы показать один блок
  onlyTab?: 'buy' | 'sell' | 'profsell';
  dividerClassName?: string;
  answerClassName?: string;
};

export function Faq({ titleClassName, hideListTitles, onlyTab, dividerClassName, answerClassName }: Props) {
  const [activeTab, setActiveTab] = useState(onlyTab ?? tabs[0].to);
  const faqData = useFaqData();

  const handleTabChange = (to: string, evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    evt.preventDefault();
    setActiveTab(to);
  };

  return (
    <>
      <Typography.PageTitle className={cn(st.title, titleClassName)}>Вопросы и ответы</Typography.PageTitle>

      <Responsive.Desktop>
        <div
          className={cn(st.contentWrapper, {
            [st.onlyTab]: !!onlyTab,
          })}
        >
          {onlyTab ? (
            <FaqList
              hideTitle={hideListTitles}
              data={faqData[onlyTab]}
              dividerClassName={dividerClassName}
              answerClassName={answerClassName}
            />
          ) : (
            <>
              <FaqList
                hideTitle={hideListTitles}
                data={faqData.buy}
                dividerClassName={dividerClassName}
                answerClassName={answerClassName}
              />
              <FaqList
                hideTitle={hideListTitles}
                data={faqData.sell}
                dividerClassName={dividerClassName}
                answerClassName={answerClassName}
              />
            </>
          )}
        </div>
      </Responsive.Desktop>

      <Responsive.TabletAndBelow>
        <div className={st.contentWrapper}>
          {!onlyTab && <TabLinks tabs={tabs} active={activeTab} classname={st.segments} onClick={handleTabChange} />}

          <FaqList
            data={onlyTab ? faqData[onlyTab] : activeTab === tabs[0].to ? faqData.buy : faqData.sell}
            key={activeTab}
            dividerClassName={dividerClassName}
            answerClassName={answerClassName}
          />
        </div>
      </Responsive.TabletAndBelow>
    </>
  );
}
