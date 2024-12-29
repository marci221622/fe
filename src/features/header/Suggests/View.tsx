import { useLingui } from '@lingui/react';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import reactStringReplace from 'react-string-replace';

import { Section } from '@/generated/customer_hub/enums/section';
import { $mappedStrings } from '@/shared/configs';
import { visibleField } from '@/shared/ui/StickyBanner';

import { filtersCodes } from '@/constants/hardcode';
import { paths } from '@/constants/paths';

import { useKeyboardListIndex, useListScrollByIndex, useViewport } from '@/lib/hooks';

import { Input, InputProps, Space, Typography } from '@/ui/index';

import { ClockIcon, SearchIcon } from '@/ui/assets/icons';

import { MINIMAL_QUERY_LEN, suggestField, suggestsQuery, recentlySuggests, suggestGender } from '../models';

import { GenderActions } from './Genders';
import LastViewedWidget from './LastViewedWidget';

import st from './styles.module.scss';

const MAX_SUGGESTS_LEN = 10;

type Props = {
  popup: { onChange: (value: boolean) => void; value: boolean };
  className?: string;
  input?: (props: InputProps) => React.JSX.Element;
  device: Device;
};

// для оптимизации перерисовок выделили пустой фолбэк массив в глобальный объект
// чтобы по ссылке не было разницы
// этот массив всегда должен быть пуст
// ну и по факту в 99% случаев мы даже не попадаем в ветку кода где он нужен
// это чисто страховка, если где-то в системе накосячили со списком саджестов
const EMPTY_SUGGEST_LIST: string[] = [];

export function Suggests({ popup, className, input, device }: Props) {
  const texts = useUnit($mappedStrings);
  const { i18n } = useLingui();
  const ref = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const field = useUnit(suggestField);
  const { value: gender } = useUnit(suggestGender);
  const { result, reset } = useUnit(suggestsQuery);
  const recently = useUnit(recentlySuggests);
  const hasBanner = useUnit(visibleField.$value);
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { isDesktop } = useViewport();

  const pathPrefix = gender === Section.SECTION_FEMALE ? '/women' : '/men';

  const handleSearch = useCallback(
    (value: string) => {
      navigate(`${pathPrefix}${paths.catalog.search({ q: `${new URLSearchParams({ q: value })}` })}`);
      popup.onChange(false);
      field.onChange(value);
      inputRef.current?.blur();
    },
    [navigate, pathPrefix, popup, field],
  );

  useEffect(() => {
    const search = params.get(filtersCodes.search);

    field.onChange(search ?? '');
    // Только синхронизация
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  const showRecentsList = !field.value && !!recently?.list?.length;
  const hasRecentlyList = !!recently.list.length && popup.value && !field.value;
  const needToShowSuggests = !!result?.data?.length && popup.value && !!field.value;

  const suggestList = useMemo(
    () => (showRecentsList ? recently.list : result?.data?.slice(0, MAX_SUGGESTS_LEN) ?? EMPTY_SUGGEST_LIST),
    [recently.list, result?.data, showRecentsList],
  );

  const onSelectByIndex = useCallback(
    (index: number) => {
      const item = suggestList[index];

      if (!item) {
        return;
      }

      if (!showRecentsList) {
        recently.persist(item);
      }

      handleSearch(item);
    },
    [recently, handleSearch, showRecentsList, suggestList],
  );

  const { selectedIndex, resetIndex } = useKeyboardListIndex({
    onSelect: onSelectByIndex,
    maxLength: suggestList.length ?? 0,
    inputRef,
  });

  const inputProps = {
    value: field.value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      field.onChange(e.target.value);
      resetIndex();
    },
    onFocus: () => {
      popup.onChange(true);
    },
    onKeyUp: (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (
        event.code === 'Enter' &&
        field.value.length >= MINIMAL_QUERY_LEN &&
        // обрабатываем поиск из инпута, только если не выбрано саджестов
        selectedIndex < 0
      ) {
        handleSearch(field.value);
      }
    },
  };

  useListScrollByIndex({
    listRef: ref,
    selectedIndex,
  });

  const closePopUp = () => popup.onChange(false);

  return (
    <div
      ref={ref}
      className={cn(st.wrapper, {
        [st.withBanner]: hasBanner,
      })}
    >
      <div className={st.head}>
        {!input ? (
          <Input
            outline
            closeIcon="stroked"
            closable={field.value.length > 0}
            className={cn(st.field, className)}
            ref={inputRef}
            Prefix={<SearchIcon onClick={() => popup.onChange(true)} />}
            placeholder={texts.searchBar.placeholder.catalog}
            onClick={resetIndex}
            {...inputProps}
          />
        ) : (
          input(inputProps)
        )}
        {isDesktop && popup.value ? (
          <span onClick={closePopUp} className={st.closePopupText}>
            Закрыть
          </span>
        ) : null}

        {device === 'mobile' && <GenderActions />}
      </div>

      <div className={st.listsContainer} data-scroll="allow">
        <div
          className={cn(st.list, {
            [st.visibility]: hasRecentlyList,
          })}
        >
          <Space stretch className={st.clearHeader}>
            <Typography.Paragraph className={st.title}>{texts.searchHistory.title}</Typography.Paragraph>
            <Typography.Paragraph className={st.clear} onClick={recently.clear}>
              {texts.searchHistory.button}
            </Typography.Paragraph>
          </Space>
          <ul className={st.suggests}>
            {recently.list.map((it, index) => (
              <li
                key={`${it}_${index}`}
                role="presentation"
                className={cn({ [st.selected]: selectedIndex === index })}
                onClick={() => onSelectByIndex(index)}
              >
                <ClockIcon /> {it}
              </li>
            ))}
          </ul>
        </div>

        {device === 'mobile' && <LastViewedWidget popup={popup} />}

        <div
          className={cn(st.list, {
            [st.visibility]: needToShowSuggests,
          })}
        >
          {needToShowSuggests && (
            <ul className={st.suggests}>
              {result.data.slice(0, MAX_SUGGESTS_LEN).map((it, index) => (
                <li
                  key={it}
                  role="presentation"
                  className={cn({ [st.selected]: selectedIndex === index })}
                  onClick={() => onSelectByIndex(index)}
                >
                  <span>
                    {reactStringReplace(it, field.value.trim(), (msg, key) => (
                      <b key={key}>{msg}</b>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
