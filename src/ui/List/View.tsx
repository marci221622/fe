import cn from 'classnames';
import { useUnit } from 'effector-react';
import { Link } from 'react-router-dom';

import { $mappedStrings } from '@/shared/configs';

import { Typography } from '@/ui/Typography';

import st from './styles.module.scss';

export type ListItems = {
  icon: React.JSX.Element;
  label: string;
  to?: string;
  subtitle?: string | string[];
  command?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMoreAction?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}[];

type Props = {
  items: ListItems;
  className?: string;
  subtitleClassName?: string;
  labelsSize?: 'normal' | 'small';
  labelClassName?: string;
};

export function List({ items, className, subtitleClassName, labelsSize = 'normal', labelClassName }: Props) {
  const texts = useUnit($mappedStrings);

  return (
    <ul className={cn(st.list, className, st[labelsSize])}>
      {items.map(item => {
        const key = item.to ?? item.label;
        const content = (
          <>
            <span data-icon>{item.icon}</span>
            <div
              className={cn(st.wrapper, {
                [st.oneline]: !item.subtitle,
              })}
            >
              <Typography.Paragraph className={labelClassName} bold>
                {item.label}
              </Typography.Paragraph>
              {item.subtitle &&
                (Array.isArray(item.subtitle) ? (
                  <>
                    <br />
                    {item.subtitle.map(it => (
                      <span className={cn(st.subtitle, subtitleClassName)} key={it}>
                        {it}
                      </span>
                    ))}
                  </>
                ) : (
                  <div className={st.titlesWrapper}>
                    <span className={cn(st.subtitle, subtitleClassName)}>{item.subtitle}</span>{' '}
                    {item.onMoreAction && (
                      <span className={cn(st.subtitle, st.moreAction, subtitleClassName)} onClick={item.onMoreAction}>
                        {texts.itemDetails.infoBlock.condition.linkTitle}
                      </span>
                    )}
                  </div>
                ))}
            </div>
          </>
        );

        return (
          <li key={key}>
            {item.command ? (
              <div onClick={item.command} key={`command-${key}`} className={st.action}>
                {content}
              </div>
            ) : item.to ? (
              <Link
                to={item.to}
                key={`link-${key}`}
                className={st.action}
                target={item.to.startsWith('http') ? '_blank' : '_self'}
              >
                {content}
              </Link>
            ) : (
              content
            )}
          </li>
        );
      })}
    </ul>
  );
}
