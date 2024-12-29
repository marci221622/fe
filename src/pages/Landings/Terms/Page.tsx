import cn from 'classnames';
import { useUnit } from 'effector-react';
import { Link } from 'react-router-dom';

import { $appIsShort } from '@/shared/configs';

import { paths } from '@/constants/paths';

import { landingSeo } from '@/features/landings';

import { Typography } from '@/ui/index';

import st from './styles.module.scss';

export default function TermsPage() {
  const appIsShort = useUnit($appIsShort);

  return (
    <>
      <landingSeo.Seo />

      <article className={cn(st.textWrapper, { [st.navigationDisabled]: appIsShort })}>
        <p className={st.publishedDate}>10 августа 2023</p>

        <Typography.PageTitle>Пользовательское соглашение</Typography.PageTitle>

        <section>
          <strong>Общество с ограниченной ответственностью «Меркури Мода»</strong>, ОГРН 1145032002390 , ИНН 5032277847,
          адрес места нахождения: 143082, Московская обл., г. Одинцово, д. Барвиха, дом № 114, строение 2, этаж 1,
          помещение 100, именуемое в дальнейшем «Собственник Платформы» c одной стороны, и{' '}
          <strong>Пользователь Платформы</strong> с другой стороны, совместно именуемые “Стороны”, заключили настоящее
          Пользовательское соглашение (далее по тексту – “<strong>Соглашение</strong>”) о нижеследующем:
        </section>

        <h3>Преамбула.</h3>

        <section>
          Платформа – разработанный Собственником Платформы или по заказу Собственника Платформы программно-аппаратный
          комплекс, доступный в мобильном приложении и на сайте «TSUM Collect» (далее – «Приложение», «Сайт»),
          позволяющий осуществлять взаимодействие между Собственником Платформы, Продавцами и Покупателями. Собственник
          Платформы в рамках оказания услуг Пользователям предоставляет рекомендации в отношении стоимости товаров,
          размещения объявлений о продаже и т.п., которые носят исключительно рекомендательный, информационный характер
          и направлены на создание благоприятных условий Пользователям Платформы для совершения сделок по приобретению
          товаров. Пользователь самостоятельно принимает решение обо всех условиях приобретения или продажи товара, вне
          зависимости от мнения или возможности Собственника Платформы.
        </section>

        <section>
          <h4>1. Предмет Соглашения.</h4>
          <div>
            1.1. Предметом настоящего Соглашения является предоставление права на пользование Платформой на условиях
            простой (неисключительной) лицензии в соответствии с Правилами пользования Платформой, являющимися
            приложением к настоящему Соглашению.
          </div>
          <div>
            1.2. К настоящему Соглашению применимы термины, условия и определения, приведённые в Правилах пользования
            Платформой.
          </div>
          <div>
            1.3. Права, обязанности и ответственность Сторон настоящего Соглашения определяются содержанием Правил
            пользования Платформой, настоящим Соглашением.
          </div>
        </section>

        <section>
          <h4>2. Порядок заключения Пользовательского соглашения.</h4>
          <div>
            2.1. Пользовательское соглашение считается заключенным с момента предоставления Пользователем
            безоговорочного согласия (акцепта) на его заключение – регистрации учетной записи Пользователя на Платформе.
          </div>
        </section>

        <section>
          <h4>3. Прочие положения.</h4>
          <div>
            3.1. Настоящее Соглашение считается заключенным и вступает в силу с даты его акцепта Пользователем и
            действует до его расторжения по основаниям, предусмотренным Правилами пользования Платформой и/или
            законодательством Российской Федерации.
          </div>
          <div>
            3.2. Настоящим Пользователь подтверждает, что ознакомлен с Правилами и принимает их условия без каких-либо
            возражений и исключений. При этом, после регистрации Личного кабинета Пользователь не вправе ссылаться на
            недостоверность и (или) неполноту предоставления информации, предусмотренной Правилами. В случае несогласия
            с настоящим Пользовательским соглашением Пользователь обязан немедленно прекратить использование Платформы.
          </div>
          <div>
            3.3. В связи с возможными изменениями действующего законодательства Российской Федерации, а также в целях
            создания лучших путей взаимодействия с Пользователями, либо в иных случаях, Собственник Платформы вправе в
            любое время в одностороннем порядке вносить изменения в настоящее Пользовательское соглашение путем
            публикации изменений в collect.tsum.ru/terms. Изменения вступают в силу с момента их публикации.
          </div>
        </section>

        <h5>
          <i>
            Приложение № 1<br />к Пользовательскому соглашению
          </i>
        </h5>

        <h3>Правила пользования Платформой</h3>

        <section>
          <h4>1. Термины и определения.</h4>
          <div>
            1.1. Агентский договор – договор, заключаемый между Собственником Платформы и Частным продавцом Товара.
            Агентский договор размещен в Приложении в разделе «Документы».
          </div>
          <div>
            1.2. Вознаграждение – денежная сумма, взимаемая Собственником Платформы за выполнение поручений Частного
            продавца по Агентскому договору.
          </div>
          <div>
            1.3. Договор с Покупателем – договор купли-продажи Товара (сделка купли-продажи), заключаемый между
            Продавцом и Покупателем, форма которого формируется в Личном кабинете.
          </div>
          <div>
            1.4. Законодательство – законодательство Российской Федерации, действующее в момент совершения сделки.
          </div>
          <div>
            1.5. Идентификационные данные – информация, предназначенная для идентификации Продавца в процессе
            использования Платформы. В качестве Идентификационных данных выступает номер мобильного телефона (далее –
            «Логин») и пароль. Действия, совершенные с использованием Идентификационных данных Продавца, признаются
            совершенными последним и порождают у него соответствующие права и обязанности.
          </div>
          <div>
            1.6. Личный кабинет Пользователя (Личный кабинет) – защищенная часть Платформы, создаваемая при Регистрации
            Пользователя, посредством которой осуществляется использование Платформы и взаимодействие Пользователей как
            между собой, так и с Платформой. Доступ к Личному кабинету осуществляется Пользователями посредством
            авторизации на Платформе с использованием Идентификационных данных.
          </div>
          <div>
            1.7. Платформа – разработанный Собственником Платформы или по заказу Собственника Платформы
            программно-аппаратный комплекс, доступный в Приложении и на Сайте «TSUM Collect», позволяющий Частному
            продавцу осуществлять взаимодействие с Собственником Платформы и заключать Договор с Покупателем. Платформа
            включает в себя интерфейс, программное обеспечение, доменное имя, дизайн и иные элементы, необходимые для
            надлежащего функционирования. Все исключительные права на Платформу принадлежат Собственнику Платформы. Ни
            одно из положений Договора не может рассматриваться как передача исключительных прав или предоставление
            лицензионных прав Пользователям.
          </div>
          <div>
            1.8. Покупатель – дееспособное физическое лицо, достигшее возраста 18 лет, зарегистрированное на Платформе и
            заинтересованное в приобретении Товаров.
          </div>
          <div>
            1.9. Продавец (далее по тексту «Частный продавец») – дееспособное физическое лицо, достигшее возраста 18
            лет, являющееся собственником Товара, заключившее Агентский договор с Собственником Платформы. Частный
            продавец использует Платформу в целях реализации Товара.
          </div>
          <div>
            1.10. Пользователь – Частный продавец или Покупатель, использующие Платформу в соответствии с настоящими
            Правилами.
          </div>
          <div>
            1.11. Регистрация – заполнение Пользователем Регистрационной формы путем указания необходимых сведений и
            выбора логина и пароля.
          </div>
          <div>
            1.12. Товар – объект гражданских прав - материальный объект, принадлежащий Частному продавцу или
            Собственнику Платформы по праву собственности, в том числе бывший в употреблении, не являющийся сложно
            техническим товаром и не ограниченный в обороте.
          </div>
          <div>
            1.13. Контент – фото-, видео материалы, текст и иная информация, размещаемая Собственником Платформы.
          </div>
          <div>
            1.14. Объявление – Контент, а также иная информация, размещенная Собственником Платформы на Платформе с
            предложением о продаже собственного Товара или Товара Частного продавца.
          </div>
          <div>
            1.15. Срок размещения – минимальный срок размещения Объявления для успешной реализации Товара Продавцом на
            Платформе – 6 (шесть) месяцев.
          </div>
        </section>

        <section>
          <h4>2. Общие положения.</h4>
          <div>
            2.1. Настоящие Правила пользования Платформой (Далее по тексту – «Правила») определяют порядок и условия
            использования Платформой в целях продажи и приобретения товаров для личного пользования. Пользуясь услугами
            Платформы, Пользователь полностью соглашается с условиями Пользовательского соглашения. Обработка Платформой
            персональной информации Пользователей (Идентификационных данных) регламентируется Политикой ООО «Меркури
            Мода» в отношении обработки персональных данных, размещенной по адресу &nbsp;
            <Link to={paths.landings.privacyPolicy()}>Политика в отношении обработки персональных данных</Link>.
          </div>
        </section>

        <section>
          <h4>3. Статус Продавца на Платформе.</h4>
          <div>
            3.1. Частные продавцы, являясь физическими лицами, не осуществляющими предпринимательскую деятельность,
            осуществляют продажу личных вещей, в связи с чем законодательство о защите прав потребителей не
            распространяется на продажу Товаров физических лиц на Платформе.
          </div>
        </section>

        <section>
          <h4>4. Права и обязанности Платформы.</h4>
          <div>
            4.1. Собственник Платформы вправе по своему усмотрению предпринимать любые меры по ограничению, приостановке
            или блокировке Личных кабинетов Пользователей, а также доступа к предоставляемым услугам, в том числе на
            временное или полное удаление размещенной пользователями информации, аннулирование любого статуса Личного
            кабинета, удаление или понижение значимости любых объявлений, уменьшение или аннулирование любых скидок, а
            также принятие любых технических и(или) юридических мер, которые позволяют создавать условия для правильного
            исполнения пользователями правил пользования Платформой.
          </div>
          <div>
            4.2. Собственник Платформы обязуется принимать разумные меры в целях урегулирования конфликтных ситуаций, в
            случаях их возникновения между Частным продавцом и Покупателем Товара.
          </div>
          <div>
            4.3. Собственник Платформы вправе временно отключать или иным образом изменять порядок пользования услугами
            в отношении Личных кабинетов, не использовавшихся длительное время.
          </div>
          <div>
            4.4. В отношениях с Частным продавцом Товара Собственник Платформы действует на основании заключаемого
            агентского договора, по которому агент (Собственник Платформы) совершает по поручению, от имени и за счет
            принципала (Частного продавца) необходимые действия для реализации Товара Частного продавца с использованием
            услуг Платформы.
          </div>
          <div>
            4.5. В целях исполнения Пользовательского соглашения Собственник Платформы вправе без каких-либо ограничений
            использовать любую предоставляемую Частными продавцами информацию, о товарах, в том числе, но не
            ограничиваясь описания их свойств, стоимость, недостатки и т.д., путем предоставления Собственнику Платформы
            неисключительного, бессрочного, безотзывного, безвозмездного права использования указанных сведений, как в
            части так и в полном объеме.
          </div>
          <div>
            4.6. Собственнику Платформы принадлежат исключительные права на контент, размещенный на Платформе.
            Запрещается использование контента третьими лицами, включая Частного продавца, без письменного согласия
            Собственника Платформы.
          </div>
        </section>

        <section>
          <h4>5. Права и обязанности Пользователей.</h4>
          <div>
            5.1. При использовании Платформы каждый Пользователь обязуется не допускать совершение следующих действий:
            <div>
              5.1.1. в отношении реализуемых товаров Частные продавцы обязуются соблюдать требования действующего
              законодательства и права третьих лиц;
            </div>
            <div>5.1.2. отказываться от оплаты купленного Товара без достаточных на то оснований;</div>
            <div>5.1.3. заключать сделки купли-продажи без намерения купить Товар;</div>
            <div>
              5.1.4. предоставлять недостоверную, ложную, неточную, вводящую в заблуждение, оскорбительную или иную,
              каким-либо образом нарушающую права третьих лиц, информацию о Товаре;
            </div>
            <div>5.1.5. передавать сведения для входа Личного кабинета третьим лицам;</div>
            <div>5.1.6. распространять или пересылать массовую рассылку рекламных объявлений другим Пользователям;</div>
            <div>
              5.1.7. распространять и использовать любое вредоносное программное обеспечение или иным способом создавать
              условия для причинения вреда Платформе или ее Пользователям;
            </div>
            <div>
              5.1.8. нарушать права интеллектуальной собственности – авторские права, права на товарные знаки, патентные
              права, права на публичное использование, права на базы данных и прочие права интеллектуальной
              собственности, принадлежащие Собственнику Платформы или другим правообладателям;
            </div>
            <div>5.1.9. собирать или распространять данные о Пользователях Платформы.</div>
            <div>5.1.10. передавать для размещения на Платформе не подлинные Товары брендов.</div>
          </div>
          <div>
            5.2. Частный продавец гарантирует, как Собственнику Платформы, так и Покупателям, что предоставляемый к
            продаже Товар не продан, не заложен, не находятся в споре, под арестом, запретом и(или) ином обременении не
            состоит, свободен от претензий третьих лиц, не ограничен в обороте.
          </div>
          <div>
            5.3. Пользователи вправе получать от Собственника Платформы необходимую информацию о работе сервиса, порядке
            и условиях оказания услуг, способах реализации, предусмотренных Правилами прав и обязанностях, а также любым
            способом оказывать информационное взаимодействие с Платформой и(или) ее представителями.
          </div>
          <div>
            5.4. При возникновении спорных, иных конфликтных ситуаций, Пользователи обязуются соблюдать все необходимые
            примирительные процедуры, в том числе и по досудебному урегулированию споров. Пользователи в порядке
            информационного взаимодействия вправе привлекать Собственника Платформы для участия в разрешении любых
            спорных ситуаций.
          </div>
          <div>
            5.5. Право собственности на приобретаемый посредством Платформы Товар переходит от Собственника Платформы
            или Частного Продавца к Покупателю в момент получения Товара.
          </div>
        </section>

        <section>
          <h4>6. Исключительные права Платформы.</h4>
          <div>
            6.1. Собственник Платформы оставляет за собой право связываться с Пользователями посредством направления
            текстовых и(или) голосовых сообщений по любому предоставленному Пользователем номеру телефона, электронной
            почте или путем отправки личного сообщения на Платформе, в том числе, но не ограничиваясь, в следующих
            случаях: согласование коммерческих условий в рамках исполнения Агентского договора; подтверждение передачи
            Товара от Продавца Собственнику Платформы; согласование Отчета Агента; уведомления о состоянии и устранении
            проблем с учетной записью; возникновения конфликтных ситуаций и разрешения споров между пользователями;
            изучение персональных мнений пользователей об услугах Платформы; существенного изменения объема и качества
            предоставляемых услуг Пользователям, которые могут повлиять на совершение сделок купли-продажи Товаров.
          </div>
          <div>
            6.2. В целях защиты прав Покупателя от рисков недобросовестного поведения Частного Продавца, а также продажи
            некачественного товара Платформа, в рамках, возложенных на нее агентских обязательств Частным продавцом
            (принципалом) вправе не производить выплату стоимости Товара Частному продавцу до момента принятия Товара
            Покупателем.
          </div>
        </section>

        <section>
          <h4>7. Общие условия купли-продажи товаров.</h4>
          <div>
            7.1. В момент заказа Покупатель имеет возможность уточнить любые детали и задать любые вопросы о Товаре с
            применением функционала Платформы.
          </div>

          <div>
            7.2. При передаче Товаров для дальнейшей продажи на Платформе, Частный продавец обязуется соблюдать
            следующие условия:
            <div>
              7.2.1. предоставлять в распоряжение Идентификационные данные Частного Продавца, гарантируя достоверность
              предоставляемых сведений.
            </div>
            <div>
              7.2.2. Частный продавец принимает на себя ответственность за качество и подлинность предоставляемого к
              продаже Товара;
            </div>
            <div>
              7.2.3. Частный продавец обязан при оформлении заявки на продажу Товара по средствам Приложения указать о
              состоянии Товара (новое, б/у), наличии бирки и любых недостатках товара, в том числе предоставить
              исчерпывающую информацию о свойствах Товара, его качестве, отличительных характеристиках, любых
              недостатках, размерах и(или) габаритах, условиях продажи, сроках использования Товара, его
              местонахождении, о любых правах третьих лиц на продаваемый товар, о юридической правоспособности Частного
              продавца к реализации как конкретного товара, так и совершения сделок в целом;
            </div>
            <div>
              7.2.4. отказ Частного продавца от совершения сделки купли-продажи не допускается и возможен лишь с
              согласия Покупателя и(или) Собственника Платформы;
            </div>
            <div>
              7.2.5. отказ Частного Продавца от предоставления дополнительной информации о товаре, его отличительных
              чертах, свойствах, качестве и т.д. не допускается;
            </div>
          </div>
          <div>
            7.3. Приобретая Товар, Покупатель обязуетесь соблюдать следующие условия:
            <div>
              7.3.1. перед оформлением покупки и осуществлением оплаты Товара Покупатель обеспечивает внимательное
              ознакомление со всеми сведениями, отраженными в объявлении о продаже Товара. Если Покупатель приобретает
              Товар, бывший в употреблении, то он должен осознавать, что такой Товар может иметь иные следы
              использования, не влияющие на дальнейшую эксплуатацию Товара.
            </div>
            <div>
              7.3.2. вступая в имеющий юридическую силу договор купли-продажи товара, Покупатель подтверждает свою
              полную правоспособность и дееспособность:
              <ul>
                <li>оплачивать Товар</li>
                <li>произвести приемку Товара</li>
                <li>проверить качество Товара в момент приемки Товара;</li>
                <li>
                  подтверждать Собственнику Платформы факт принятия товара без разногласий, что является основанием для
                  проведения выплаты стоимости товара Частному продавцу, а при отсутствии подтверждения в течение 1
                  (Одного) календарного дня лишаться возможности ссылаться на любые недостатки Товара, в качестве
                  основания для разногласий с Продавцом.
                </li>
              </ul>
            </div>
            <div>
              7.4. Порядок оформления сделки – Договора купли-продажи Товара на Платформе:
              <div>
                7.4.1. в целях приобретения или реализации Товара Пользователи регистрируются на Платформе посредством
                принятия условий пользовательского соглашения, предоставления Идентификационной информации Пользователя
                с последующим созданием Личного кабинета;
              </div>
              <div>
                7.4.2. при последующих посещениях Платформы Пользователи проходят процедуру авторизации в Личном
                кабинете, после чего получают возможность совершать покупки и(или) размещать Товары к продаже;
              </div>
            </div>
            <div>
              7.3.4 отказ Продавца от совершения сделки не допускается и возможен лишь с согласия Покупателя и(или)
              Платформы;
            </div>
            <div>
              7.3.5 отказ Продавца от предоставления дополнительной информации о товаре, его отличительных чертах,
              свойствах, качестве и т.д. не допускается;
            </div>
          </div>

          <div>7.5. Договор купли-продажи считается заключенным с момента осуществления оплаты Товара Покупателем.</div>

          <div>
            7.6. Датой оплаты Товара является дата списания денежных средств со счета Покупателя. Собственник Платформы
            участвует в расчетах на основании Агентского договора, заключенного с Продавцом
          </div>
        </section>

        <section>
          <h4>8. Доставка Товара.</h4>

          <div>
            8.1. В сроки, указанные на Платформе, Собственник Платформы организовывает доставку Товара Покупателю.
          </div>

          <div>
            8.2. Доставка Товара осуществляется силами Собственника Платформы, курьерскими или транспортными компаниями
            на адрес, указанный Покупателем. Покупатель несет ответственность за корректность представленных данных.
          </div>

          <div>
            8.3. Расходы на доставку несет Покупатель. Стоимость доставки определяется согласно Тарифам на доставку,
            размещенным в разделе «Доставка».
          </div>

          <div>
            8.4. Обязанность по доставке считается исполненной в момент передачи Товара Покупателю курьерской службой.
            Обязанность по оказанию услуги по доставке считается исполненной в момент фактического визита курьера по
            адресу, указанному Покупателем. Отсутствие Покупателя по представленному адресу в момент доставки не
            отменяет факт оказания услуг по доставке Платформой. Повторную Доставку Покупатель оплачивает отдельно.
          </div>
        </section>

        <section>
          <h4>9. Приемка Товара.</h4>

          <div>
            9.1. При доставке Товар вручается Покупателю или Получателю, находящемуся по указанному Покупателем адресу.
            Лицо, доставляющее Товар, не обязано проверять полномочия Получателя на прием Товара, если Получатель
            находится по адресу доставки.
          </div>

          <div>
            9.2. При приеме Товара Покупатель (Получатель) обязан осмотреть Товар на предмет наличия и целостности
            упаковки. В случае повреждений упаковки и иных дефектов Покупатель (Получатель) обязан сделать
            соответствующие пометки в товаросопроводительных документах или составить отдельный акт о порче упаковки. В
            противном случае последующие претензии о некомплектности или повреждении Товара Продавцом или Платформой не
            принимаются.
          </div>

          <div>
            9.3. При наличии претензий к внешнему виду и комплектности товара, которые не были оговорены Продавцом или
            Собственником Платформы в описании товара, Покупатель может отказаться от приобретения Товара до момента
            передачи Товара.
          </div>

          <div>
            9.4. В случае отсутствия Претензий, Покупатель (Получатель) обязан принять Товар по наименованию, количеству
            и ассортименту в момент его приемки, о чем проставляет подпись в товаросопроводительных документах,
            подтверждая, что не имеет претензий к внешнему виду, наименованию, количеству и комплектности Товара, а
            также ознакомлен с правилами возврата (обмена) Товара.
          </div>

          <div>
            9.5. Условия возврата Товаров Продавцу:
            <div>
              9.5.1 Возврат (обмен) Товара, приобретенного у Частного продавца (физического лица), невозможен после его
              получения и подписания товаросопроводительных документов. Такие товары имеют пометку «Частный продавец».
              Собственник Платформы не осуществляет возврат денежных средств по претензиям Покупателя, связанным с
              качеством, ассортиментом или количеством Товара, если указанные недостатки были оговорены в описании
              Товара.
            </div>
            <div>
              9.5.2. Покупатель вправе отказаться от Товара надлежащего качества, приобретенного у Собственника
              Платформы, до его передачи, а после – в течение 7 (семи) дней, не считая дня передачи.
            </div>
            <div>
              9.5.3. Покупатель может в течение 14 (четырнадцати) дней с момента покупки вернуть (обменять) Товар
              надлежащего качества, приобретенный у Собственника Платформы, если указанный Товар не подошел по форме,
              габаритам, фасону, расцветке, размеру или комплектации.
            </div>
            <div>
              9.5.4. Возврат (обмен) товара возможен указанный Товар не был в употреблении, сохранены его товарный вид,
              потребительские свойства, пломбы, фабричные ярлыки, а также имеется товарный чек или кассовый чек либо
              иной подтверждающий оплату указанного товара документ.
            </div>
            <div>
              9.5.5. Покупатель не вправе вернуть или обменять товары надлежащего качества, относящиеся к перечню,
              утвержденному Постановлением Правительства РФ от 31 декабря 2020 г. № 2463
            </div>
            <div>
              9.5.6. При отказе Покупателя от Товара согласно п. 9.5.2, 9.5.3 настоящего Соглашения Собственник
              Платформы возвращает ему стоимость возвращенного Товара, за исключением расходов на доставку Товара, не
              позднее чем через 10 (десять) календарных дней с даты получения Собственником Платформы письменного
              заявления и Товара от Покупателя.
            </div>
            <div>
              9.5.7. В случае обнаружения в Товаре, приобретаемых у Собственника Платформы, недостатков, не оговоренных
              Собственником Платформы, Покупатель имеет право вернуть такой Товар Собственнику Платформы и потребовать
              возврата уплаченной денежной суммы в разумный срок, не превышающий 2 (два) года. Покупатель может также
              потребовать замены Товара ненадлежащего качества либо устранения недостатков.
            </div>
            <div>
              9.5.8. Для возврата Товара Покупатель должен заполнить форму заявления, размещенную по адресу&nbsp;
              <a href="/upload/Заявление_на_возврат_TSUM_Collect.pdf" target="_blank">
                https://collect.tsum.ru/upload/Заявление_на_возврат_TSUM_Collect.pdf
              </a>
              , и направить Собственнику Платформы курьерской службой EMS Почты России подписанное заявление и Товар по
              адресу: 125009, Россия, г. Москва, ул. Петровка, д.2, строение 1,2.
            </div>
          </div>
        </section>

        <section>
          <h4>10. Общие условия подачи жалобы Покупателем:</h4>

          <div>
            10.1. Срок рассмотрения жалобы Продавцом/Платформой составляет 10 (десять) календарных дней; при
            рассмотрении жалобы подлежат к выяснению причины, послужившие основаниями для такой жалобы, а также способы
            восстановления нарушенных прав.
          </div>

          <div>
            10.2. Собственник Платформы вправе запросить Товар у Покупателя для проведения проверки на
            соответствие/несоответствие Товара заявленному Продавцом описанию.
          </div>

          <div>
            10.3. Платформа возвращает полученный товар Продавцу, если после проверки будет установлено, что товар не
            соответствует описанию в объявлении Продавца.
          </div>
        </section>

        <section>
          <h4>11. Агентские отношения Продавца и Платформы.</h4>

          <div>
            11.1. В порядке, предусмотренном Главой 52 Гражданского кодекса Российской Федерации Платформа (агент)
            уполномочивается Частным продавцом Товара (принципалом) создавать необходимые условия для подбора,
            предпродажной подготовки, хранения, реализации, оплаты, доставки товаров Покупателям на Платформе.
          </div>

          <div>
            11.2. В соответствии с законом, при оформлении сделок, заключаемых Собственником платформы от имени и за
            счет Частного продавца (принципала), права и обязанности возникают у последнего (абзац 3 часть 1 статьи 1005
            Гражданского кодекса Российской Федерации.
          </div>

          <div>
            11.3. При подтверждении факта принятия товара Покупателем, поручение Частного продавца (принципала) в
            соответствии с условиями Агентского договора считается исполненным. При этом, Собственник платформа
            направляет Продавцу отчет о проведении сделки купли-продажи товара согласно условиям Агентского договора.
          </div>

          <div>
            11.4. За выполнение поручения и оказание дополнительных услуг Частный Продавец выплачивает Собственнику
            платформы Вознаграждение, размер которого определён в Приложении к Агентскому договору.
          </div>

          <div>
            11.5. Собственник платформа несет ответственность только за выполнение поручений и оказание услуг, и не
            несет ответственности за исполнение Покупателем и Частным продавцом обязательств, вытекающих из
            Пользовательского соглашения, Правил, Агентского договора.
          </div>
        </section>

        <section>
          <h4>12. Разрешение споров и разногласий.</h4>

          <div>
            12.1. При наличии разногласий и споров покупатель и продавец примут все необходимые меры для их
            урегулирования путем переговоров.
          </div>

          <div>
            12.2. Собственник Платформа вправе участвовать при рассмотрении споров пользователей, путем предоставления
            письменных или иных заключений по предмету спора. В этой связи, Собственник платформы вправе предлагать
            пользователям предоставлять аргументированное обоснование правильности своих выводов о несоответствии товара
            описанию.
          </div>

          <div>
            12.3. В случае возникновения спора между пользователями по установлению подлинности товара и его
            соответствия заявленным продавцом производителям или их торговым маркам, брендам, Собственник платформа
            вправе предложить пользователям привлечение для разрешения спора лиц, наделенных специальными познаниями в
            области определения аутентичности/оригинальности товара – экспертов. В этой связи, Собственник платформы
            полностью подтверждает приверженность к принципам объективности и беспристрастности в деятельности эксперта,
            мнение которого является для Собственника платформы определяющим.
          </div>

          <div>
            12.4. В случае невозможности разрешения споров и разногласий в досудебном порядке Собственник Платформы,
            Продавец и Покупатель вправе обратиться в суд.
          </div>
        </section>
      </article>
    </>
  );
}