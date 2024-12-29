import { createEvent } from 'effector';
import { useUnit } from 'effector-react';
import { useDeferredValue, useEffect, useMemo, useState } from 'react';

import { $brandsList, $enrichedFavoriteBrands, toggleFavoriteBrands } from '@/shared/brands';
import { $mappedStrings } from '@/shared/configs';
import { $currentGender } from '@/shared/session';
import { Modal } from '@/shared/ui';

import { SECTION_TO_STRING } from '@/constants/hardcode';

import { usePopupState } from '@/lib/hooks';
import { filtersToAlphabetList, searchByWord, sortAlphabet } from '@/lib/string';

import { Button, Input, Tag } from '@/ui/index';

import { SearchIcon } from '@/ui/assets/icons';

import { BrandsList } from '../BrandsList';

import st from './styles.module.scss';

type Props = {
  popup: ReturnType<typeof usePopupState>;
};

export const onFavoriteBrandsApply = createEvent<void>();

export function FavoriteBrandsModal({ popup }: Props) {
  const texts = useUnit($mappedStrings);
  const brandList = useUnit($brandsList);
  const gender = useUnit($currentGender);
  const favoriteBrandsList = useUnit($enrichedFavoriteBrands);
  const onFavoriteBrand = useUnit(toggleFavoriteBrands);
  const onApply = useUnit(onFavoriteBrandsApply);
  const [search, setSearch] = useState('');
  const deferredSearch = useDeferredValue(search);

  const brandsGroup = useMemo(
    () =>
      brandList
        ? filtersToAlphabetList(
            searchByWord({
              list: brandList
                ?.filter(it => it.sections.includes(SECTION_TO_STRING[gender]))
                ?.map(it => ({ ...it, label: it.title })),
              textExtractor: brand => brand.title,
              search: deferredSearch,
            }),
          )
        : {},
    [brandList, gender, deferredSearch],
  );

  const alphabetGroup = useMemo(() => Object.keys(brandsGroup).sort(sortAlphabet), [brandsGroup]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (popup.isOpen) {
      return () => {
        setSearch('');
      };
    }
  }, [popup.isOpen]);

  return (
    <Modal
      open={popup.isOpen}
      onChange={popup.closePopup}
      header={texts.brandsTab.allBrands}
      wrapClassName={st.container}
      bodyClassName={st.body}
      className={st.wrapper}
    >
      <div className={st.header}>
        <Input
          placeholder={texts.brandsTab.searchBar.placeholder}
          Prefix={<SearchIcon />}
          value={search}
          onChange={e => setSearch(e.target.value)}
          className={st.input}
          closable={search.length > 0}
        />

        <div className={st.selected} data-scroll="allow">
          {favoriteBrandsList.map(brand => (
            <Tag
              key={brand.code}
              title={brand.title}
              active
              isToggle
              onClick={e => {
                e.stopPropagation();
                onFavoriteBrand({
                  isActive: true,
                  brandCode: brand.code,
                  section: gender,
                  brandId: brand.id,
                  brandName: brand.title,
                });
              }}
            />
          ))}
        </div>
      </div>

      <BrandsList alphabetGroup={alphabetGroup} brandsGroup={brandsGroup} desktopRowReversed symbolCentered />

      <div className={st.footer}>
        <Button
          className={st.action}
          stretch
          size="L"
          onClick={() => {
            popup.closePopup();
            onApply();
          }}
        >
          {texts.favorite.favoriteBrands.editor.button.title}
        </Button>
      </div>
    </Modal>
  );
}
