import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { BasketItem } from '../../../models/basket-item/basket-item.model';
import { Basket } from '../../../models/basket/basket.model';
import { PaymentMethod } from '../../../models/payment-method/payment-method.model';
import { BasketUpdateType } from '../../services/basket/basket.service';

export enum BasketActionTypes {
  LoadBasket = '[Basket Internal] Load Basket',
  LoadBasketFail = '[Basket API] Load Basket Fail',
  LoadBasketSuccess = '[Basket API] Load Basket Success',
  UpdateBasketInvoiceAddress = '[Basket] Update Baskets Invoive Address',
  UpdateBasketShippingAddress = '[Basket] Update Baskets Shipping Address',
  UpdateBasket = '[Basket Internal] Update Basket',
  UpdateBasketFail = '[Basket API] Update Basket Fail',
  UpdateBasketSuccess = '[Basket API] Update Basket Success',
  LoadBasketItems = '[Basket Internal] Load Basket Items',
  LoadBasketItemsFail = '[Basket API] Load Basket Items Fail',
  LoadBasketItemsSuccess = '[Basket API] Load Basket Items Success',
  AddProductToBasket = '[Basket] Add Product',
  AddItemsToBasket = '[Basket Internal] Add Items To Basket',
  AddItemsToBasketFail = '[Basket API] Add Items To Basket Fail',
  AddItemsToBasketSuccess = '[Basket API] Add Items To Basket Success',
  UpdateBasketItems = '[Basket] Update Basket Items',
  UpdateBasketItemsFail = '[Basket API] Update Basket Items Fail',
  UpdateBasketItemsSuccess = '[Basket API] Update Basket Items Success',
  DeleteBasketItem = '[Basket] Delete Basket Item',
  DeleteBasketItemFail = '[Basket API] Delete Basket Item Fail',
  DeleteBasketItemSuccess = '[Basket API] Delete Basket Item Success',
  LoadBasketPayments = '[Basket Internal] Load Basket Payments',
  LoadBasketPaymentsFail = '[Basket API] Load Basket Payments Fail',
  LoadBasketPaymentsSuccess = '[Basket API] Load Basket Payments Success',
  ResetBasket = '[Basket Internal] Reset Basket',
}

export class LoadBasket implements Action {
  readonly type = BasketActionTypes.LoadBasket;
  constructor(public payload?: string) {}
}

export class LoadBasketFail implements Action {
  readonly type = BasketActionTypes.LoadBasketFail;
  constructor(public payload: HttpErrorResponse) {}
}

export class LoadBasketSuccess implements Action {
  readonly type = BasketActionTypes.LoadBasketSuccess;
  constructor(public payload: Basket) {}
}

export class UpdateBasketInvoiceAddress implements Action {
  readonly type = BasketActionTypes.UpdateBasketInvoiceAddress;
  constructor(public payload: string) {}
}

export class UpdateBasketShippingAddress implements Action {
  readonly type = BasketActionTypes.UpdateBasketShippingAddress;
  constructor(public payload: string) {}
}

export class UpdateBasket implements Action {
  readonly type = BasketActionTypes.UpdateBasket;
  constructor(public payload: BasketUpdateType) {}
}

export class UpdateBasketFail implements Action {
  readonly type = BasketActionTypes.UpdateBasketFail;
  constructor(public payload: HttpErrorResponse) {}
}

export class UpdateBasketSuccess implements Action {
  readonly type = BasketActionTypes.UpdateBasketSuccess;
}

export class LoadBasketItems implements Action {
  readonly type = BasketActionTypes.LoadBasketItems;
  constructor(public payload: string) {}
}

export class LoadBasketItemsFail implements Action {
  readonly type = BasketActionTypes.LoadBasketItemsFail;
  constructor(public payload: HttpErrorResponse) {}
}

export class LoadBasketItemsSuccess implements Action {
  readonly type = BasketActionTypes.LoadBasketItemsSuccess;
  constructor(public payload: BasketItem[]) {}
}

export class AddProductToBasket implements Action {
  readonly type = BasketActionTypes.AddProductToBasket;
  constructor(public payload: { sku: string; quantity: number }) {}
}

export class AddItemsToBasket implements Action {
  readonly type = BasketActionTypes.AddItemsToBasket;
  constructor(public payload: { items: { sku: string; quantity: number }[]; basketId?: string }) {}
}

export class AddItemsToBasketFail implements Action {
  readonly type = BasketActionTypes.AddItemsToBasketFail;
  constructor(public payload: HttpErrorResponse) {}
}

export class AddItemsToBasketSuccess implements Action {
  readonly type = BasketActionTypes.AddItemsToBasketSuccess;
}

export class UpdateBasketItems implements Action {
  readonly type = BasketActionTypes.UpdateBasketItems;
  constructor(public payload: { itemId: string; quantity: number }[]) {}
}

export class UpdateBasketItemsFail implements Action {
  readonly type = BasketActionTypes.UpdateBasketItemsFail;
  constructor(public payload: HttpErrorResponse) {}
}

export class UpdateBasketItemsSuccess implements Action {
  readonly type = BasketActionTypes.UpdateBasketItemsSuccess;
}

export class DeleteBasketItem implements Action {
  readonly type = BasketActionTypes.DeleteBasketItem;
  constructor(public payload: string) {}
}

export class DeleteBasketItemFail implements Action {
  readonly type = BasketActionTypes.DeleteBasketItemFail;
  constructor(public payload: HttpErrorResponse) {}
}

export class DeleteBasketItemSuccess implements Action {
  readonly type = BasketActionTypes.DeleteBasketItemSuccess;
}

export class LoadBasketPayments implements Action {
  readonly type = BasketActionTypes.LoadBasketPayments;
  constructor(public payload: string) {}
}

export class LoadBasketPaymentsFail implements Action {
  readonly type = BasketActionTypes.LoadBasketPaymentsFail;
  constructor(public payload: HttpErrorResponse) {}
}

export class LoadBasketPaymentsSuccess implements Action {
  readonly type = BasketActionTypes.LoadBasketPaymentsSuccess;
  constructor(public payload: PaymentMethod[]) {}
}

export class ResetBasket implements Action {
  readonly type = BasketActionTypes.ResetBasket;
}

export type BasketAction =
  | LoadBasket
  | LoadBasketFail
  | LoadBasketSuccess
  | UpdateBasketInvoiceAddress
  | UpdateBasketShippingAddress
  | UpdateBasket
  | UpdateBasketFail
  | UpdateBasketSuccess
  | LoadBasketItems
  | LoadBasketItemsFail
  | LoadBasketItemsSuccess
  | AddProductToBasket
  | AddItemsToBasket
  | AddItemsToBasketFail
  | AddItemsToBasketSuccess
  | UpdateBasketItems
  | UpdateBasketItemsFail
  | UpdateBasketItemsSuccess
  | DeleteBasketItem
  | DeleteBasketItemFail
  | DeleteBasketItemSuccess
  | LoadBasketPayments
  | LoadBasketPaymentsFail
  | LoadBasketPaymentsSuccess
  | ResetBasket;
