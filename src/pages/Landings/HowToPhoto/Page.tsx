import cn from 'classnames';
import { useUnit } from 'effector-react';

import { $appIsShort } from '@/shared/configs';

import { landingSeo } from '@/features/landings';

import { Typography } from '@/ui/index';

import { OVERALL_PLAN } from './constants';

import st from './styles.module.scss';

export default function HowToPhoto() {
  const appIsShort = useUnit($appIsShort);

  return (
    <>
      <landingSeo.Seo />

      <section className={st.section}>
        <Typography.PageTitle
          className={cn(st.pageTitle, {
            [st.navigationDisabled]: appIsShort,
          })}
        >
          Подробнее о сьемке
        </Typography.PageTitle>

        <div>
          {OVERALL_PLAN.map(item => (
            <div key={item.title}>
              <h3 className={st.title}>{item.title}</h3>
              {item.content.map(description => (
                <div key={description.text}>
                  <p className={st.text}>{description.text}</p>
                  <div
                    className={cn(st.imagesContainer, {
                      [st.col3]: description.photos.length === 3,
                    })}
                  >
                    {description.photos.map((photo, index) => (
                      <div className={st.imageWrapper} key={index}>
                        <picture>
                          <source type="image/webp" srcSet={`${photo.mainwebp} 1x, ${photo.mainwebp2x} 2x`} />
                          <img
                            className={st.image}
                            src={photo.main}
                            srcSet={`${photo.main2x} 2x`}
                            width="148"
                            height="222"
                            alt={description.text}
                          />
                        </picture>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
