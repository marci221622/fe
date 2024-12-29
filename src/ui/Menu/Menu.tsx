import cn from 'classnames';

import { Checkbox } from '../Checkbox';

import st from './menu.module.scss';

type Props = {
  className?: string;
  boxClassname?: string;
  list: {
    value: string;
    checked: boolean;
    title: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }[];
};

export function Menu({ list, className, boxClassname }: Props) {
  return (
    <div className={cn(st.menuWrapper, className)}>
      <aside className={cn(st.box, boxClassname)}>
        <ul className={cn(st.sidebarWrapper)}>
          {list.map(item => (
            <li className={cn(st.title)} key={item.value}>
              <Checkbox checked={item.checked} onChange={item.onChange} value={item.value} className={st.label}>
                {item.title}
              </Checkbox>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
