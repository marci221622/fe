import { createEvent, sample } from 'effector';

import { checkoutReset } from '../checkout';

export const fullReset = createEvent<void>();

sample({ clock: fullReset, target: checkoutReset });
