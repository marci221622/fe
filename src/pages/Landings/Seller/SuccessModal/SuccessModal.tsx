import { Modal } from '@/shared/ui';

import { Disclamer, List, Space, Typography } from '@/ui/index';

import { DeliveryIcon, PaperTopIcon, PaymentIcon } from '@/ui/assets/icons';

import st from './styles.module.scss';

export function SuccessModal({ opened, onClose }: { opened: boolean; onClose: () => void }) {
  return (
    <Modal open={opened} onChange={onClose} header="заявка отправлена">
      <Space size="large" direction="vertical">
        <Disclamer stretch>Мы свяжемся с вами в течение 12 часов, чтобы уточнить информацию о вещах</Disclamer>
        <Typography.Title className={st.title}>следующие шаги</Typography.Title>

        <List
          items={[
            {
              icon: <PaperTopIcon />,
              label: 'Подготовьте описание вещей',
              subtitle:
                'Расскажите нашему менеджеру о бренде, категории, и состоянии каждой вещи. Будьте готовы предоставить фотографии.',
            },
            {
              icon: <DeliveryIcon />,
              label: 'Привезите вещи',
              subtitle:
                'Привезите вещи в TSUM Collect. Адрес: Москва, ул. Петровка д.2, 5 этаж (рядом с зонами возврата и покупки)',
            },
            {
              icon: <PaymentIcon />,
              label: 'Получите деньги после продажи',
              subtitle:
                'Cделаем фото и опубликуем в каталоге, а затем доставим вещь покупателю. Вам останется только получить оплату.',
            },
          ]}
        />
      </Space>
    </Modal>
  );
}
