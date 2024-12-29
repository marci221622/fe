import { useLingui } from '@lingui/react';
import { useUnit } from 'effector-react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Contact } from '@/generated/customer_hub/entities/contact.v1';
import { ContactType } from '@/generated/customer_hub/enums/contact_type';
import { $mappedStrings } from '@/shared/configs';

import { paths } from '@/constants/paths';

import { $customer, $customerContacts, createContactFromValue, ProfileTabs } from '@/features/customer';

import { Button, Field, FieldMasked, Responsive, Space, Typography } from '@/ui/index';

import { ArrowRightIcon, MailIcon, PaperBottomIcon, PaperTopIcon, PhoneIcon } from '@/ui/assets/icons';

import { resolver, Form } from './Form';
import { customerUpdater } from './model';

import st from './styles.module.scss';

type Props = { device: Device };

function Actions({ device }: Props) {
  const texts = useUnit($mappedStrings);
  const { i18n } = useLingui();
  const updater = useUnit(customerUpdater.mutation);

  return (
    <Space stretch align="between" className={st.actions} size="large">
      <Button size="S" bold type="submit" pending={updater.pending} stretch={device === 'mobile'}>
        {texts.web.saveData}
      </Button>
    </Space>
  );
}

export default function ContactsPage() {
  const texts = useUnit($mappedStrings);
  const { i18n } = useLingui();
  const { customer, contacts } = useUnit({
    customer: $customer,
    contacts: $customerContacts,
  });
  const navigate = useNavigate();
  const updater = useUnit(customerUpdater.mutation);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Form>({
    resolver,
    values: {
      name: customer?.firstName ?? '',
      phone: contacts.phone?.value ?? '',
      mail: contacts.mail?.value ?? '',
      lastname: customer?.lastName ?? '',
    },
    mode: 'onSubmit',
  });

  const updateCustomer = (form: Form) => {
    updater.start({
      lastName: form.lastname,
      firstName: form.name,
      contacts: [
        form.mail &&
          createContactFromValue({
            id: contacts.mail?.id,
            type: ContactType.CONTACT_TYPE_EMAIL,
            value: form.mail,
            personName: form.name ?? '',
          }),
      ].filter(Boolean) as Contact[],
    });
  };

  return (
    <>
      <Space stretch className={st.header}>
        <ArrowRightIcon onClick={() => navigate(paths.profile.main())} />
        <Typography.PageTitle className={st.pageTitle}>{texts.profile.myData}</Typography.PageTitle>
      </Space>

      <Responsive.TabletAndBelow>
        <form onSubmit={handleSubmit(updateCustomer)}>
          <Space stretch size="large" direction="vertical" className={st.space}>
            <Field
              Prefix={<PaperTopIcon />}
              placeholder={texts.profile.personalInfo.name}
              simple
              {...register('name')}
            />
            <Field
              Prefix={<PaperBottomIcon />}
              placeholder={texts.profile.personalInfo.surname}
              simple
              {...register('lastname')}
            />

            <Controller
              name="phone"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FieldMasked
                  disabled
                  Prefix={<PhoneIcon />}
                  {...field}
                  maskProps={{ mask: '+7 999 999-99-99' }}
                  placeholder={texts.checkout.user.phone.placeholder}
                  simple
                />
              )}
            />

            <Field
              Prefix={<MailIcon />}
              placeholder={texts.profile.personalInfo.email}
              simple
              {...register('mail')}
              error={errors.mail?.message}
            />
          </Space>
          <Actions device="mobile" />
        </form>
      </Responsive.TabletAndBelow>

      <Responsive.Desktop>
        <ProfileTabs />

        <form onSubmit={handleSubmit(updateCustomer)}>
          <Space stretch direction="vertical" size="large" className={st.space}>
            <Space stretch direction="horizontal" size="large" className={st.row}>
              <Field
                title={texts.profile.personalInfo.name}
                placeholder={texts.web.placeholders.enterName}
                withShadow
                {...register('name')}
              />
              <Field
                title={texts.profile.personalInfo.surname}
                placeholder={texts.web.placeholders.enterSurname}
                withShadow
                {...register('lastname')}
              />
            </Space>

            <Space stretch direction="horizontal" size="large" className={st.row}>
              <Controller
                name="phone"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FieldMasked
                    disabled
                    title={texts.checkout.user.phone.placeholder}
                    {...field}
                    maskProps={{ mask: '+7 999 999-99-99' }}
                    placeholder="+7"
                  />
                )}
              />

              <Field
                title={texts.profile.personalInfo.email}
                placeholder={texts.web.placeholders.enterMail}
                withShadow
                {...register('mail')}
                error={errors.mail?.message}
              />
            </Space>
          </Space>
          <Actions device="desktop" />
        </form>
      </Responsive.Desktop>
    </>
  );
}
