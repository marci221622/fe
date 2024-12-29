/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import { Empty } from "../google/protobuf/empty";
import {
  CheckTokenRequest,
  CreateCustomerAddressRequest,
  CreateCustomerAddressResponse,
  CreateCustomerRequest,
  CreateCustomerResponse,
  CreateOfferRequest,
  CreateOfferResponse,
  DeleteCustomerAddressRequest,
  FavoriteBrandsResponse,
  GetAddressRequest,
  GetAddressResponse,
  GetCustomerAddressRequest,
  GetCustomerAddressResponse,
  GetCustomerRequest,
  GetCustomerResponse,
  GetFavoriteBrandsRequest,
  GetItemListConfigResponse,
  GetItemListRequest,
  GetItemListResponse,
  GetOffersByBidIdRequest,
  GetOffersByBidIdResponse,
  ListAddressesRequest,
  ListAddressesResponse,
  ListCustomerAddressesRequest,
  ListCustomerAddressesResponse,
  UpdateCustomerAddressRequest,
  UpdateCustomerAddressResponse,
  UpdateCustomerProfileRequest,
  UpdateCustomerRequest,
  UpdateCustomerResponse,
} from "./deprecated";
import { CheckoutData } from "./entities/checkout_data.v1";
import { Order } from "./entities/order.v1";
import { FindAddressByCoordsRequest, FindAddressByCoordsResponse } from "./methods/address/find_address_by_coodrs.v1";
import { FindAddressByIPRequest, FindAddressByIPResponse } from "./methods/address/find_address_by_ip.v1";
import { SuggestAddressRequest, SuggestAddressResponse } from "./methods/address/suggest_address.v1";
import { AddUserContactRequest } from "./methods/auth/add_user_contact.v1";
import { AuthenticateByCodeRequest, TokenResponse } from "./methods/auth/auth_by_code.v1";
import { AuthenticationCodeResponse, GetAuthenticationCodeRequest } from "./methods/auth/get_auth_by_code.v1";
import {
  GetAuthenticationCodeAndroidRequest,
  GetAuthenticationCodeAndroidResponse,
} from "./methods/auth/get_authentication_code.android";
import {
  GetAuthenticationCodeIosRequest,
  GetAuthenticationCodeIosResponse,
} from "./methods/auth/get_authentication_code.ios";
import {
  GetAuthenticationCodeWebRequest,
  GetAuthenticationCodeWebResponse,
} from "./methods/auth/get_authentication_code.web";
import { RefreshTokenRequest } from "./methods/auth/refresh_token.v1";
import { RevokeTokenRequest } from "./methods/auth/revoke_token.v1";
import { RevokeUserTokensRequest } from "./methods/auth/revoke_user_tokens.v1";
import { OrderForSaleRequest, OrderForSaleResponse } from "./methods/auth/send_order_for_sale.v1";
import { GetBreadCrumbsRequest, GetBreadCrumbsResponse } from "./methods/breadcrumbs/get_breadcrumbs.v1";
import { GetBrandListRequest, GetBrandListResponse } from "./methods/catalog/get_brand_list.v1";
import {
  GetBrandsItemsListResponse,
  GetFavoriteBrandsItemsListRequest,
} from "./methods/catalog/get_brands_items_list.v1";
import { GetCatalogRequest, GetCatalogResponse } from "./methods/catalog/get_catalog.v1";
import { GetCategoryRequest, GetCategoryResponse } from "./methods/catalog/get_category.v1";
import { GetItemByCodeRequest, GetItemByCodeResponse } from "./methods/catalog/get_item_by_code.v1";
import { GetItemsRequest, GetItemsResponse } from "./methods/catalog/get_items.v1";
import { GetItemsByCodesRequest, GetItemsByCodesResponse } from "./methods/catalog/get_items_by_codes.v1";
import {
  GetItemsDeliveryOptionsRequest,
  GetItemsDeliveryOptionsResponse,
} from "./methods/catalog/get_items_delivery_options.v1";
import { GetMenuTreeRequest, GetMenuTreeResponse } from "./methods/catalog/get_menu_tree.v1";
import { HomeRequest, HomeResponse } from "./methods/catalog/home.v1";
import { SuggestRequest, SuggestResponse } from "./methods/catalog/suggest.v1";
import { AddCartItemsRequest } from "./methods/checkout/add_cart_items.v1";
import { CalculateDeliveryRequest, CalculateDeliveryResponse } from "./methods/checkout/calculate_delivery.v1";
import { CalculateDiscountsRequest } from "./methods/checkout/calculate_discounts.v1";
import { FindCheckoutRequest } from "./methods/checkout/find_checkout.v1";
import { ProcessCheckoutRequest, ProcessCheckoutResponse } from "./methods/checkout/process_checkout.v1";
import { RemoveCartItemsRequest } from "./methods/checkout/remove_cart_items.v1";
import { SelectCartItemsRequest } from "./methods/checkout/select_cart_items.v1";
import { SelectDeliveryIntervalRequest } from "./methods/checkout/select_delivery_interval.v1";
import { SetDeliveryRecipientRequest } from "./methods/checkout/set_delivery_recipient.v1";
import { SetPaymentResultRequest, SetPaymentResultResponse } from "./methods/checkout/set_payment_result.v1";
import { SwitchCheckoutTypeRequest } from "./methods/checkout/switch_checkout_type.v1";
import { UnselectCartItemsRequest } from "./methods/checkout/unselect_cart_items.v1";
import { CustomerProfileResponse, GetCustomerProfileRequest } from "./methods/customer/get_customer_profile.v1";
import {
  GetInitializationInfoRequest,
  GetInitializationInfoResponse,
} from "./methods/customer/get_initialization_info.v1";
import { ListSavedCardsRequest, ListSavedCardsResponse } from "./methods/customer/list_saved_cards.v1";
import { SetCustomerCityRequest, SetCustomerCityResponse } from "./methods/customer/set_customer_city.v1";
import {
  AddBrandsToFavoriteListRequest,
  AddBrandsToFavoriteListResponse,
} from "./methods/favorite/add_brands_to_favorite_list.v1";
import {
  AddItemsToFavoriteListRequest,
  AddItemsToFavoriteListResponse,
} from "./methods/favorite/add_items_to_favorite_list.v1";
import {
  GetCustomerFavoriteListsRequest,
  GetCustomerFavoriteListsResponse,
} from "./methods/favorite/get_customer_favorite_lists.v1";
import {
  GetFavoriteBrandsListRequest,
  GetFavoriteBrandsListResponse,
} from "./methods/favorite/get_favorite_brands_list.v1";
import {
  GetFavoriteItemsListRequest,
  GetFavoriteItemsListResponse,
} from "./methods/favorite/get_favorite_items_list.v1";
import { GetFavoriteListRequest, GetFavoriteListResponse } from "./methods/favorite/get_favorite_list.v1";
import {
  RemoveBrandsFromFavoriteListRequest,
  RemoveBrandsFromFavoriteListResponse,
} from "./methods/favorite/remove_brands_from_favorite_list.v1";
import {
  RemoveItemsFromFavoriteListRequest,
  RemoveItemsFromFavoriteListResponse,
} from "./methods/favorite/remove_items_from_favorite_list.v1";
import { GetLoyaltyRequest, GetLoyaltyResponse } from "./methods/loyalty/get_loyalty.v1";
import { GetCustomerOrderRequest } from "./methods/order/get_customer_order.v1";
import { CustomerOrdersResponse, GetCustomerOrdersRequest } from "./methods/order/get_customer_orders.v1";
import { MarkOrderAsRatedRequest, MarkOrderAsRatedResponse } from "./methods/order/mark_order_as_rated.v1";
import { UpdateUserRequest, UserResponse } from "./methods/user/update_user.v1";

export const protobufPackage = "utp.customer_hub_service.v1";

/** @exclude Authentication service methods */
export interface CustomerHubService {
  /** Запрос на получение кода авторизации в системе. Должно вызываться web-приложением */
  GetAuthenticationCodeWeb(
    request: DeepPartial<GetAuthenticationCodeWebRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetAuthenticationCodeWebResponse>;
  /** Запрос на получение кода авторизации в системе. Должно вызываться ios-приложением */
  GetAuthenticationCodeIos(
    request: DeepPartial<GetAuthenticationCodeIosRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetAuthenticationCodeIosResponse>;
  /** Запрос на получение кода авторизации в системе. Должно вызываться android-приложением */
  GetAuthenticationCodeAndroid(
    request: DeepPartial<GetAuthenticationCodeAndroidRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetAuthenticationCodeAndroidResponse>;
  /** Авторизация по полученному коду в методе GetAuthenticationCode */
  AuthenticateByCode(request: DeepPartial<AuthenticateByCodeRequest>, metadata?: grpc.Metadata): Promise<TokenResponse>;
  /** Обновить ключ авторизации */
  RefreshToken(request: DeepPartial<RefreshTokenRequest>, metadata?: grpc.Metadata): Promise<TokenResponse>;
  /** Отозвать ключ авторизации */
  RevokeToken(request: DeepPartial<RevokeTokenRequest>, metadata?: grpc.Metadata): Promise<Empty>;
  /** Отозвать все ключи авторизации в системе со всех устройств пользователя */
  RevokeUserTokens(request: DeepPartial<RevokeUserTokensRequest>, metadata?: grpc.Metadata): Promise<Empty>;
  /** Запрос на продажу вещей */
  SendOrderForSale(request: DeepPartial<OrderForSaleRequest>, metadata?: grpc.Metadata): Promise<OrderForSaleResponse>;
  /** Обновить данные пользователя */
  UpdateUser(request: DeepPartial<UpdateUserRequest>, metadata?: grpc.Metadata): Promise<UserResponse>;
  /** Добавление контактных данных пользователя */
  AddUserContact(
    request: DeepPartial<AddUserContactRequest>,
    metadata?: grpc.Metadata,
  ): Promise<AuthenticationCodeResponse>;
  /** Сохранить выбранный пользователем город прибывания */
  SetCustomerCity(
    request: DeepPartial<SetCustomerCityRequest>,
    metadata?: grpc.Metadata,
  ): Promise<SetCustomerCityResponse>;
  /** Запрос на получение адреса доставки */
  SuggestAddress(
    request: DeepPartial<SuggestAddressRequest>,
    metadata?: grpc.Metadata,
  ): Promise<SuggestAddressResponse>;
  /** Поиск адреса по координатам */
  FindAddressByCoords(
    request: DeepPartial<FindAddressByCoordsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<FindAddressByCoordsResponse>;
  /** Поиск адреса по ip клиента */
  FindAddressByIP(
    request: DeepPartial<FindAddressByIPRequest>,
    metadata?: grpc.Metadata,
  ): Promise<FindAddressByIPResponse>;
  /**
   * Получение данных сессии чекаута.
   * Производит поиск сессии по коду. Возвращает пустой ответ если пользователь ешё не добавил в корзину ни одного товара.
   */
  FindCheckout(request: DeepPartial<FindCheckoutRequest>, metadata?: grpc.Metadata): Promise<CheckoutData>;
  /**
   * Переключение типа типа чекаута.
   * Производит проверку необходимых условий и ограничений и меняет тип сессии чекаута. Возвращает ошибку если
   * какие-либо условия не соблюдены. Тип не может быть ОneClick! Метод вызывается при выборе
   * клиента "Примерить в ЦУМе" или "Купить".
   */
  SwitchCheckoutType(request: DeepPartial<SwitchCheckoutTypeRequest>, metadata?: grpc.Metadata): Promise<CheckoutData>;
  /**
   * Добавление товаров в корзину.
   * Если ранее пользователь не добавлял товаров - будет создана новая сессия чекаута указанного типа.
   * При повторных добавлениях тип сессии не будет изменён. Уже присутствующие в корзине позиции будут проигнорированы.
   */
  AddCartItems(request: DeepPartial<AddCartItemsRequest>, metadata?: grpc.Metadata): Promise<CheckoutData>;
  /**
   * Удаление позиций корзины.
   * Отсутствующие в корзине позиции будут проигнорированы.
   */
  RemoveCartItems(request: DeepPartial<RemoveCartItemsRequest>, metadata?: grpc.Metadata): Promise<CheckoutData>;
  /** Выбор позиций корзины для для дальнейшего оформления заказа. */
  SelectCartItems(request: DeepPartial<SelectCartItemsRequest>, metadata?: grpc.Metadata): Promise<CheckoutData>;
  /** Отмена выбора позиций корзины для для дальнейшего оформления заказа. */
  UnselectCartItems(request: DeepPartial<UnselectCartItemsRequest>, metadata?: grpc.Metadata): Promise<CheckoutData>;
  /**
   * Применение привилегий (промокоды, бонусы и пр.).
   * Указанные привилегии будут сохранены в данных сессии и использоваться при пересчётах итоговой стоимости.
   */
  CalculateDiscounts(request: DeepPartial<CalculateDiscountsRequest>, metadata?: grpc.Metadata): Promise<CheckoutData>;
  /**
   * Расчет вариантов доставки.
   * Для расчёта необходимо указать либо address_id, либо address_data. Метод возвращает ошибку
   * если тип корзины подразумевает бронирование.
   */
  CalculateDelivery(
    request: DeepPartial<CalculateDeliveryRequest>,
    metadata?: grpc.Metadata,
  ): Promise<CalculateDeliveryResponse>;
  /**
   * Расчет вариантов бронирования ClickAndCollect.
   * Производит расчет плана логистического исполнения доставки в шоурум и бронирования товара.
   * Если не передан ни address_id, ни address_data будет использован адрес шоурума по умолчанию.
   * Метод возвращает ошибку если тип корзины подразумевает доставку.
   */
  CalculateDeliveryClickAndCollect(
    request: DeepPartial<CalculateDeliveryRequest>,
    metadata?: grpc.Metadata,
  ): Promise<CheckoutData>;
  /**
   * Выбор варианта ранее рассчитанной доставки.
   * Помечает выбранный интервал как выбранный пользователем - этот интервал будет использован
   * при оформлении заказа. Метод недоступен для бронирований.
   */
  SelectDeliveryInterval(
    request: DeepPartial<SelectDeliveryIntervalRequest>,
    metadata?: grpc.Metadata,
  ): Promise<CheckoutData>;
  /**
   * Установка контактных данных получателя заказа.
   * Контактные данные телефон и ФИО получателя могут быть переданы как совместно, так и по отдельности.
   */
  SetDeliveryRecipient(
    request: DeepPartial<SetDeliveryRecipientRequest>,
    metadata?: grpc.Metadata,
  ): Promise<CheckoutData>;
  /**
   * Исполнение чекаута.
   * Выполняет проверки полноты заполнения данных чекаута и актуальности выбранных опций.
   *   * Для предоплатных заказов при оплате картой инициируется авторизация платежа и метод
   * возвращает необходимые для её завершения данные 3DS и result: PROCESS_RESULT_3DS_PENDING
   *   * Для постоплатных и бронирований - создаёт заказ, возвращает его данные и result: PROCESS_RESULT_SUCCESS.
   */
  ProcessCheckout(
    request: DeepPartial<ProcessCheckoutRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ProcessCheckoutResponse>;
  /**
   * Завершение 3DS и создание заказа.
   * Производит подтверждение авторизации средств для предоплатных заказов с оплатой картой и оформление заказа.
   */
  SetPaymentResult(
    request: DeepPartial<SetPaymentResultRequest>,
    metadata?: grpc.Metadata,
  ): Promise<SetPaymentResultResponse>;
  /** Получение товара по его item_code */
  GetItemByCode(request: DeepPartial<GetItemByCodeRequest>, metadata?: grpc.Metadata): Promise<GetItemByCodeResponse>;
  /** Получение вариантов доставки товаров */
  GetItemsDeliveryOptions(
    request: DeepPartial<GetItemsDeliveryOptionsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetItemsDeliveryOptionsResponse>;
  /** Получение товаров по их item_codes */
  GetItemsByCodes(
    request: DeepPartial<GetItemsByCodesRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetItemsByCodesResponse>;
  /** Получение списка товаров */
  GetItems(request: DeepPartial<GetItemsRequest>, metadata?: grpc.Metadata): Promise<GetItemsResponse>;
  /** Запрос начального экрана */
  GetHomeScreen(request: DeepPartial<HomeRequest>, metadata?: grpc.Metadata): Promise<HomeResponse>;
  /** Получение каталога */
  GetCatalog(request: DeepPartial<GetCatalogRequest>, metadata?: grpc.Metadata): Promise<GetCatalogResponse>;
  /** Запрос на получение категории */
  GetCategory(request: DeepPartial<GetCategoryRequest>, metadata?: grpc.Metadata): Promise<GetCategoryResponse>;
  /** Запрос на получение "дерева" каталога */
  GetMenuTree(request: DeepPartial<GetMenuTreeRequest>, metadata?: grpc.Metadata): Promise<GetMenuTreeResponse>;
  /** Получение списка брендов с сессией */
  GetBrandListV2(request: DeepPartial<GetBrandListRequest>, metadata?: grpc.Metadata): Promise<GetBrandListResponse>;
  /** Поиск по вводимым пользователем данным в строку поиска */
  Suggest(request: DeepPartial<SuggestRequest>, metadata?: grpc.Metadata): Promise<SuggestResponse>;
  /** Список заказов пользователя */
  GetCustomerOrders(
    request: DeepPartial<GetCustomerOrdersRequest>,
    metadata?: grpc.Metadata,
  ): Promise<CustomerOrdersResponse>;
  /** Получение конкретного заказа пользователя */
  GetCustomerOrder(request: DeepPartial<GetCustomerOrderRequest>, metadata?: grpc.Metadata): Promise<Order>;
  /** Пометка заказа как оцененного */
  MarkOrderAsRated(
    request: DeepPartial<MarkOrderAsRatedRequest>,
    metadata?: grpc.Metadata,
  ): Promise<MarkOrderAsRatedResponse>;
  /** Получение списка сохраненных карт Customer */
  ListSavedCards(
    request: DeepPartial<ListSavedCardsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListSavedCardsResponse>;
  /** Получение профиля пользователя */
  GetCustomerProfile(
    request: DeepPartial<GetCustomerProfileRequest>,
    metadata?: grpc.Metadata,
  ): Promise<CustomerProfileResponse>;
  /** Получение хлебные крошки */
  GetBreadCrumbs(
    request: DeepPartial<GetBreadCrumbsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetBreadCrumbsResponse>;
  /** Получение информации для инициализации приложения */
  GetInitializationInfo(
    request: DeepPartial<GetInitializationInfoRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetInitializationInfoResponse>;
  /** Добавление товаров в список избранного */
  AddItemsToFavoriteList(
    request: DeepPartial<AddItemsToFavoriteListRequest>,
    metadata?: grpc.Metadata,
  ): Promise<AddItemsToFavoriteListResponse>;
  /** Получение списков избранного конкретного пользователя (сами товары, бренды не присутствуют в ответе) */
  GetCustomerFavoriteLists(
    request: DeepPartial<GetCustomerFavoriteListsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetCustomerFavoriteListsResponse>;
  /** Удаление товаров из списка избранного */
  RemoveItemsFromFavoriteList(
    request: DeepPartial<RemoveItemsFromFavoriteListRequest>,
    metadata?: grpc.Metadata,
  ): Promise<RemoveItemsFromFavoriteListResponse>;
  GetFavoriteItemsList(
    request: DeepPartial<GetFavoriteItemsListRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetFavoriteItemsListResponse>;
  /** Добавление брендов в список избранного */
  AddBrandsToFavoriteList(
    request: DeepPartial<AddBrandsToFavoriteListRequest>,
    metadata?: grpc.Metadata,
  ): Promise<AddBrandsToFavoriteListResponse>;
  /** Удаление брендов из списка избранного */
  RemoveBrandsFromFavoriteList(
    request: DeepPartial<RemoveBrandsFromFavoriteListRequest>,
    metadata?: grpc.Metadata,
  ): Promise<RemoveBrandsFromFavoriteListResponse>;
  /** Получение списка избранных брендов пользователя */
  GetFavoriteBrandsList(
    request: DeepPartial<GetFavoriteBrandsListRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetFavoriteBrandsListResponse>;
  /** Получение списка Товаров по списку Брендов */
  GetBrandsItemsList(
    request: DeepPartial<GetFavoriteBrandsItemsListRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetBrandsItemsListResponse>;
  /** Получение акционных дисклеймеров для страницы */
  GetLoyalty(request: DeepPartial<GetLoyaltyRequest>, metadata?: grpc.Metadata): Promise<GetLoyaltyResponse>;
  /**
   * @exclude deprecated at 01.11.2023, delete after 01.01.2024
   *
   * @deprecated
   */
  GetFavoriteList(
    request: DeepPartial<GetFavoriteListRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetFavoriteListResponse>;
  /**
   * @exclude deprecated at 25.10.2023, delete after 01.12.2023
   *
   * @deprecated
   */
  GetBrandList(request: DeepPartial<Empty>, metadata?: grpc.Metadata): Promise<GetBrandListResponse>;
  /**
   * @exclude deprecated at 25.10.2023, delete after 01.12.2023
   *
   * @deprecated
   */
  GetAuthenticationCode(
    request: DeepPartial<GetAuthenticationCodeRequest>,
    metadata?: grpc.Metadata,
  ): Promise<AuthenticationCodeResponse>;
  /** @deprecated */
  GetItemsList(request: DeepPartial<GetItemListRequest>, metadata?: grpc.Metadata): Promise<GetItemListResponse>;
  /** @deprecated */
  GetItemListConfig(
    request: DeepPartial<GetItemListRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetItemListConfigResponse>;
  /** @deprecated */
  CheckToken(request: DeepPartial<CheckTokenRequest>, metadata?: grpc.Metadata): Promise<Empty>;
  /** @deprecated */
  CreateOffer(request: DeepPartial<CreateOfferRequest>, metadata?: grpc.Metadata): Promise<CreateOfferResponse>;
  /** @deprecated */
  GetOffersByBidId(
    request: DeepPartial<GetOffersByBidIdRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetOffersByBidIdResponse>;
  /** @deprecated */
  GetAddress(request: DeepPartial<GetAddressRequest>, metadata?: grpc.Metadata): Promise<GetAddressResponse>;
  /** @deprecated */
  ListAddresses(request: DeepPartial<ListAddressesRequest>, metadata?: grpc.Metadata): Promise<ListAddressesResponse>;
  /** @deprecated */
  GetCustomer(request: DeepPartial<GetCustomerRequest>, metadata?: grpc.Metadata): Promise<GetCustomerResponse>;
  /** @deprecated */
  AddCustomer(request: DeepPartial<CreateCustomerRequest>, metadata?: grpc.Metadata): Promise<CreateCustomerResponse>;
  /** @deprecated */
  UpdateCustomer(
    request: DeepPartial<UpdateCustomerRequest>,
    metadata?: grpc.Metadata,
  ): Promise<UpdateCustomerResponse>;
  /** @deprecated */
  GetCustomerAddress(
    request: DeepPartial<GetCustomerAddressRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetCustomerAddressResponse>;
  /** @deprecated */
  ListCustomerAddresses(
    request: DeepPartial<ListCustomerAddressesRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListCustomerAddressesResponse>;
  /** @deprecated */
  AddCustomerAddress(
    request: DeepPartial<CreateCustomerAddressRequest>,
    metadata?: grpc.Metadata,
  ): Promise<CreateCustomerAddressResponse>;
  /** @deprecated */
  UpdateCustomerAddress(
    request: DeepPartial<UpdateCustomerAddressRequest>,
    metadata?: grpc.Metadata,
  ): Promise<UpdateCustomerAddressResponse>;
  /** @deprecated */
  DeleteCustomerAddress(request: DeepPartial<DeleteCustomerAddressRequest>, metadata?: grpc.Metadata): Promise<Empty>;
  /** @deprecated */
  UpdateCustomerProfile(
    request: DeepPartial<UpdateCustomerProfileRequest>,
    metadata?: grpc.Metadata,
  ): Promise<CustomerProfileResponse>;
  /** @deprecated */
  GetFavoriteBrands(
    request: DeepPartial<GetFavoriteBrandsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<FavoriteBrandsResponse>;
}

export class CustomerHubServiceClientImpl implements CustomerHubService {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.GetAuthenticationCodeWeb = this.GetAuthenticationCodeWeb.bind(this);
    this.GetAuthenticationCodeIos = this.GetAuthenticationCodeIos.bind(this);
    this.GetAuthenticationCodeAndroid = this.GetAuthenticationCodeAndroid.bind(this);
    this.AuthenticateByCode = this.AuthenticateByCode.bind(this);
    this.RefreshToken = this.RefreshToken.bind(this);
    this.RevokeToken = this.RevokeToken.bind(this);
    this.RevokeUserTokens = this.RevokeUserTokens.bind(this);
    this.SendOrderForSale = this.SendOrderForSale.bind(this);
    this.UpdateUser = this.UpdateUser.bind(this);
    this.AddUserContact = this.AddUserContact.bind(this);
    this.SetCustomerCity = this.SetCustomerCity.bind(this);
    this.SuggestAddress = this.SuggestAddress.bind(this);
    this.FindAddressByCoords = this.FindAddressByCoords.bind(this);
    this.FindAddressByIP = this.FindAddressByIP.bind(this);
    this.FindCheckout = this.FindCheckout.bind(this);
    this.SwitchCheckoutType = this.SwitchCheckoutType.bind(this);
    this.AddCartItems = this.AddCartItems.bind(this);
    this.RemoveCartItems = this.RemoveCartItems.bind(this);
    this.SelectCartItems = this.SelectCartItems.bind(this);
    this.UnselectCartItems = this.UnselectCartItems.bind(this);
    this.CalculateDiscounts = this.CalculateDiscounts.bind(this);
    this.CalculateDelivery = this.CalculateDelivery.bind(this);
    this.CalculateDeliveryClickAndCollect = this.CalculateDeliveryClickAndCollect.bind(this);
    this.SelectDeliveryInterval = this.SelectDeliveryInterval.bind(this);
    this.SetDeliveryRecipient = this.SetDeliveryRecipient.bind(this);
    this.ProcessCheckout = this.ProcessCheckout.bind(this);
    this.SetPaymentResult = this.SetPaymentResult.bind(this);
    this.GetItemByCode = this.GetItemByCode.bind(this);
    this.GetItemsDeliveryOptions = this.GetItemsDeliveryOptions.bind(this);
    this.GetItemsByCodes = this.GetItemsByCodes.bind(this);
    this.GetItems = this.GetItems.bind(this);
    this.GetHomeScreen = this.GetHomeScreen.bind(this);
    this.GetCatalog = this.GetCatalog.bind(this);
    this.GetCategory = this.GetCategory.bind(this);
    this.GetMenuTree = this.GetMenuTree.bind(this);
    this.GetBrandListV2 = this.GetBrandListV2.bind(this);
    this.Suggest = this.Suggest.bind(this);
    this.GetCustomerOrders = this.GetCustomerOrders.bind(this);
    this.GetCustomerOrder = this.GetCustomerOrder.bind(this);
    this.MarkOrderAsRated = this.MarkOrderAsRated.bind(this);
    this.ListSavedCards = this.ListSavedCards.bind(this);
    this.GetCustomerProfile = this.GetCustomerProfile.bind(this);
    this.GetBreadCrumbs = this.GetBreadCrumbs.bind(this);
    this.GetInitializationInfo = this.GetInitializationInfo.bind(this);
    this.AddItemsToFavoriteList = this.AddItemsToFavoriteList.bind(this);
    this.GetCustomerFavoriteLists = this.GetCustomerFavoriteLists.bind(this);
    this.RemoveItemsFromFavoriteList = this.RemoveItemsFromFavoriteList.bind(this);
    this.GetFavoriteItemsList = this.GetFavoriteItemsList.bind(this);
    this.AddBrandsToFavoriteList = this.AddBrandsToFavoriteList.bind(this);
    this.RemoveBrandsFromFavoriteList = this.RemoveBrandsFromFavoriteList.bind(this);
    this.GetFavoriteBrandsList = this.GetFavoriteBrandsList.bind(this);
    this.GetBrandsItemsList = this.GetBrandsItemsList.bind(this);
    this.GetLoyalty = this.GetLoyalty.bind(this);
    this.GetFavoriteList = this.GetFavoriteList.bind(this);
    this.GetBrandList = this.GetBrandList.bind(this);
    this.GetAuthenticationCode = this.GetAuthenticationCode.bind(this);
    this.GetItemsList = this.GetItemsList.bind(this);
    this.GetItemListConfig = this.GetItemListConfig.bind(this);
    this.CheckToken = this.CheckToken.bind(this);
    this.CreateOffer = this.CreateOffer.bind(this);
    this.GetOffersByBidId = this.GetOffersByBidId.bind(this);
    this.GetAddress = this.GetAddress.bind(this);
    this.ListAddresses = this.ListAddresses.bind(this);
    this.GetCustomer = this.GetCustomer.bind(this);
    this.AddCustomer = this.AddCustomer.bind(this);
    this.UpdateCustomer = this.UpdateCustomer.bind(this);
    this.GetCustomerAddress = this.GetCustomerAddress.bind(this);
    this.ListCustomerAddresses = this.ListCustomerAddresses.bind(this);
    this.AddCustomerAddress = this.AddCustomerAddress.bind(this);
    this.UpdateCustomerAddress = this.UpdateCustomerAddress.bind(this);
    this.DeleteCustomerAddress = this.DeleteCustomerAddress.bind(this);
    this.UpdateCustomerProfile = this.UpdateCustomerProfile.bind(this);
    this.GetFavoriteBrands = this.GetFavoriteBrands.bind(this);
  }

  GetAuthenticationCodeWeb(
    request: DeepPartial<GetAuthenticationCodeWebRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetAuthenticationCodeWebResponse> {
    return this.rpc.unary(
      CustomerHubServiceGetAuthenticationCodeWebDesc,
      GetAuthenticationCodeWebRequest.fromPartial(request),
      metadata,
    );
  }

  GetAuthenticationCodeIos(
    request: DeepPartial<GetAuthenticationCodeIosRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetAuthenticationCodeIosResponse> {
    return this.rpc.unary(
      CustomerHubServiceGetAuthenticationCodeIosDesc,
      GetAuthenticationCodeIosRequest.fromPartial(request),
      metadata,
    );
  }

  GetAuthenticationCodeAndroid(
    request: DeepPartial<GetAuthenticationCodeAndroidRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetAuthenticationCodeAndroidResponse> {
    return this.rpc.unary(
      CustomerHubServiceGetAuthenticationCodeAndroidDesc,
      GetAuthenticationCodeAndroidRequest.fromPartial(request),
      metadata,
    );
  }

  AuthenticateByCode(
    request: DeepPartial<AuthenticateByCodeRequest>,
    metadata?: grpc.Metadata,
  ): Promise<TokenResponse> {
    return this.rpc.unary(
      CustomerHubServiceAuthenticateByCodeDesc,
      AuthenticateByCodeRequest.fromPartial(request),
      metadata,
    );
  }

  RefreshToken(request: DeepPartial<RefreshTokenRequest>, metadata?: grpc.Metadata): Promise<TokenResponse> {
    return this.rpc.unary(CustomerHubServiceRefreshTokenDesc, RefreshTokenRequest.fromPartial(request), metadata);
  }

  RevokeToken(request: DeepPartial<RevokeTokenRequest>, metadata?: grpc.Metadata): Promise<Empty> {
    return this.rpc.unary(CustomerHubServiceRevokeTokenDesc, RevokeTokenRequest.fromPartial(request), metadata);
  }

  RevokeUserTokens(request: DeepPartial<RevokeUserTokensRequest>, metadata?: grpc.Metadata): Promise<Empty> {
    return this.rpc.unary(
      CustomerHubServiceRevokeUserTokensDesc,
      RevokeUserTokensRequest.fromPartial(request),
      metadata,
    );
  }

  SendOrderForSale(request: DeepPartial<OrderForSaleRequest>, metadata?: grpc.Metadata): Promise<OrderForSaleResponse> {
    return this.rpc.unary(CustomerHubServiceSendOrderForSaleDesc, OrderForSaleRequest.fromPartial(request), metadata);
  }

  UpdateUser(request: DeepPartial<UpdateUserRequest>, metadata?: grpc.Metadata): Promise<UserResponse> {
    return this.rpc.unary(CustomerHubServiceUpdateUserDesc, UpdateUserRequest.fromPartial(request), metadata);
  }

  AddUserContact(
    request: DeepPartial<AddUserContactRequest>,
    metadata?: grpc.Metadata,
  ): Promise<AuthenticationCodeResponse> {
    return this.rpc.unary(CustomerHubServiceAddUserContactDesc, AddUserContactRequest.fromPartial(request), metadata);
  }

  SetCustomerCity(
    request: DeepPartial<SetCustomerCityRequest>,
    metadata?: grpc.Metadata,
  ): Promise<SetCustomerCityResponse> {
    return this.rpc.unary(CustomerHubServiceSetCustomerCityDesc, SetCustomerCityRequest.fromPartial(request), metadata);
  }

  SuggestAddress(
    request: DeepPartial<SuggestAddressRequest>,
    metadata?: grpc.Metadata,
  ): Promise<SuggestAddressResponse> {
    return this.rpc.unary(CustomerHubServiceSuggestAddressDesc, SuggestAddressRequest.fromPartial(request), metadata);
  }

  FindAddressByCoords(
    request: DeepPartial<FindAddressByCoordsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<FindAddressByCoordsResponse> {
    return this.rpc.unary(
      CustomerHubServiceFindAddressByCoordsDesc,
      FindAddressByCoordsRequest.fromPartial(request),
      metadata,
    );
  }

  FindAddressByIP(
    request: DeepPartial<FindAddressByIPRequest>,
    metadata?: grpc.Metadata,
  ): Promise<FindAddressByIPResponse> {
    return this.rpc.unary(CustomerHubServiceFindAddressByIPDesc, FindAddressByIPRequest.fromPartial(request), metadata);
  }

  FindCheckout(request: DeepPartial<FindCheckoutRequest>, metadata?: grpc.Metadata): Promise<CheckoutData> {
    return this.rpc.unary(CustomerHubServiceFindCheckoutDesc, FindCheckoutRequest.fromPartial(request), metadata);
  }

  SwitchCheckoutType(request: DeepPartial<SwitchCheckoutTypeRequest>, metadata?: grpc.Metadata): Promise<CheckoutData> {
    return this.rpc.unary(
      CustomerHubServiceSwitchCheckoutTypeDesc,
      SwitchCheckoutTypeRequest.fromPartial(request),
      metadata,
    );
  }

  AddCartItems(request: DeepPartial<AddCartItemsRequest>, metadata?: grpc.Metadata): Promise<CheckoutData> {
    return this.rpc.unary(CustomerHubServiceAddCartItemsDesc, AddCartItemsRequest.fromPartial(request), metadata);
  }

  RemoveCartItems(request: DeepPartial<RemoveCartItemsRequest>, metadata?: grpc.Metadata): Promise<CheckoutData> {
    return this.rpc.unary(CustomerHubServiceRemoveCartItemsDesc, RemoveCartItemsRequest.fromPartial(request), metadata);
  }

  SelectCartItems(request: DeepPartial<SelectCartItemsRequest>, metadata?: grpc.Metadata): Promise<CheckoutData> {
    return this.rpc.unary(CustomerHubServiceSelectCartItemsDesc, SelectCartItemsRequest.fromPartial(request), metadata);
  }

  UnselectCartItems(request: DeepPartial<UnselectCartItemsRequest>, metadata?: grpc.Metadata): Promise<CheckoutData> {
    return this.rpc.unary(
      CustomerHubServiceUnselectCartItemsDesc,
      UnselectCartItemsRequest.fromPartial(request),
      metadata,
    );
  }

  CalculateDiscounts(request: DeepPartial<CalculateDiscountsRequest>, metadata?: grpc.Metadata): Promise<CheckoutData> {
    return this.rpc.unary(
      CustomerHubServiceCalculateDiscountsDesc,
      CalculateDiscountsRequest.fromPartial(request),
      metadata,
    );
  }

  CalculateDelivery(
    request: DeepPartial<CalculateDeliveryRequest>,
    metadata?: grpc.Metadata,
  ): Promise<CalculateDeliveryResponse> {
    return this.rpc.unary(
      CustomerHubServiceCalculateDeliveryDesc,
      CalculateDeliveryRequest.fromPartial(request),
      metadata,
    );
  }

  CalculateDeliveryClickAndCollect(
    request: DeepPartial<CalculateDeliveryRequest>,
    metadata?: grpc.Metadata,
  ): Promise<CheckoutData> {
    return this.rpc.unary(
      CustomerHubServiceCalculateDeliveryClickAndCollectDesc,
      CalculateDeliveryRequest.fromPartial(request),
      metadata,
    );
  }

  SelectDeliveryInterval(
    request: DeepPartial<SelectDeliveryIntervalRequest>,
    metadata?: grpc.Metadata,
  ): Promise<CheckoutData> {
    return this.rpc.unary(
      CustomerHubServiceSelectDeliveryIntervalDesc,
      SelectDeliveryIntervalRequest.fromPartial(request),
      metadata,
    );
  }

  SetDeliveryRecipient(
    request: DeepPartial<SetDeliveryRecipientRequest>,
    metadata?: grpc.Metadata,
  ): Promise<CheckoutData> {
    return this.rpc.unary(
      CustomerHubServiceSetDeliveryRecipientDesc,
      SetDeliveryRecipientRequest.fromPartial(request),
      metadata,
    );
  }

  ProcessCheckout(
    request: DeepPartial<ProcessCheckoutRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ProcessCheckoutResponse> {
    return this.rpc.unary(CustomerHubServiceProcessCheckoutDesc, ProcessCheckoutRequest.fromPartial(request), metadata);
  }

  SetPaymentResult(
    request: DeepPartial<SetPaymentResultRequest>,
    metadata?: grpc.Metadata,
  ): Promise<SetPaymentResultResponse> {
    return this.rpc.unary(
      CustomerHubServiceSetPaymentResultDesc,
      SetPaymentResultRequest.fromPartial(request),
      metadata,
    );
  }

  GetItemByCode(request: DeepPartial<GetItemByCodeRequest>, metadata?: grpc.Metadata): Promise<GetItemByCodeResponse> {
    return this.rpc.unary(CustomerHubServiceGetItemByCodeDesc, GetItemByCodeRequest.fromPartial(request), metadata);
  }

  GetItemsDeliveryOptions(
    request: DeepPartial<GetItemsDeliveryOptionsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetItemsDeliveryOptionsResponse> {
    return this.rpc.unary(
      CustomerHubServiceGetItemsDeliveryOptionsDesc,
      GetItemsDeliveryOptionsRequest.fromPartial(request),
      metadata,
    );
  }

  GetItemsByCodes(
    request: DeepPartial<GetItemsByCodesRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetItemsByCodesResponse> {
    return this.rpc.unary(CustomerHubServiceGetItemsByCodesDesc, GetItemsByCodesRequest.fromPartial(request), metadata);
  }

  GetItems(request: DeepPartial<GetItemsRequest>, metadata?: grpc.Metadata): Promise<GetItemsResponse> {
    return this.rpc.unary(CustomerHubServiceGetItemsDesc, GetItemsRequest.fromPartial(request), metadata);
  }

  GetHomeScreen(request: DeepPartial<HomeRequest>, metadata?: grpc.Metadata): Promise<HomeResponse> {
    return this.rpc.unary(CustomerHubServiceGetHomeScreenDesc, HomeRequest.fromPartial(request), metadata);
  }

  GetCatalog(request: DeepPartial<GetCatalogRequest>, metadata?: grpc.Metadata): Promise<GetCatalogResponse> {
    return this.rpc.unary(CustomerHubServiceGetCatalogDesc, GetCatalogRequest.fromPartial(request), metadata);
  }

  GetCategory(request: DeepPartial<GetCategoryRequest>, metadata?: grpc.Metadata): Promise<GetCategoryResponse> {
    return this.rpc.unary(CustomerHubServiceGetCategoryDesc, GetCategoryRequest.fromPartial(request), metadata);
  }

  GetMenuTree(request: DeepPartial<GetMenuTreeRequest>, metadata?: grpc.Metadata): Promise<GetMenuTreeResponse> {
    return this.rpc.unary(CustomerHubServiceGetMenuTreeDesc, GetMenuTreeRequest.fromPartial(request), metadata);
  }

  GetBrandListV2(request: DeepPartial<GetBrandListRequest>, metadata?: grpc.Metadata): Promise<GetBrandListResponse> {
    return this.rpc.unary(CustomerHubServiceGetBrandListV2Desc, GetBrandListRequest.fromPartial(request), metadata);
  }

  Suggest(request: DeepPartial<SuggestRequest>, metadata?: grpc.Metadata): Promise<SuggestResponse> {
    return this.rpc.unary(CustomerHubServiceSuggestDesc, SuggestRequest.fromPartial(request), metadata);
  }

  GetCustomerOrders(
    request: DeepPartial<GetCustomerOrdersRequest>,
    metadata?: grpc.Metadata,
  ): Promise<CustomerOrdersResponse> {
    return this.rpc.unary(
      CustomerHubServiceGetCustomerOrdersDesc,
      GetCustomerOrdersRequest.fromPartial(request),
      metadata,
    );
  }

  GetCustomerOrder(request: DeepPartial<GetCustomerOrderRequest>, metadata?: grpc.Metadata): Promise<Order> {
    return this.rpc.unary(
      CustomerHubServiceGetCustomerOrderDesc,
      GetCustomerOrderRequest.fromPartial(request),
      metadata,
    );
  }

  MarkOrderAsRated(
    request: DeepPartial<MarkOrderAsRatedRequest>,
    metadata?: grpc.Metadata,
  ): Promise<MarkOrderAsRatedResponse> {
    return this.rpc.unary(
      CustomerHubServiceMarkOrderAsRatedDesc,
      MarkOrderAsRatedRequest.fromPartial(request),
      metadata,
    );
  }

  ListSavedCards(
    request: DeepPartial<ListSavedCardsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListSavedCardsResponse> {
    return this.rpc.unary(CustomerHubServiceListSavedCardsDesc, ListSavedCardsRequest.fromPartial(request), metadata);
  }

  GetCustomerProfile(
    request: DeepPartial<GetCustomerProfileRequest>,
    metadata?: grpc.Metadata,
  ): Promise<CustomerProfileResponse> {
    return this.rpc.unary(
      CustomerHubServiceGetCustomerProfileDesc,
      GetCustomerProfileRequest.fromPartial(request),
      metadata,
    );
  }

  GetBreadCrumbs(
    request: DeepPartial<GetBreadCrumbsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetBreadCrumbsResponse> {
    return this.rpc.unary(CustomerHubServiceGetBreadCrumbsDesc, GetBreadCrumbsRequest.fromPartial(request), metadata);
  }

  GetInitializationInfo(
    request: DeepPartial<GetInitializationInfoRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetInitializationInfoResponse> {
    return this.rpc.unary(
      CustomerHubServiceGetInitializationInfoDesc,
      GetInitializationInfoRequest.fromPartial(request),
      metadata,
    );
  }

  AddItemsToFavoriteList(
    request: DeepPartial<AddItemsToFavoriteListRequest>,
    metadata?: grpc.Metadata,
  ): Promise<AddItemsToFavoriteListResponse> {
    return this.rpc.unary(
      CustomerHubServiceAddItemsToFavoriteListDesc,
      AddItemsToFavoriteListRequest.fromPartial(request),
      metadata,
    );
  }

  GetCustomerFavoriteLists(
    request: DeepPartial<GetCustomerFavoriteListsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetCustomerFavoriteListsResponse> {
    return this.rpc.unary(
      CustomerHubServiceGetCustomerFavoriteListsDesc,
      GetCustomerFavoriteListsRequest.fromPartial(request),
      metadata,
    );
  }

  RemoveItemsFromFavoriteList(
    request: DeepPartial<RemoveItemsFromFavoriteListRequest>,
    metadata?: grpc.Metadata,
  ): Promise<RemoveItemsFromFavoriteListResponse> {
    return this.rpc.unary(
      CustomerHubServiceRemoveItemsFromFavoriteListDesc,
      RemoveItemsFromFavoriteListRequest.fromPartial(request),
      metadata,
    );
  }

  GetFavoriteItemsList(
    request: DeepPartial<GetFavoriteItemsListRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetFavoriteItemsListResponse> {
    return this.rpc.unary(
      CustomerHubServiceGetFavoriteItemsListDesc,
      GetFavoriteItemsListRequest.fromPartial(request),
      metadata,
    );
  }

  AddBrandsToFavoriteList(
    request: DeepPartial<AddBrandsToFavoriteListRequest>,
    metadata?: grpc.Metadata,
  ): Promise<AddBrandsToFavoriteListResponse> {
    return this.rpc.unary(
      CustomerHubServiceAddBrandsToFavoriteListDesc,
      AddBrandsToFavoriteListRequest.fromPartial(request),
      metadata,
    );
  }

  RemoveBrandsFromFavoriteList(
    request: DeepPartial<RemoveBrandsFromFavoriteListRequest>,
    metadata?: grpc.Metadata,
  ): Promise<RemoveBrandsFromFavoriteListResponse> {
    return this.rpc.unary(
      CustomerHubServiceRemoveBrandsFromFavoriteListDesc,
      RemoveBrandsFromFavoriteListRequest.fromPartial(request),
      metadata,
    );
  }

  GetFavoriteBrandsList(
    request: DeepPartial<GetFavoriteBrandsListRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetFavoriteBrandsListResponse> {
    return this.rpc.unary(
      CustomerHubServiceGetFavoriteBrandsListDesc,
      GetFavoriteBrandsListRequest.fromPartial(request),
      metadata,
    );
  }

  GetBrandsItemsList(
    request: DeepPartial<GetFavoriteBrandsItemsListRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetBrandsItemsListResponse> {
    return this.rpc.unary(
      CustomerHubServiceGetBrandsItemsListDesc,
      GetFavoriteBrandsItemsListRequest.fromPartial(request),
      metadata,
    );
  }

  GetLoyalty(request: DeepPartial<GetLoyaltyRequest>, metadata?: grpc.Metadata): Promise<GetLoyaltyResponse> {
    return this.rpc.unary(CustomerHubServiceGetLoyaltyDesc, GetLoyaltyRequest.fromPartial(request), metadata);
  }

  GetFavoriteList(
    request: DeepPartial<GetFavoriteListRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetFavoriteListResponse> {
    return this.rpc.unary(CustomerHubServiceGetFavoriteListDesc, GetFavoriteListRequest.fromPartial(request), metadata);
  }

  GetBrandList(request: DeepPartial<Empty>, metadata?: grpc.Metadata): Promise<GetBrandListResponse> {
    return this.rpc.unary(CustomerHubServiceGetBrandListDesc, Empty.fromPartial(request), metadata);
  }

  GetAuthenticationCode(
    request: DeepPartial<GetAuthenticationCodeRequest>,
    metadata?: grpc.Metadata,
  ): Promise<AuthenticationCodeResponse> {
    return this.rpc.unary(
      CustomerHubServiceGetAuthenticationCodeDesc,
      GetAuthenticationCodeRequest.fromPartial(request),
      metadata,
    );
  }

  GetItemsList(request: DeepPartial<GetItemListRequest>, metadata?: grpc.Metadata): Promise<GetItemListResponse> {
    return this.rpc.unary(CustomerHubServiceGetItemsListDesc, GetItemListRequest.fromPartial(request), metadata);
  }

  GetItemListConfig(
    request: DeepPartial<GetItemListRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetItemListConfigResponse> {
    return this.rpc.unary(CustomerHubServiceGetItemListConfigDesc, GetItemListRequest.fromPartial(request), metadata);
  }

  CheckToken(request: DeepPartial<CheckTokenRequest>, metadata?: grpc.Metadata): Promise<Empty> {
    return this.rpc.unary(CustomerHubServiceCheckTokenDesc, CheckTokenRequest.fromPartial(request), metadata);
  }

  CreateOffer(request: DeepPartial<CreateOfferRequest>, metadata?: grpc.Metadata): Promise<CreateOfferResponse> {
    return this.rpc.unary(CustomerHubServiceCreateOfferDesc, CreateOfferRequest.fromPartial(request), metadata);
  }

  GetOffersByBidId(
    request: DeepPartial<GetOffersByBidIdRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetOffersByBidIdResponse> {
    return this.rpc.unary(
      CustomerHubServiceGetOffersByBidIdDesc,
      GetOffersByBidIdRequest.fromPartial(request),
      metadata,
    );
  }

  GetAddress(request: DeepPartial<GetAddressRequest>, metadata?: grpc.Metadata): Promise<GetAddressResponse> {
    return this.rpc.unary(CustomerHubServiceGetAddressDesc, GetAddressRequest.fromPartial(request), metadata);
  }

  ListAddresses(request: DeepPartial<ListAddressesRequest>, metadata?: grpc.Metadata): Promise<ListAddressesResponse> {
    return this.rpc.unary(CustomerHubServiceListAddressesDesc, ListAddressesRequest.fromPartial(request), metadata);
  }

  GetCustomer(request: DeepPartial<GetCustomerRequest>, metadata?: grpc.Metadata): Promise<GetCustomerResponse> {
    return this.rpc.unary(CustomerHubServiceGetCustomerDesc, GetCustomerRequest.fromPartial(request), metadata);
  }

  AddCustomer(request: DeepPartial<CreateCustomerRequest>, metadata?: grpc.Metadata): Promise<CreateCustomerResponse> {
    return this.rpc.unary(CustomerHubServiceAddCustomerDesc, CreateCustomerRequest.fromPartial(request), metadata);
  }

  UpdateCustomer(
    request: DeepPartial<UpdateCustomerRequest>,
    metadata?: grpc.Metadata,
  ): Promise<UpdateCustomerResponse> {
    return this.rpc.unary(CustomerHubServiceUpdateCustomerDesc, UpdateCustomerRequest.fromPartial(request), metadata);
  }

  GetCustomerAddress(
    request: DeepPartial<GetCustomerAddressRequest>,
    metadata?: grpc.Metadata,
  ): Promise<GetCustomerAddressResponse> {
    return this.rpc.unary(
      CustomerHubServiceGetCustomerAddressDesc,
      GetCustomerAddressRequest.fromPartial(request),
      metadata,
    );
  }

  ListCustomerAddresses(
    request: DeepPartial<ListCustomerAddressesRequest>,
    metadata?: grpc.Metadata,
  ): Promise<ListCustomerAddressesResponse> {
    return this.rpc.unary(
      CustomerHubServiceListCustomerAddressesDesc,
      ListCustomerAddressesRequest.fromPartial(request),
      metadata,
    );
  }

  AddCustomerAddress(
    request: DeepPartial<CreateCustomerAddressRequest>,
    metadata?: grpc.Metadata,
  ): Promise<CreateCustomerAddressResponse> {
    return this.rpc.unary(
      CustomerHubServiceAddCustomerAddressDesc,
      CreateCustomerAddressRequest.fromPartial(request),
      metadata,
    );
  }

  UpdateCustomerAddress(
    request: DeepPartial<UpdateCustomerAddressRequest>,
    metadata?: grpc.Metadata,
  ): Promise<UpdateCustomerAddressResponse> {
    return this.rpc.unary(
      CustomerHubServiceUpdateCustomerAddressDesc,
      UpdateCustomerAddressRequest.fromPartial(request),
      metadata,
    );
  }

  DeleteCustomerAddress(request: DeepPartial<DeleteCustomerAddressRequest>, metadata?: grpc.Metadata): Promise<Empty> {
    return this.rpc.unary(
      CustomerHubServiceDeleteCustomerAddressDesc,
      DeleteCustomerAddressRequest.fromPartial(request),
      metadata,
    );
  }

  UpdateCustomerProfile(
    request: DeepPartial<UpdateCustomerProfileRequest>,
    metadata?: grpc.Metadata,
  ): Promise<CustomerProfileResponse> {
    return this.rpc.unary(
      CustomerHubServiceUpdateCustomerProfileDesc,
      UpdateCustomerProfileRequest.fromPartial(request),
      metadata,
    );
  }

  GetFavoriteBrands(
    request: DeepPartial<GetFavoriteBrandsRequest>,
    metadata?: grpc.Metadata,
  ): Promise<FavoriteBrandsResponse> {
    return this.rpc.unary(
      CustomerHubServiceGetFavoriteBrandsDesc,
      GetFavoriteBrandsRequest.fromPartial(request),
      metadata,
    );
  }
}

export const CustomerHubServiceDesc = { serviceName: "utp.customer_hub_service.v1.CustomerHubService" };

export const CustomerHubServiceGetAuthenticationCodeWebDesc: UnaryMethodDefinitionish = {
  methodName: "GetAuthenticationCodeWeb",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetAuthenticationCodeWebRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetAuthenticationCodeWebResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceGetAuthenticationCodeIosDesc: UnaryMethodDefinitionish = {
  methodName: "GetAuthenticationCodeIos",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetAuthenticationCodeIosRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetAuthenticationCodeIosResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceGetAuthenticationCodeAndroidDesc: UnaryMethodDefinitionish = {
  methodName: "GetAuthenticationCodeAndroid",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetAuthenticationCodeAndroidRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetAuthenticationCodeAndroidResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceAuthenticateByCodeDesc: UnaryMethodDefinitionish = {
  methodName: "AuthenticateByCode",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return AuthenticateByCodeRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = TokenResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceRefreshTokenDesc: UnaryMethodDefinitionish = {
  methodName: "RefreshToken",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return RefreshTokenRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = TokenResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceRevokeTokenDesc: UnaryMethodDefinitionish = {
  methodName: "RevokeToken",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return RevokeTokenRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = Empty.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceRevokeUserTokensDesc: UnaryMethodDefinitionish = {
  methodName: "RevokeUserTokens",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return RevokeUserTokensRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = Empty.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceSendOrderForSaleDesc: UnaryMethodDefinitionish = {
  methodName: "SendOrderForSale",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return OrderForSaleRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = OrderForSaleResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceUpdateUserDesc: UnaryMethodDefinitionish = {
  methodName: "UpdateUser",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return UpdateUserRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = UserResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceAddUserContactDesc: UnaryMethodDefinitionish = {
  methodName: "AddUserContact",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return AddUserContactRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = AuthenticationCodeResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceSetCustomerCityDesc: UnaryMethodDefinitionish = {
  methodName: "SetCustomerCity",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return SetCustomerCityRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = SetCustomerCityResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceSuggestAddressDesc: UnaryMethodDefinitionish = {
  methodName: "SuggestAddress",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return SuggestAddressRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = SuggestAddressResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceFindAddressByCoordsDesc: UnaryMethodDefinitionish = {
  methodName: "FindAddressByCoords",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return FindAddressByCoordsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = FindAddressByCoordsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceFindAddressByIPDesc: UnaryMethodDefinitionish = {
  methodName: "FindAddressByIP",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return FindAddressByIPRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = FindAddressByIPResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceFindCheckoutDesc: UnaryMethodDefinitionish = {
  methodName: "FindCheckout",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return FindCheckoutRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = CheckoutData.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceSwitchCheckoutTypeDesc: UnaryMethodDefinitionish = {
  methodName: "SwitchCheckoutType",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return SwitchCheckoutTypeRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = CheckoutData.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceAddCartItemsDesc: UnaryMethodDefinitionish = {
  methodName: "AddCartItems",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return AddCartItemsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = CheckoutData.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceRemoveCartItemsDesc: UnaryMethodDefinitionish = {
  methodName: "RemoveCartItems",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return RemoveCartItemsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = CheckoutData.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceSelectCartItemsDesc: UnaryMethodDefinitionish = {
  methodName: "SelectCartItems",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return SelectCartItemsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = CheckoutData.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceUnselectCartItemsDesc: UnaryMethodDefinitionish = {
  methodName: "UnselectCartItems",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return UnselectCartItemsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = CheckoutData.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceCalculateDiscountsDesc: UnaryMethodDefinitionish = {
  methodName: "CalculateDiscounts",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return CalculateDiscountsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = CheckoutData.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceCalculateDeliveryDesc: UnaryMethodDefinitionish = {
  methodName: "CalculateDelivery",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return CalculateDeliveryRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = CalculateDeliveryResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceCalculateDeliveryClickAndCollectDesc: UnaryMethodDefinitionish = {
  methodName: "CalculateDeliveryClickAndCollect",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return CalculateDeliveryRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = CheckoutData.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceSelectDeliveryIntervalDesc: UnaryMethodDefinitionish = {
  methodName: "SelectDeliveryInterval",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return SelectDeliveryIntervalRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = CheckoutData.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceSetDeliveryRecipientDesc: UnaryMethodDefinitionish = {
  methodName: "SetDeliveryRecipient",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return SetDeliveryRecipientRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = CheckoutData.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceProcessCheckoutDesc: UnaryMethodDefinitionish = {
  methodName: "ProcessCheckout",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ProcessCheckoutRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ProcessCheckoutResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceSetPaymentResultDesc: UnaryMethodDefinitionish = {
  methodName: "SetPaymentResult",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return SetPaymentResultRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = SetPaymentResultResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceGetItemByCodeDesc: UnaryMethodDefinitionish = {
  methodName: "GetItemByCode",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetItemByCodeRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetItemByCodeResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceGetItemsDeliveryOptionsDesc: UnaryMethodDefinitionish = {
  methodName: "GetItemsDeliveryOptions",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetItemsDeliveryOptionsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetItemsDeliveryOptionsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceGetItemsByCodesDesc: UnaryMethodDefinitionish = {
  methodName: "GetItemsByCodes",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetItemsByCodesRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetItemsByCodesResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceGetItemsDesc: UnaryMethodDefinitionish = {
  methodName: "GetItems",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetItemsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetItemsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceGetHomeScreenDesc: UnaryMethodDefinitionish = {
  methodName: "GetHomeScreen",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return HomeRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = HomeResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceGetCatalogDesc: UnaryMethodDefinitionish = {
  methodName: "GetCatalog",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetCatalogRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetCatalogResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceGetCategoryDesc: UnaryMethodDefinitionish = {
  methodName: "GetCategory",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetCategoryRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetCategoryResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceGetMenuTreeDesc: UnaryMethodDefinitionish = {
  methodName: "GetMenuTree",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetMenuTreeRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetMenuTreeResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceGetBrandListV2Desc: UnaryMethodDefinitionish = {
  methodName: "GetBrandListV2",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetBrandListRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetBrandListResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceSuggestDesc: UnaryMethodDefinitionish = {
  methodName: "Suggest",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return SuggestRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = SuggestResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceGetCustomerOrdersDesc: UnaryMethodDefinitionish = {
  methodName: "GetCustomerOrders",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetCustomerOrdersRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = CustomerOrdersResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceGetCustomerOrderDesc: UnaryMethodDefinitionish = {
  methodName: "GetCustomerOrder",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetCustomerOrderRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = Order.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceMarkOrderAsRatedDesc: UnaryMethodDefinitionish = {
  methodName: "MarkOrderAsRated",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return MarkOrderAsRatedRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = MarkOrderAsRatedResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceListSavedCardsDesc: UnaryMethodDefinitionish = {
  methodName: "ListSavedCards",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ListSavedCardsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ListSavedCardsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceGetCustomerProfileDesc: UnaryMethodDefinitionish = {
  methodName: "GetCustomerProfile",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetCustomerProfileRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = CustomerProfileResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceGetBreadCrumbsDesc: UnaryMethodDefinitionish = {
  methodName: "GetBreadCrumbs",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetBreadCrumbsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetBreadCrumbsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceGetInitializationInfoDesc: UnaryMethodDefinitionish = {
  methodName: "GetInitializationInfo",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetInitializationInfoRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetInitializationInfoResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceAddItemsToFavoriteListDesc: UnaryMethodDefinitionish = {
  methodName: "AddItemsToFavoriteList",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return AddItemsToFavoriteListRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = AddItemsToFavoriteListResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceGetCustomerFavoriteListsDesc: UnaryMethodDefinitionish = {
  methodName: "GetCustomerFavoriteLists",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetCustomerFavoriteListsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetCustomerFavoriteListsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceRemoveItemsFromFavoriteListDesc: UnaryMethodDefinitionish = {
  methodName: "RemoveItemsFromFavoriteList",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return RemoveItemsFromFavoriteListRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = RemoveItemsFromFavoriteListResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceGetFavoriteItemsListDesc: UnaryMethodDefinitionish = {
  methodName: "GetFavoriteItemsList",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetFavoriteItemsListRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetFavoriteItemsListResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceAddBrandsToFavoriteListDesc: UnaryMethodDefinitionish = {
  methodName: "AddBrandsToFavoriteList",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return AddBrandsToFavoriteListRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = AddBrandsToFavoriteListResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceRemoveBrandsFromFavoriteListDesc: UnaryMethodDefinitionish = {
  methodName: "RemoveBrandsFromFavoriteList",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return RemoveBrandsFromFavoriteListRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = RemoveBrandsFromFavoriteListResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceGetFavoriteBrandsListDesc: UnaryMethodDefinitionish = {
  methodName: "GetFavoriteBrandsList",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetFavoriteBrandsListRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetFavoriteBrandsListResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceGetBrandsItemsListDesc: UnaryMethodDefinitionish = {
  methodName: "GetBrandsItemsList",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetFavoriteBrandsItemsListRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetBrandsItemsListResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceGetLoyaltyDesc: UnaryMethodDefinitionish = {
  methodName: "GetLoyalty",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetLoyaltyRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetLoyaltyResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceGetFavoriteListDesc: UnaryMethodDefinitionish = {
  methodName: "GetFavoriteList",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetFavoriteListRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetFavoriteListResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceGetBrandListDesc: UnaryMethodDefinitionish = {
  methodName: "GetBrandList",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return Empty.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetBrandListResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceGetAuthenticationCodeDesc: UnaryMethodDefinitionish = {
  methodName: "GetAuthenticationCode",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetAuthenticationCodeRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = AuthenticationCodeResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceGetItemsListDesc: UnaryMethodDefinitionish = {
  methodName: "GetItemsList",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetItemListRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetItemListResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceGetItemListConfigDesc: UnaryMethodDefinitionish = {
  methodName: "GetItemListConfig",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetItemListRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetItemListConfigResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceCheckTokenDesc: UnaryMethodDefinitionish = {
  methodName: "CheckToken",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return CheckTokenRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = Empty.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceCreateOfferDesc: UnaryMethodDefinitionish = {
  methodName: "CreateOffer",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return CreateOfferRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = CreateOfferResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceGetOffersByBidIdDesc: UnaryMethodDefinitionish = {
  methodName: "GetOffersByBidId",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetOffersByBidIdRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetOffersByBidIdResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceGetAddressDesc: UnaryMethodDefinitionish = {
  methodName: "GetAddress",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetAddressRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetAddressResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceListAddressesDesc: UnaryMethodDefinitionish = {
  methodName: "ListAddresses",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ListAddressesRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ListAddressesResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceGetCustomerDesc: UnaryMethodDefinitionish = {
  methodName: "GetCustomer",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetCustomerRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetCustomerResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceAddCustomerDesc: UnaryMethodDefinitionish = {
  methodName: "AddCustomer",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return CreateCustomerRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = CreateCustomerResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceUpdateCustomerDesc: UnaryMethodDefinitionish = {
  methodName: "UpdateCustomer",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return UpdateCustomerRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = UpdateCustomerResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceGetCustomerAddressDesc: UnaryMethodDefinitionish = {
  methodName: "GetCustomerAddress",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetCustomerAddressRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = GetCustomerAddressResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceListCustomerAddressesDesc: UnaryMethodDefinitionish = {
  methodName: "ListCustomerAddresses",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return ListCustomerAddressesRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = ListCustomerAddressesResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceAddCustomerAddressDesc: UnaryMethodDefinitionish = {
  methodName: "AddCustomerAddress",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return CreateCustomerAddressRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = CreateCustomerAddressResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceUpdateCustomerAddressDesc: UnaryMethodDefinitionish = {
  methodName: "UpdateCustomerAddress",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return UpdateCustomerAddressRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = UpdateCustomerAddressResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceDeleteCustomerAddressDesc: UnaryMethodDefinitionish = {
  methodName: "DeleteCustomerAddress",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return DeleteCustomerAddressRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = Empty.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceUpdateCustomerProfileDesc: UnaryMethodDefinitionish = {
  methodName: "UpdateCustomerProfile",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return UpdateCustomerProfileRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = CustomerProfileResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const CustomerHubServiceGetFavoriteBrandsDesc: UnaryMethodDefinitionish = {
  methodName: "GetFavoriteBrands",
  service: CustomerHubServiceDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return GetFavoriteBrandsRequest.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = FavoriteBrandsResponse.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

interface UnaryMethodDefinitionishR extends grpc.UnaryMethodDefinition<any, any> {
  requestStream: any;
  responseStream: any;
}

type UnaryMethodDefinitionish = UnaryMethodDefinitionishR;

interface Rpc {
  unary<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    request: any,
    metadata: grpc.Metadata | undefined,
  ): Promise<any>;
}

export class GrpcWebImpl {
  private host: string;
  private options: {
    transport?: grpc.TransportFactory;

    debug?: boolean;
    metadata?: grpc.Metadata;
    upStreamRetryCodes?: number[];
  };

  constructor(
    host: string,
    options: {
      transport?: grpc.TransportFactory;

      debug?: boolean;
      metadata?: grpc.Metadata;
      upStreamRetryCodes?: number[];
    },
  ) {
    this.host = host;
    this.options = options;
  }

  unary<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    _request: any,
    metadata: grpc.Metadata | undefined,
  ): Promise<any> {
    const request = { ..._request, ...methodDesc.requestType };
    const maybeCombinedMetadata = metadata && this.options.metadata
      ? new BrowserHeaders({ ...this.options?.metadata.headersMap, ...metadata?.headersMap })
      : metadata ?? this.options.metadata;
    return new Promise((resolve, reject) => {
      grpc.unary(methodDesc, {
        request,
        host: this.host,
        metadata: maybeCombinedMetadata ?? {},
        ...(this.options.transport !== undefined ? { transport: this.options.transport } : {}),
        debug: this.options.debug ?? false,
        onEnd: function (response) {
          if (response.status === grpc.Code.OK) {
            resolve(response.message!.toObject());
          } else {
            const err = new GrpcWebError(response.statusMessage, response.status, response.trailers);
            reject(err);
          }
        },
      });
    });
  }
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

export class GrpcWebError extends globalThis.Error {
  constructor(message: string, public code: grpc.Code, public metadata: grpc.Metadata) {
    super(message);
  }
}
