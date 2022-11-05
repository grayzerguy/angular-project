export class CartModel {
  items: CartItemModel[] = [];
}

export class CartItemModel {
  productId?: string;
  quantity?: number;
}

export class CartItemDetailedModel {
  product?: string;
  quantity?: number;
}
