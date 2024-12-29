import cn from 'classnames';

import { Label } from '@/generated/customer_hub/entities/label.v1';

import { ConditionTag } from '../ConditionTag';

import st from './styles.module.scss';

const MAX_TAGS_LEN = 3;

export function ProductLabels({ labels = [], className }: { labels?: Label[]; className?: string }) {
  if (labels.length > 0) {
    return (
      <div className={cn(st.tags, className)}>
        {labels.slice(0, MAX_TAGS_LEN).map(label => (
          <ConditionTag tag={label.value} key={label.id} />
        ))}
      </div>
    );
  }

  return null;
}
