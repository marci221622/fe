import { featuresFlagsDev } from '@/constants/features';

// https://jira.int.tsum.com/browse/POWEB-719
// Виджеты на КТ давно включили, старые ключи не нужны
const keysToRemove = ['installAppBannerVisible', featuresFlagsDev.productWidgets.key];

// Что бы не плодить памяти
// Удалять все что накопили
export function clearLS() {
  keysToRemove.forEach(key => {
    localStorage.removeItem(key);
  });

  if (process.env.NODE_ENV === 'develompent') {
    console.log('[STORAGES:LS]: clear unused keys', { keys: keysToRemove });
  }
}
