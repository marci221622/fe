import cn from 'classnames';
import { useUnit } from 'effector-react';

import { $appIsShort } from '@/shared/configs';

import { landingSeo } from '@/features/landings';

import { Typography } from '@/ui/index';

import st from './styles.module.scss';

export default function PrivatePolicyPage() {
  const appIsShort = useUnit($appIsShort);

  return (
    <>
      <landingSeo.Seo />

      <Typography.PageTitle
        className={cn({
          [st.navigationDisabled]: appIsShort,
        })}
      >
        ПОЛИТИКА ООО &laquo;МЕРКУРИ МОДА&raquo; В&nbsp;ОТНОШЕНИИ ОБРАБОТКИ ПЕРСОНАЛЬНЫХ ДАННЫХ
      </Typography.PageTitle>

      <article className={st.textWrapper}>
        <section>
          <h4>Согласие на обработку персональных данных</h4>
          <div>
            Предоставляю ООО «Меркури Мода» (ИНН 5032277847, ОГРН 1145032002390) согласие на обработку моих персональных
            данных с целью приобретения товаров в TSUM Collect (ФИО, телефон, адрес электронной почты, иные контактные
            данные).
          </div>
          <div>
            Предоставляю ООО «Меркури Мода» (ИНН 5032277847, ОГРН 1145032002390) согласие на обработку моих персональных
            данных с целью продажи товаров в TSUM Collect (ФИО, телефон, адрес электронной почты, иные контактные
            данные).
          </div>
          <h4>1.Общие положения</h4>
          <div>
            1.1. Политика Общества с ограниченной ответственностью «Меркури Мода» (далее <b>«Общество»</b>) в отношении
            обработки персональных данных (далее <b>«Политика»</b>) регулирует отношения, связанные с обработкой
            персональных данных, осуществляемой Обществом, в том числе в информационно-телекоммуникационной сети
            Интернет. Целью настоящей Политики является обеспечение защиты прав и свобод человека и гражданина при
            обработке его персональных данных, в том числе защиты прав на неприкосновенность частной жизни, личную и
            семейную тайну.
          </div>
          <div>
            1.2. Основные понятия, используемые в Политике:
            <div>
              <div>В целях настоящей Политики используются следующие основные понятия:</div>
              <div>
                <b>персональные данные</b> – любая информация, относящаяся к прямо или косвенно определенному или
                определяемому физическому лицу (<b>субъекту персональных данных</b>);
              </div>
              <div>
                <b>обработка персональных данных</b> – любое действие (операция) или совокупность действий (операций),
                совершаемых с использованием средств автоматизации или без использования таких средств с персональными
                данными, включая сбор, запись, систематизацию, накопление, хранение, уточнение (обновление, изменение),
                извлечение, использование, передачу (распространение, предоставление, доступ), обезличивание,
                блокирование, удаление, уничтожение персональных данных;
              </div>
              <div>
                <b>предоставление персональных данных</b> – действия, направленные на раскрытие персональных данных
                определенному лицу или определенному кругу лиц;
              </div>
              <div>
                <b>блокирование персональных данных</b> – временное прекращение обработки персональных данных (за
                исключением случаев, если обработка необходима для уточнения персональных данных);
              </div>
              <div>
                <b>уничтожение персональных данных</b> – действия, в результате которых становится невозможным
                восстановить содержание персональных данных в информационной системе персональных данных и (или) в
                результате которых уничтожаются материальные носители персональных данных;
              </div>
              <div>
                <b>обезличивание персональных данных</b> – действия, в результате которых становится невозможным без
                использования дополнительной информации определить принадлежность персональных данных конкретному
                субъекту персональных данных;
              </div>
              <div>
                <b>информационная система персональных данных</b> – совокупность содержащихся в базах данных
                персональных данных и обеспечивающих их обработку информационных технологий и технических средств;
              </div>
              <div>
                <b>трансграничная передача персональных данных</b> – передача персональных данных на территорию
                иностранного государства органу власти иностранного государства, иностранному физическому лицу или
                иностранному юридическому лицу;
              </div>
              <div>
                <b>кандидаты</b> – граждане, претендующие на замещение должностей в Обществе;
              </div>
              <div>
                <b>контрагенты</b> – контрагенты, потенциальные контрагенты Общества и их представители, лица
                осуществляющие любые действия по исполнению договоров, стороной которых является Общество;
              </div>
              <div>
                <b>клиенты</b> – клиенты, потенциальные клиенты, их представители и правопреемники, участники программ
                лояльности, пользователи и участники тестирования приложений;
              </div>
              <div>
                <b>обращения клиентов</b> – обращения, жалобы, заявления клиентов, поступающие в Общество по любым
                каналам связи, в том числе по почте, телефону (в т.ч. на «горячую линию»), по специальным адресам
                электронной почты для обращений клиентов, через книгу жалоб и т.д.;
              </div>
              <div>
                <b>представители ОГВ</b> – представители органов государственной власти всех уровней;
              </div>
              <div>
                <b>приложения</b> - интернет-сайт TSUM Collect{' '}
                <a href="www.collect.tsum.ru" target="_blank">
                  (www.collect.tsum.ru)
                </a>{' '}
                и мобильное приложение TSUM Collect;
              </div>
              <div>
                <b>пользователи</b> – любые физические лица - пользователи сети «Интернет», находящийся на территории
                Российской Федерации, намеревающиеся использовать или использующие приложения;
              </div>
              <div>
                <b>рекомендательные технологии</b> - применяемые в приложениях в целях персонализации клиентского опыта
                информационные технологии предоставления информации на основе сбора, систематизации и анализа сведений,
                относящихся к предпочтениям пользователей, с использованием алгоритмов, которые обрабатывают массив
                сведений о товарах или поведении пользователей по заданным правилам и формулам.
              </div>
            </div>
          </div>
          <div>
            1.3. Правовыми основаниями обработки Обществом персональных данных являются:
            <ul>
              <li>Трудовой кодекс Российской Федерации от 30.12.2001 N 197-ФЗ,</li>
              <li>Гражданский кодекс РФ,</li>
              <li>Закон РФ от 07.02.1992 N 2300-1 &quot;О защите прав потребителей&quot;,</li>
              <li>настоящая Политика,</li>
              <li>договоры, заключаемые Обществом с субъектами персональных данных,</li>
              <li>договоры, заключаемые Обществом с контрагентами.</li>
            </ul>
          </div>
          <div>
            1.4. Обработка персональных данных в Обществе осуществляется с соблюдением принципов и правил,
            предусмотренных настоящей Политикой и законодательством Российской Федерации в области персональных данных.
          </div>
          <div>
            1.5. Запросы субъектов персональных данных рассматриваются Обществом в соответствии со ст. 14 Федерального
            закона от 27 июля 2006 г. N 152-ФЗ «О персональных данных».
          </div>
        </section>

        <section>
          <h4>2. Цели обработки Обществом персональных данных</h4>
          <div>
            2.1. Обработка персональных данных осуществляется Обществом в целях:
            <div>
              2.1.1. обеспечения безопасности на территории помещений Общества, в случаях необходимости при чрезвычайных
              ситуациях, а также в целях принятия мер в связи с чрезвычайными происшествиями;
            </div>
            <div>
              2.1.2 обеспечения функционирования систем контроля и управления доступом (СКУД) в помещения Общества.
            </div>
            <div>2.1.3. организации подбора кадров;</div>
            <div>2.1.4. проведения оценки соответствия кандидатов требованиям к соответствующей должности;</div>
            <div>
              2.1.5. централизации и хранения персональных данных кандидатов и управления человеческими ресурсами;
            </div>
            <div>
              2.1.6. предоставления сотрудникам Общества, задействованным в оценке соответствия кандидатов требованиям к
              соответствующей должности, секретарям отделов для целей организации встреч;
            </div>
            <div>
              2.1.7. проверки документов и сведений, предоставленных кандидатом, путем направления запроса в учебное
              заведение, предприятие или организацию, физическому лицу, орган государственной власти, проведения
              консультаций с прежними работодателями кандидата;
            </div>
            <div>
              2.1.8. содействия в оформлении любых разрешений, свидетельств, сертификатов и прочих документов,
              необходимых для замещения должности, в том числе разрешений на работу;
            </div>
            <div>
              2.1.9. организации работы с контрагентами, в том числе при заключении и исполнении гражданско-правовых
              договоров, стороной которых, выгодоприобретателем или обязанным лицом по которым выступает Общество;
            </div>
            <div>2.1.10. проверки добросовестности контрагентов;</div>
            <div>2.1.11. проведения конкурсов, тендеров и прочих мероприятий по отбору контрагентов;</div>
            <div>
              2.1.12. разрешения спорных ситуаций в отношениях с контрагентами, в том числе в судах всех уровней.
            </div>
            <div>
              2.1.13. организации работы с клиентами, в том числе для исполнения договоров купли-продажи товаров,
              оказания услуг, осуществления расчётов, осуществления послепродажного обслуживания, информирования о
              предложениях и акциях, осуществления возврата товара, денежных средств, обеспечения участия клиентов в
              программах лояльности и рекламных акциях, содействия в продаже товаров, в том числе бывших в употреблении;
            </div>
            <div>
              2.1.14. регистрации клиентов в личном кабинете на сайте Общества в сети Интернет, создания профиля в
              приложениях, оформления заказа в Интернет-магазине, исполнения заказа, доставки заказа, отмены заказа,
              прочих операций с заказом, возврата товара, денежных средств;
            </div>
            <div>2.1.15. обработки обращений клиентов и подготовки ответов на такие обращения;</div>
            <div>2.1.16. разрешения спорных ситуаций в отношениях с клиентами, в том числе в судах всех уровней.</div>
            <div>
              2.1.17. организации оказания клиентам услуг сторонними исполнителями, в т.ч. в связи с заказом такси;
            </div>
            <div>2.1.18. централизации и хранения персональных данных клиентов;</div>
            <div>2.1.19. получения клиентами информационных рассылок;</div>
            <div>2.1.20. повышения качества обслуживания;</div>
            <div>2.1.21. предотвращения и расследования противоправных действий;</div>
            <div>
              2.1.22 разработки, тестирования и анализа работы приложений, в том числе: фиксации всех типов реакций
              клиентов при работе с приложениями посредством видео- и аудиозаписи, записи процесса работы с
              приложениями, проведения с клиентами-пользователями приложений интервью в отношении различных аспектов
              работы с приложениями, оптимизации работы приложений на основании полученных данных;
            </div>
            <div>
              2.1.23. взаимодействия по любым вопросам с любыми органами государственной власти и судами РФ и
              иностранных государств;
            </div>
            <div>
              2.1.24. обработки обращений представителей ОГВ, поступающих в Общество по любым каналам связи, в том числе
              по почте, телефону (в т.ч. на «горячую линию»), по специальным адресам электронной почты и подготовки
              ответов на такие обращения;
            </div>
            <div>
              2.1.25. обеспечения безопасности на территории помещений Общества, в том числе для организации прохода на
              территорию служебных помещений Общества;
            </div>
          </div>
        </section>

        <section>
          <h4>3. Объем и категории обрабатываемых персональных данных, категории субъектов персональных данных</h4>

          <div>
            3.1. В указанных в п. 2.1 целях Общество обрабатывает следующие категории персональных данных:
            <div>3.1.1. фамилия, имя, отчество;</div>
            <div>3.1.2. число, месяц, год рождения;</div>
            <div>3.1.3. место рождения;</div>
            <div>
              3.1.4. вид, серия, номер документа, удостоверяющего личность, наименование органа, выдавшего его, дата
              выдачи;
            </div>
            <div>3.1.5. информация о гражданстве;</div>
            <div>3.1.6. номера контактных телефонов;</div>
            <div>3.1.7. номера рабочих телефонов (стационарный, мобильный);</div>
            <div>3.1.8. номера личных телефонов (мобильный, домашний);</div>
            <div>3.1.9. контактные адреса электронной почты;</div>
            <div>3.1.10. адреса рабочей электронной почты;</div>
            <div>3.1.11. адреса личной электронной почты;</div>
            <div>3.1.12. адреса регистрации, фактического проживания;</div>
            <div>3.1.13. номер расчетного счета;</div>
            <div>3.1.14. номер банковской карты;</div>
            <div>3.1.15. фотография;</div>
            <div>
              3.1.16. сведения об участии в деятельности юридических лиц в любом качестве, в том числе в качестве
              участника/акционера;
            </div>
            <div>3.1.17. информация о наличии или отсутствии судимости;</div>
            <div>
              3.1.18. сведения об образовании, в том числе о послевузовском профессиональном образовании (наименование и
              год окончания образовательного учреждения, наименование и реквизиты документа об образовании,
              квалификация, специальность по документу об образовании);
            </div>
            <div>3.1.19. сведения о трудовой деятельности;</div>
            <div>3.1.20. сведения об ученой степени;</div>
            <div>3.1.21. информация о владении иностранными языками, степень владения;</div>
            <div>3.1.22. информация об оформленных допусках к государственной тайне;</div>
            <div>3.1.23. государственные награды, иные награды и знаки отличия;</div>
            <div>
              3.1.24. информация о наличии разрешения на работу, подтверждающего право на осуществление трудовой
              деятельности на территории какого-либо государства: номер, дата выдачи, срок действия, страна выдачи,
              разрешенные виды деятельности и территория, на которую распространяется действие разрешения;
            </div>
            <div>3.1.25. сведения о замещении должностей в системе государственной гражданской службы;</div>
            <div>
              3.1.26. иные персональные данные, сообщенные кандидатом в резюме или в процессе проверки соответствия
              кандидата требованиям к должности;
            </div>
            <div>3.1.27. идентификационный номер налогоплательщика;</div>
            <div>3.1.28. реквизиты страхового свидетельства государственного пенсионного страхования;</div>
            <div>3.1.29. сведения о занимаемой должности;</div>
            <div>3.1.30. сведения о разрешениях, свидетельствах, сертификатах и прочих аналогичных документах;</div>
            <div>3.1.31. сведения о банкротстве граждан;</div>
            <div>3.1.32. любые сведения, которые могут содержаться в общедоступных реестрах, в т.ч. в ЕГРЮЛ;</div>
            <div>3.1.33. страна происхождения;</div>
            <div>3.1.34. видео- и аудиозапись процесса доставки и передачи товара клиенту;</div>
            <div>3.1.35. иные персональные данные, сообщенные в обращениях клиента;</div>
            <div>3.1.36. видеоизображения и аудиозаписи клиента;</div>
            <div>3.1.37. уникальный код или идентификатор, который может быть присвоен оператором клиенту;</div>
            <div>
              3.1.38. перечень покупок/продаж клиента, включая все относящиеся к ним сведения, в т.ч. стоимость, способ
              оплаты, дату, время и место совершения покупки/продажи, сведения об использованной карте программы
              лояльности;
            </div>
            <div>3.1.39. вид, серия, номер документа, подтверждающего полномочия представителя ОГВ;</div>
            <div>3.1.40. иные персональные данные, сообщенные в обращениях представителей ОГВ.</div>
          </div>
          <div>
            3.2. Категории субъектов, персональные данные которых обрабатываются, с указанием для каждой категории целей
            обработки и категорий обрабатываемых персональных данных:
            <div className={st.tableWrapper}>
              <table>
                <thead>
                  <tr>
                    <th>Категории субъектов персональных данных</th>
                    <th>Цели обработки персональных данных</th>
                    <th>Категории обрабатываемых персональных данных</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>кандидаты</td>
                    <td>2.1.1, 2.1.2, 2.1.3-2.1.8</td>
                    <td>3.1.1-3.1.4; 3.1.5; 3.1.6; 3.1.9; 3.1.15-3.1.18; 3.1.19-3.1.26.</td>
                  </tr>
                  <tr>
                    <td>контрагенты</td>
                    <td>2.1.1, 2.1.2, 2.1.9-2.1.12</td>
                    <td>
                      3.1.1-3.1.4; 3.1.5; 3.1.7; 3.1.8; 3.1.10, 3.1.11; 3.1.12-3.1.14; 3.1.15-3.1.18; 3.1.27-3.1.32.
                    </td>
                  </tr>
                  <tr>
                    <td>клиенты</td>
                    <td>2.1.1, 2.1.13-2.1.22</td>
                    <td>3.1.1-3.1.4; 3.1.5; 3.1.6; 3.1.9; 3.1.12-3.1.14; 3.1.33-3.1.38.</td>
                  </tr>
                  <tr>
                    <td>представители ОГВ</td>
                    <td>2.1.1, 2.1.2, 2.1.23-2.1.25</td>
                    <td>3.1.1-3.1.4; 3.1.6; 3.1.9; 3.1.39-3.1.40.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section>
          <h4>4. Порядок и условия обработки персональных данных в Обществе</h4>
          <div>
            4.1. Для всех указанных в п. 2.1 целей обработка персональных данных в Обществе включает в себя следующие
            действия или совокупность действий: сбор, запись, систематизацию, накопление, хранение, уточнение
            (обновление, изменение), извлечение, использование, передачу (предоставление, доступ), обезличивание,
            блокирование, удаление, уничтожение персональных данных.
          </div>
          <div>
            4.2. Обработка персональных данных в Обществе осуществляется вручную и с использованием информационных
            технологий и технических средств, в частности, средств вычислительной техники, информационно-вычислительных
            комплексов и сетей, средств и систем передачи, приема и обработки персональных данных, программных средств
            (операционные системы, системы управления базами данных и т.п.), средств защиты информации (в частности –
            паролей доступа к информации).
          </div>
          <div>
            4.3. Общество принимает необходимые и достаточные организационные и технические меры для защиты персональных
            данных от неправомерного или случайного доступа, уничтожения, изменения, блокирования, копирования,
            распространения, а также от иных неправомерных действий.
          </div>
        </section>

        <section>
          <h4>5. Сроки обработки и хранения персональных данных</h4>
          <div>
            5.1. Для всех указанных в п. 2.1 целей сроки обработки и хранения персональных данных, предоставляемых в
            Общество субъектами персональных данных, указанными в п. 3.2 настоящей Политики определяются нормативными
            правовыми актами (в том числе локальными нормативными актами Общества), регламентирующими порядок их сбора и
            обработки.
          </div>
          <div>
            5.2. Обработка персональных данных прекращается в следующих случаях:
            <div>
              5.2.1. при достижении цели обработки персональных данных или в случае утраты необходимости в достижении
              цели обработки персональных данных, если иное не предусмотрено Федеральным законом от 27.07.2006 N 152-ФЗ
              &quot;О персональных данных&quot;;
            </div>
            <div>
              5.2.2. при изменении, признании утратившими силу нормативных правовых актов (в том числе локальных
              нормативных актов Общества) и/или договоров, устанавливающих правовые основания обработки персональных
              данных;
            </div>
            <div>5.2.3. при выявлении факта неправомерной обработки персональных данных;</div>
            <div>
              5.2.4. при отзыве субъектом персональных данных согласия, если в соответствии с Федеральным законом от
              27.07.2006 N 152-ФЗ &quot;О персональных данных&quot; обработка персональных данных допускается только с
              согласия.
            </div>
          </div>
          <div>
            5.3. Персональные данные субъектов персональных данных на бумажных носителях хранятся в течение сроков их
            хранения, установленных федеральными законами, иными нормативными правовыми актами Российской Федерации.
          </div>
          <div>
            5.4. Срок хранения персональных данных, внесенных в информационные системы Общества, должен соответствовать
            сроку хранения бумажных оригиналов.
          </div>
        </section>

        <section>
          <h4>
            6. Порядок уничтожения персональных данных при достижении целей обработки или при наступлении иных законных
            оснований
          </h4>

          <div>
            6.1. Установленный настоящим разделом Политики порядок уничтожения персональных данных при достижении целей
            обработки или при наступлении иных законных оснований применяется ко всем указанным в п. 2.1 Политики целям
            обработки персональных данных.
          </div>
          <div>
            6.2. Структурные подразделения Общества, которыми обрабатываются персональные данные, осуществляют
            систематический контроль и выделение содержащих персональные данные документов, подлежащих уничтожению.
          </div>
          <div>
            6.3. Вопрос об уничтожении выделенных содержащих персональные данные документов рассматривается на заседании
            экспертной комиссии Общества, которая утверждает подлежащие уничтожению документы, определяет порядок и
            сроки уничтожения документов.
          </div>
          <div>
            6.4. Уничтожение по окончании срока обработки персональных данных на электронных носителях производится
            путем механического нарушения целостности носителя, не позволяющего произвести считывание или восстановление
            персональных данных, или удалением с электронных носителей методами и средствами гарантированного удаления
            остаточной информации.
          </div>
        </section>

        <section>
          <h4>7. Предоставление согласия</h4>

          <div>
            7.1. Использование приложений означает:
            <div>
              7.1.1. согласие пользователя с настоящей Политикой; в случае несогласия пользователя с Политикой,
              использование приложений должно быть прекращено;
            </div>
            <div>
              7.1.2. согласие пользователя на обработку его персональных данных с целью участия в программе Карт
              постоянного (привилегированного) покупателя; пользователь вправе отозвать согласие путем направления
              Обществу уведомления по адресу г. Москва, ул. Петровка, д. 2, строение 1,2, по телефону{' '}
              <a href="tel:+74959337303">+7&nbsp;(495)&nbsp;933-73-03</a> или по электронной почте{' '}
              <a href="mailto:hotline@tsum.ru">hotline@tsum.ru</a>. В этом случае участие пользователя в программе Карт
              постоянного (привилегированного) покупателя прекращается, сумма покупок для поддержания статуса карты и
              баланс бонусных баллов аннулируются.
            </div>
            <div>
              7.1.3. согласие пользователя на направление рассылок рекламного и информационного характера; пользователь
              вправе отказаться от получения рекламной информации путем направления Обществу уведомления по адресу г.
              Москва, ул. Петровка, д. 2, строение 1,2, по телефону{' '}
              <a href="tel:+74959337303">+7&nbsp;(495)&nbsp;933-73-03</a> или по электронной почте{' '}
              <a href="mailto:hotline@tsum.ru">hotline@tsum.ru</a>.
            </div>
          </div>
        </section>

        <section>
          <h4>8. Обработка при помощи файлов Cookie и счетчиков</h4>

          <div>
            8.1. Файлы cookie, имеющиеся на оборудовании пользователя по любой причине, могут использоваться Обществом
            для предоставления пользователю персонализированных опций использования приложений, для рекламных или
            информационных рассылок, в статистических и исследовательских целях, а также для улучшения приложений.
          </div>
          <div>
            8.2. Пользователь осознает, что оборудование и программное обеспечение, применяемое для использования
            приложений могут обладать функцией запрещения операций с файлами cookie (для любых сайтов или для
            определенных сайтов), а также удаления ранее полученных файлов cookie.
          </div>
          <div>
            8.3. Общество вправе установить, что использование определенных опций приложений возможно лишь при условии,
            что прием и получение файлов cookie разрешены пользователем.
          </div>
          <div>
            8.4. Структура файла cookie, его содержание и технические параметры определяются на усмотрение Общества и
            могут изменяться без предварительного уведомления пользователя.
          </div>
          <div>
            8.5. Счетчики, размещенные Обществом при использовании приложений, могут использоваться для анализа файлов
            cookie пользователя, для сбора и обработки статистической информации и других целей. Технические параметры
            работы счетчиков определяются Обществом и могут изменяться без предварительного уведомления пользователя.
          </div>
        </section>

        <section>
          <h4>9. Обязанности пользователя</h4>

          <div>
            9.1. При использовании приложений пользователь обязан:
            <ul>
              <li>соблюдать положения действующего законодательства Российской Федерации и настоящей Политики;</li>
              <li>
                возмещать убытки, понесенные Обществом, другими пользователями или третьими лицами в результате
                нарушения Политики или законодательства Российской Федерации;
              </li>
              <li>
                соблюдать положения документов, регулирующих использование приложений, а также законодательство
                Российской Федерации;
              </li>
              <li>
                ознакомиться со всей информацией юридического характера, размещенной в приложениях или доступной на нем
                посредством ссылок.
              </li>
            </ul>
          </div>
          <div>
            9.2. Пользователю при использовании приложений запрещается публиковать и распространять любую информацию,
            которая:
            <ul>
              <li>
                содержит угрозы, дискредитирует, оскорбляет, порочит честь и достоинство или деловую репутацию или
                нарушает неприкосновенность частной жизни других пользователей или третьих лиц;
              </li>
              <li> нарушает права несовершеннолетних лиц;</li>
              <li>
                является непристойной, содержит нецензурную лексику, содержит порнографические изображения и тексты или
                сцены сексуального характера с участием несовершеннолетних;
              </li>
              <li>содержит сцены насилия либо бесчеловечного обращения с животными;</li>
              <li>содержит описание средств и способов суицида, любое подстрекательство к его совершению;</li>
              <li>
                пропагандирует и/или способствует разжиганию расовой, религиозной, этнической ненависти или вражды,
                пропагандирует фашизм или идеологию расового превосходства;
              </li>
              <li>содержит экстремистские материалы;</li>
              <li>
                пропагандирует преступную деятельность или содержит советы, инструкции или руководства по совершению
                преступных действий;
              </li>
              <li>
                содержит информацию ограниченного доступа, включая, но не ограничиваясь, государственной и коммерческой
                тайной, информацией о частной жизни третьих лиц;
              </li>
              <li>
                содержит рекламу или описывает привлекательность употребления наркотических веществ, информацию о
                распространении наркотиков, рецепты их изготовления и советы по употреблению;
              </li>
              <li>носит мошеннический характер;</li>
              <li>нарушает права третьих лиц на результаты интеллектуальной деятельности;</li>
              <li>нарушает права субъектов персональных данных;</li>
              <li>
                нарушает иные права и интересы граждан и юридических лиц или требования законодательства Российской
                Федерации.
              </li>
            </ul>
          </div>
          <div>
            9.2. Пользователю запрещается:
            <ul>
              <li> осуществлять массовые рассылки сообщений;</li>
              <li>
                {' '}
                использовать программное обеспечение и осуществлять действия, направленные на нарушение нормального
                функционирования технических возможностей и оборудования Общества;
              </li>
              <li>
                {' '}
                публиковать и распространять в приложениях или иным образом использовать вирусы, трояны и другие
                вредоносные программы;
              </li>
              <li> размещать в приложениях коммерческую и политическую рекламу;</li>
              <li> осуществлять иные действия, которые могут нанести вред Обществу, третьим лицам, пользователям.</li>
            </ul>
          </div>
        </section>

        <section>
          <h4>10. Правила применения рекомендательных технологий в приложениях</h4>
          <div>
            10.1. На информационном ресурсе (т.е. в приложениях) применяются рекомендательные технологии (информационные
            технологии предоставления информации на основе сбора, систематизации и анализа сведений, относящихся к
            предпочтениям пользователей сети «Интернет», находящихся на территории Российской Федерации).
          </div>
          <div>
            10.2. В целях осуществления персонализированных рекомендаций Общество получает от пользователя следующие
            сведения: о просмотренных страницах, кликах, фильтрации товаров, добавлениях товаров в корзину и/или
            избранное, поисковых запросах, а также использует сведения о сделанных пользователем заказах и выкупленных
            товарах.
          </div>
          <div>
            10.3. В целях осуществления общих рекомендаций Общество использует сведения из собственной базы данных о
            товарах, такие как: наименование, бренд, размер, цвет, цена, материал. На основе этих сведений формируются
            рекомендации, выявляющие сочетаемость и схожесть товаров друг с другом.
          </div>
          <div>
            10.4. Сведения собираются путем сохранения событий и запросов с устройств пользователей на серверы Общества
            и консолидируются в системах Общества для анализа и систематизации, а также последующего формирования
            рекомендаций на основе этих сведений, с применением специальных алгоритмов.
          </div>
          <div>
            10.5. В целях осуществления персонализированных рекомендаций Общество использует рекомендательные алгоритмы
            собственной разработки и третьих лиц, которые получают необходимые для предоставления рекомендаций сведения
            в зашифрованном виде, не имея непосредственного доступа к сведениям о пользователе и его поведении, и
            ориентируются на совокупные показатели просматриваемости, кликабельности, количества покупок, релевантности
            поисковых запросов.
          </div>
        </section>

        <section>
          <h4>11. Прочие положения</h4>
          <div>
            11.1. Общество использует для авторизации доступа к приложениям информацию из профиля пользователя (логин и
            пароль, контрольные секретный вопрос и ответ). Ответственность за сохранность данной информации, включая
            логин и пароль, несет пользователь. Любые действия, совершенные с ее использованием, считаются Обществом
            совершенными пользователем. Передача пользователем логина и пароля третьим лицам запрещена.
            <br />В случае, если пользователю стали известны логин и пароль другого пользователя, а также иная
            конфиденциальная информация о последнем, он обязан уведомить об этом Общество и не использовать ставшую
            известной ему указанную информацию.
          </div>
          <div>
            11.2. При переходе пользователей из приложений на страницы Интернет-ресурсов третьих лиц пользователь
            самостоятельно определяет пределы использования информации о нем в рамках условий и правил, определяемых
            владельцами соответствующих Интернет-ресурсов. Общество не несет ответственности за обработку персональных
            данных пользователей сайтами третьих лиц, на которые пользователь может перейти по ссылкам, доступным в
            приложениях.
          </div>
          <div>
            11.3. Все предложения или вопросы по поводу настоящей Политики, а также сообщения в связи с использованием
            рекомендательных технологий пользователь вправе направлять по адресу г. Москва, ул. Петровка, д. 2, строение
            1,2, по телефону <a href="tel:+74959337303">+7&nbsp;(495)&nbsp;933-73-03</a> или по электронной почте{' '}
            <a href="mailto:hotline@tsum.ru">hotline@tsum.ru</a>
          </div>
        </section>
      </article>
    </>
  );
}
