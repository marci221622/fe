import { $strings } from '@/shared/configs/firebase';

export const $mappedStrings = $strings.map(values => {
  return {
    web: {
      search: {
        noResult: values['web.search.noResult'] ?? 'По Вашему запросу ничего не найдено.',
        brandSearchNoResult:
          values['web.search.brandSearchNoResult'] ??
          '\n Для поиска интересующего Вас бренда воспользуйтесь поиском по алфавиту',
      },
      placeholders: {
        enterSurname: values['web.placeholders.enterSurname'] ?? 'Введите фамилию',
        enterMail: values['web.placeholders.enterMail'] ?? 'Введите Email',
        enterName: values['web.placeholders.enterName'] ?? 'Введите имя',
        enterDate: values['web.placeholders.enterDate'] ?? 'Выберите дату и время доставки',
        enterCVV: values['web.placeholders.enterCVV'] ?? 'CVV код',
      },
      topBrands: values['web.topBrands'] ?? 'Топ бренды',
      noFavoriteItemsMessage:
        values['web.noFavoriteItemsMessage'] ??
        'На данный момент у вас нет ни одного избранного бренда. \n Добавляйте бренды в избранное для быстрого доступа на главной и в каталоге.',
      allItems: values['web.allItems'] ?? 'Все товары',
      saveData: values['web.saveData'] ?? 'Сохранить данные',
      promoCode: values['web.promoCode'] ?? 'Промокод',
      applyPromoCode: values['web.applyPromoCode'] ?? 'Применить промокод',
      cancelPromoCode: values['web.cancelPromoCode'] ?? 'Отменить промокод',
      buyWithDelivery: values['web.buyWithDelivery'] ?? 'Купить с доставкой',
      buySelectedItems: values['web.buySelectedItems'] ?? 'Купить выбранные вещи',
      notSelectedItems: values['web.notSelectedItems'] ?? 'Невыбранные товары',
      noItems: values['web.noItems'] ?? 'К&nbsp;сожалению, товаров не&nbsp;найдено',
      reveal: values['web.reveal'] ?? 'Показать',
      borrowNameFieldDescription:
        values['web.borrowNameFieldDescription'] ??
        'Для оформления бронирования необходимо указать имя и фамилию получателя',
      revealAll: values['web.revealAll'] ?? 'Показать все',
      ourApp: values['web.ourApp'] ?? 'наше приложение',
      scanQR: values['web.scanQR'] ?? 'Отсканируйте QR-код, чтобы установить приложение',
      mercuryModa: values['web.mercuryModa'] ?? '© ООО «Меркури Мода», ',
      telegram: values['web.telegram'] ?? 'Мы в Telegram',
      revealAllBrands: values['web.revealAllBrands'] ?? 'Смотреть все бренды',
      categories: values['web.categories'] ?? 'Категории',
      goToFavorite: values['web.goToFavorite'] ?? 'Перейти в избранное',
      description: values['web.description'] ?? 'Описание',
      goToItemInfo: values['web.goToItemInfo'] ?? 'Перейти к информации о товаре',
      revealMoreItems: values['web.revealMoreItems'] ?? 'Показать больше товаров',
      emptyCartDescription:
        values['web.emptyCartDescription'] ?? 'На данный момент вы не добавили ни одного товара в корзину',
      noAvailableItemsInCart: values['web.noAvailableItemsInCart'] ?? 'В корзине нет товаров доступных для покупки.',
      download: values['web.download'] ?? 'Скачать',
      deleteAll: values['web.deleteAll'] ?? 'Удалить все',
      cart: values['web.cart'] ?? 'Корзина',
      thanksForOrder: values['web.thanksForOrder'] ?? 'Спасибо за покупку',
      pageNotFound: values['web.pageNotFound'] ?? 'Страница не найдена',
      pageNotFoundStatus: values['web.pageNotFoundStatus'] ?? '400',
      tsumCollect: values['web.tsumCollect'] ?? 'TSUM Collect',
      mobileApp: values['web.mobileApp'] ?? 'Мобильное приложение',
      buySelectedItem: values['web.buySelectedItem'] ?? 'Купить выбранную вещь',
      errorRetry: values['web.errorRetry'] ?? 'Произошла ошибка, повторите попытку позже',
      sendingSMS: values['web.sendingSMS'] ?? 'Мы отправим Вам СМС с кодом для входа в личный кабинет',
      confirmPhone: values['web.confirmPhone'] ?? 'Подтвердить номер телефона',
      inCart: values['web.inCart'] ?? 'Уже в корзине',
      enterPhoneToBorrow: values['web.enterPhoneToBorrow'] ?? 'Для оформления бронирования укажите номер телефона',
      enterPhoneToLogin: values['web.enterPhoneToLogin'] ?? 'Для входа укажите номер телефона',
      choose: values['web.choose'] ?? 'Выбрать',
      pay: values['web.pay'] ?? 'Оплатить',
      removeFromOrder: values['web.removeFromOrder'] ?? 'Убрать из заказа',
      payByCard: values['web.payByCard'] ?? 'Оплатить банковской картой',
      newCard: values['web.newCard'] ?? 'Новая банковская карта',
      failedToOrderTryAgain: values['web.failedToOrderTryAgain'] ?? 'Не удалось оплатить заказ. Повторите попытку',
      enterNameAndSurname:
        values['web.enterNameAndSurname'] ?? 'Для оформления заказа необходимо указать имя и фамилию получателя',
      enterCVV:
        values['web.enterCVV'] ??
        'Для оплаты заказа, пожалуйста, укажите CVV код, расположенный на обратной стороне вашей карты.',
      observeOrderStatus: values['web.observeOrderStatus'] ?? 'Отследить статус заказа можно в ',
      inApp: values['web.inApp'] ?? 'приложении TSUM Collect',
      wrongLink: values['web.wrongLink'] ?? 'Вы перешли по неправильной ссылке или страница была удалена.',
      backToMain: values['web.backToMain'] ?? 'Вернуться на главную',
      acceptOffer: values['web.acceptOffer'] ?? 'Оформляя заказ, я соглашаюсь с',
      acceptOfferLink: values['web.acceptOfferLink'] ?? 'Условиями продажи и возврата товара',
      sendSMS: values['web.sendSMS'] ?? 'Мы отправили СМС с кодом для подтверждения ',
      smsNumber: values['web.smsNumber'] ?? 'на номер ',
    },
    faq: {
      sell: {
        item7: {
          description: values['faq.sell.item7.description'] ?? '',
        },
      },
      buy: {
        item1: {
          description: values['faq.buy.item1.description'] ?? '',
        },
        item4: {
          description: values['faq.buy.item4.description'] ?? '',
        },
        item7: {
          description: values['faq.buy.item7.description'] ?? '',
        },
        item8: {
          description: values['faq.buy.item8.description'] ?? '',
        },
      },
    },
    aboutShowroom: {
      text: {
        line1: (values['aboutShowroom.text.line1'] ?? '') as string,
        line2: (values['aboutShowroom.text.line2'] ?? '') as string,
        line3: (values['aboutShowroom.text.line3'] ?? '') as string,
      },
      title: {
        line1: (values['aboutShowroom.title.line1'] ?? '') as string,
        line3: (values['aboutShowroom.title.line3'] ?? '') as string,
      },
    },
    title: {
      delete: values['title.delete'] ?? 'Удалить',
    },
    cancel: values.cancel ?? 'Отменить',
    searchHistory: {
      button: values['searchHistory.button'] ?? 'Очистить',
      title: values['searchHistory.title'] ?? 'Недавно искали',
    },
    reset: values.reset ?? '',
    brandsFilter: {
      favoriteBrands: {
        title: values['brandsFilter.favoriteBrands'] ?? '',
        selectAllButton: values['brandsFilter.selectAllButton'] ?? '',
        onboarding: {
          description: values['brandsFilter.favoriteBrands.onboarding.description'] ?? '',
        },
      },
    },
    brandTab: {
      favoriteBrands: {
        onboarding: {
          description: values['brandTab.favoriteBrands.onboarding.description'] ?? 'Подтвердить',
        },
      },
    },
    sellerItems: {
      priceOnApproval: {
        confirmButton: values['sellerItems.priceOnApproval.confirmButton'] ?? 'Подтвердить',
      },
    },
    brandsTab: {
      topBrands: values['brandsTab.top-brands'] ?? 'Топ-бренды',
      favoriteBrands: values['brandsTab.favoriteBrands'] ?? 'Любимые бренды',
      allBrands: values['brandsTab.allBrands'] ?? 'Все бренды',
      searchBar: {
        placeholder: values['brandsTab.searchBar.placeholder'] ?? 'Найти бренд',
      },
    },
    profile: {
      sellItem: values['profile.sellItem'] ?? 'Продать вещь',
      info: values['profile.info'] ?? 'Информация',
      personalInfo: {
        logout: values['profile.personalInfo.logout'] ?? 'Выйти',
        email: values['profile.personalInfo.email'] ?? 'Email',
        name: values['profile.personalInfo.name'] ?? 'Имя',
        surname: values['profile.personalInfo.surname'] ?? 'Фамилия',
      },
      myData: values['profile.personalInfo'] ?? 'Мои данные',
      myOrders: values['profile.myOrders'] ?? 'Мои заказы',
    },
    tabs: {
      brands: values['tabs.brands'] ?? 'Бренды',
      profile: values['tabs.profile'] ?? 'Профиль',
      seller: values['tabs.seller'] ?? 'Продать',
      catalog: values['tabs.catalog'] ?? 'Каталог',
      main: values['tabs.main'] ?? 'Главная',
      favorites: values['tabs.favorites'] ?? 'Избранное',
    },
    product: {
      description: values['catalog.description'] ?? '',
    },
    catalog: {
      banner: {
        m: values['catalog.banner.m'] ?? '',
        w: values['catalog.banner.w'] ?? '',
      },
      description: values['catalog.description'] ?? '',
    },
    relevantItems: {
      item: {
        title: values['relevantItems.item.title'] ?? '',
        button: values['relevantItems.item.button'] ?? '',
      },
    },
    help: {
      privacyPolicy: values['help.privacyPolicy'] ?? 'Политика конфиденциальности',
      userAgreement: values['help.userAgreement'] ?? 'Пользовательское соглашение',
      return: values['help.return'] ?? 'Возврат',
      delivery: values['help.delivery'] ?? 'Доставка',
      payment: values['help.payment'] ?? 'Оплата',
      faq: values['help.faq'] ?? 'Вопросы и ответы',
      authenticityGuarantee: {
        title: values['help.authenticityGuarantee.title'] ?? 'Гарантия подлинности',
        text: values['help.authenticityGuarantee.text'] ?? '',
      },
    },
    orders: {
      selectPanel: {
        active: values['orders.selectPanel.active'] ?? 'Активные',
        finished: values['orders.selectPanel.finished'] ?? 'Завершенные',
      },
      title: values['orders.title'] ?? 'Мои заказы',
      emptyList: {
        title: values['orders.emptyList.title'] ?? '',
        text: values['orders.emptyList.text'] ?? '',
      },
      ordercard: {
        titleWithoutPrice: values['orders.ordercard.titleWithoutPrice'] ?? 'Заказ %@',
        title: values['orders.ordercard.title'] ?? 'Заказ %@ на сумму %@',
      },
    },
    homeScreen: {
      favoriteBrands: {
        banner: {
          title: values['homeScreen.favoriteBrands.banner.title'] ?? 'Любимые бренды',
        },
      },
      ads: {
        erid: {
          title: values['homeScreen.ads.erid.title'] ?? 'Erid',
        },
        legal: {
          title: values['homeScreen.ads.legal.title'] ?? 'Рекламодатель',
        },
        title: values['homeScreen.ads.title'] ?? 'Реклама',
      },
      price: {
        hide: values['homeScreen.price.hide'] ?? '',
      },
    },
    favorite: {
      emptyListPlaceholder: {
        title: values['favorite.emptyListPlaceholder.title'] ?? '',
      },
      emptyAvailable: {
        title: values['favorite.emptyAvailable.title'] ?? '',
      },
      selectPanel: {
        available: values['favorite.selectPanel.available'] ?? 'В наличии (%@)',
        notAvailable: values['favorite.selectPanel.notAvailable'] ?? 'Нет в наличии (%@)',
      },
      tab: {
        brands: {
          emptyListPlaceholder: {
            button: values['favorite.tab.brands.emptyListPlaceholder.button'] ?? 'Добавить бренды',
          },
        },
        items: {
          title: values['favorite.tab.items.title'] ?? 'Вещи',
        },
      },
      favoriteBrands: {
        editor: {
          searchBar: {
            placeholder: values['favorite.favoriteBrands.editor.searchBar.placeholder'] ?? '',
          },
          button: {
            title: values['favorite.favoriteBrands.editor.button.title'] ?? 'Готово',
          },
          title: values['favorite.favoriteBrands.editor.title'] ?? '',
        },
      },
      price: {
        hide: values['favorite.price.hide'] ?? '',
      },
    },
    itemsList: {
      empty: values['itemsList.empty'] ?? 'По Вашему запросу ничего не найдено',
      favoriteBrand: {
        onboarding: {
          title: values['itemsList.favoriteBrand.onboarding.title'] ?? '',
          description: values['itemsList.favoriteBrand.onboarding.description'] ?? '',
        },
      },
      price: {
        hide: values['itemsList.price.hide'] ?? '',
      },
    },
    error: {
      clickAndCollectMultiitems: {
        notAvailableToCollect: {
          button: values.button ?? '',
        },
      },
    },
    proceedPurchases: values.proceedPurchases ?? '',
    successCheckout: {
      button: {
        profile: values[`successCheckout.button.profile`] ?? 'Личном кабинете',
      },
      title: values[`successCheckout.title`] ?? '',
      profileDescription:
        values[`successCheckout.profileDescription`] ?? 'Подробную информацию\nВы можете посмотреть в',
    },
    navBar: {
      login: values[`searchAddress.input.login`] ?? 'Войти',
    },
    filters: {
      price: {
        clearButton: {
          title: values['filters.price.clearButton.title'] ?? 'Сбросить',
        },
      },
      favoriteBrands: { select: { all: values[`filters.favoriteBrands.select.all`] ?? 'Выбрать все' } },
    },
    searchAddress: {
      title: values[`searchAddress.title`] ?? 'Адрес доставки',

      input: {
        placeholder: values[`searchAddress.input.placeholder`] ?? 'Укажите адрес доставки',
      },
    },
    viewedItems: {
      main: {
        title: values[`viewedItems.main.title`] ?? 'Вы недавно смотрели',
      },
      price: {
        hide: values[`viewedItems.price.hide`] ?? '',
      },
      viewed: {
        title: values[`viewedItems.viewed.title`] ?? '',
      },
      itemDetails: {
        title: values[`viewedItems.itemDetails.title`] ?? '',
      },
      cart: {
        title: values[`viewedItems.cart.title`] ?? '',
      },
      allViewedItemsButton: {
        title: values['viewedItems.allViewedItemsButton.title'] ?? 'Смотреть все',
      },
    },
    contactUs: {
      cell: {
        whatsApp: values['contactUs.cell.whatsApp'] ?? 'Написать в WhatsApp',
        telegram: values['contactUs.cell.telegram'] ?? 'Написать в Telegram',
      },
      title: values['contactUs.title'] ?? '',
    },
    promoCode: {
      badPromoCode: values['promoCode.badPromoCode'] ?? null,
      description: values['promoCode.description'] ?? null,
    },
    clickAndCollectCheckout: {
      reserve: values['clickAndCollectCheckout.reserve'] ?? '',
      reserveItem: values['clickAndCollectCheckout.reserveItem'] ?? '',
      action: values['clickAndCollectCheckout.reserve'] ?? '',
      aboutShowroom: {
        linkMore: {
          title: values['clickAndCollectCheckout.aboutShowroom.linkMore.title'] ?? '',
        },
      },
    },
    itemDetails: {
      allItems: {
        category: values['itemDetails.allItems.category'] ?? 'Все %@',
      },
      subscribeGoods: {
        button: values['"itemDetails.subscribeGoods.button'] ?? 'Продолжить покупки',
      },
      addToCartResult: {
        button: {
          title: values['itemDetails.addToCartResult.button.toCart'] ?? 'Перейти в корзину',
        },
        title: values['itemDetails.addToCartResult.title'] ?? 'Добавлен в корзину',
      },
      condition: {
        title: values['itemDetails.condition.title'] ?? '',
        disclaimer: values['itemDetails.condition.disclaimer'] ?? '',
      },
      showroomDisclaimer: {
        text: values['itemDetails.showroomDisclaimer.text'] ?? '',
      },
      price: {
        hide: values['itemDetails.price.hide'] ?? 'Цена на согласование',
      },
      infoBlock: {
        title: values['itemDetails.infoBlock.title'] ?? 'О товаре',
        condition: {
          linkTitle: values['itemDetails.infoBlock.condition.linkTitle'] ?? 'Подробнее',
        },
      },
      addToClickAndCollectPopup: {
        addToCartButton: {
          title: values['itemDetails.addToClickAndCollectPopup.addToCartButton.title'] ?? 'Добавить в корзину',
        },
        text: values['itemDetails.addToClickAndCollectPopup.text'] ?? '',
        title: values['itemDetails.addToClickAndCollectPopup.title'] ?? '',
      },
      showroom: {
        text: values['itemDetails.showroom.text'] ?? '',
        onboarding: {
          title: values['itemDetails.showroom.onboarding.title'] ?? '',
        },
      },
      outOfStock: values['itemDetails.outOfStock'] ?? '',
      reserved: values['itemDetails.reserved'] ?? '',
      purchasePanel: {
        addToCart: values['itemDetails.purchasePanel.addToCart'] ?? '',
        showCatalog: values['itemDetails.purchasePanel.showCatalog'] ?? 'Перейти в каталог',
        showroom: values['itemDetails.purchasePanel.showroom'] ?? 'Примерить в ЦУМе',
        quickPurchase: values['itemDetails.purchasePanel.quickPurchase'] ?? 'Быстрая покупка',
      },
    },
    cart: {
      inStockPicker: {
        inStock: values['cart.inStockPicker.inStock'] ?? 'В наличии',
        outOfStock: values['cart.inStockPicker.outOfStock'] ?? 'Нет в наличии',
      },
      item: {
        clickCollectUnavailable: values['cart.item.clickCollectUnavailable'] ?? 'Недоступно для примерки в ЦУМе',
      },
      clickAndCollectOnboarding: {
        text: values['cart.clickAndCollectOnboarding.text'] ?? '',
      },
      promoCodeButton: values['cart.promoCodeButton'] ?? 'Добавить промокод',
      cartInfo: { discount: values['cart.cartInfo.discount'] ?? 'Скидка' },
      buyButton: {
        title: values['cart.buyButton.title'] ?? 'Купить',
        chooseAll: values['cart.buyButton.chooseAll'] ?? 'Выбрать все товары',
        buyAll: values['cart.buyButton.buyAll'] ?? 'Купить всё',
      },
      emptyScreen: {
        allOutOfStock: values['cart.emptyScreen.allOutOfStock'] ?? 'В корзине нет товаров в наличии',
      },
    },
    login: {
      codeInput: {
        title: values['login.codeInput.title'] ?? 'Укажите код из СМС',
        privacyPolicy: values['login.codeInput.privacyPolicy'] ?? '',
        button: values['login.codeInput.button'] ?? 'Получить новый код',
        wrongCode: values['login.codeInput.wrongCode'] ?? 'СМС-код указан неверно',
        counter: values['login.codeInput.counter'] ?? 'Получить новый код можно через',
      },
      phoneInput: {
        title: values['login.phoneInput.title'] ?? 'Укажите номер телефона',
        description: values['login.phoneInput.description'] ?? '',
        favoritesScreen: { description: values['login.phoneInput.favoritesScreen.description'] ?? '' },
      },
      web: {
        phoneInput: {
          favoriteBrandAction: { description: values['login.web.phoneInput.favoriteBrandAction.description'] ?? '' },
        },
      },
    },
    checkout: {
      user: {
        name: {
          placeholder: values[`checkout.user.name.placeholder`] ?? '',
        },
        phone: {
          placeholder: values[`checkout.user.phone.placeholder`] ?? 'Номер телефона',
        },
        address: {
          change: values[`checkout.user.address.change`] ?? '',
        },
      },
      total: values['checkout.total'] ?? 'Итого к оплате',
      title: values['checkout.title'] ?? '',
      delivery: {
        delivery: values['checkout.delivery.delivery'] ?? 'Доставка',
        free: values['checkout.delivery.free'] ?? 'Бесплатно',
      },
      validation: {
        phone: {
          title: values['checkout.validation.phone.title'] ?? '',
        },
        name: {
          title: values['checkout.validation.name.title'] ?? '',
        },
      },
    },
    bankCard: {
      list: {
        confirm: values['bankCard.list.confirm'] ?? '',
      },
      input: {
        date: {
          placeholder: values['bankCard.input.date.placeholder'] ?? '',
        },
        cvv: {
          placeholder: values['bankCard.input.cvv.placeholder'] ?? '',
        },
        title: values['bankCard.input.title'] ?? '',
        number: {
          placeholder: values['bankCard.input.number.placeholder'] ?? '',
        },
      },
    },

    orderDetails: {
      goods: values['orderDetails.goods'] ?? 'Товары (%@)',
      subtitleWithoutPrice: values['orderDetails.subtitleWithoutPrice'] ?? 'от %@',
      price: {
        hide: values['orderDetails.price.hide'] ?? 'от %@',
      },
      info: {
        recipient: values['orderDetails.info.recipient": "Получатель",'] ?? 'Получатель',
        deliveryType: {
          delivery: values['orderDetails.info.deliveryType.delivery'] ?? 'Доставка по адресу',
        },
        deliveryProgress: {
          cell: {
            subtitle: {
              status: values['orderDetails.info.deliveryProgress.cell.subtitle.status'] ?? 'Статус',
              paid: values['orderDetails.info.deliveryProgress.cell.subtitle.paid'] ?? 'Оплачен',
              cancelled: values['orderDetails.info.deliveryProgress.cell.subtitle.cancelled'] ?? 'Отменен',
              delivered: values['orderDetails.info.deliveryProgress.cell.subtitle.delivered'] ?? 'Доставлен',
            },
          },
        },
        paymentMethod: {
          title: values['orderDetails.info.paymentMethod'] ?? 'Способ оплаты',
          cardOnline: values['orderDetails.info.paymentMethod.cardOnline'] ?? 'Банковской картой',
          onClickAndCollectReceive:
            values['orderDetails.info.paymentMethod.onClickAndCollectReceive'] ?? 'При получении',
        },
      },
    },
    favoriteBrandsNoveltyItems: {
      main: {
        title: values['favoriteBrandsNoveltyItems.main.title'] ?? 'Новинки в любимых брендах',
      },
    },
    advantages: { title: values['advantages.title'] ?? 'Сервис TSUM Collect это' },
    loyalty: {
      button: {
        title: values['loyalty.button.title'] ?? 'Подробнее',
      },
      copyAlert: {
        title: values['loyalty.copyAlert.title'] ?? 'Промокод скопирован',
      },
    },
    genderPanel: {
      female: values['genderPanel.female'] ?? 'Женское',
      male: values['genderPanel.male'] ?? 'Мужское',
    },
    searchBar: {
      placeholder: {
        catalog: values['searchBar.placeholder.catalog'] ?? 'Поиск по каталогу',
      },
    },
  };
});
