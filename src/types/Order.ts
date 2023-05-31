export type Order = {
  id: number;
  userId: number;
  productId?: number[];
};

export type OrdersM = {
  id: number;
  userId: number;
  productIds: [];
};

export type OrderToJson = {
  id: number;
  userId: number;
  productIds: IdsNumbers[];
};
export type IdsNumbers = {
  id: number;
};
