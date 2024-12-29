import cn from 'classnames';
import { useUnit } from 'effector-react';
import { useMemo } from 'react';

import { Label } from '@/generated/customer_hub/entities/label.v1';
import { $labels } from '@/shared/configs';
import { ConditionTag, Tooltip } from '@/shared/ui';

import { Typography } from '@/ui/index';

import st from './styles.module.scss';

const MAX_TAGS_LEN = 3;

function Tag({ label }: { label: Label }) {
  const labels = useUnit($labels);

  const labelText = useMemo(() => labels.find(it => it.id === +label.id), [label.id, labels]);

  return (
    <Tooltip
      label={label.value}
      tag={({ openPopup }) => <ConditionTag tag={label.value} key={label.id} onClick={openPopup} />}
    >
      <Typography.Paragraph className={st.body} center>
        {labelText?.text ?? ''}
      </Typography.Paragraph>
    </Tooltip>
  );
}

export function Tags({ labels = [], className }: { labels?: Label[]; className?: string }) {
  if (labels.length > 0) {
    return (
      <div className={cn(st.tags, className)}>
        {labels.slice(0, MAX_TAGS_LEN).map(label => (
          <Tag label={label} key={label.id} />
        ))}
      </div>
    );
  }

  return null;
}
