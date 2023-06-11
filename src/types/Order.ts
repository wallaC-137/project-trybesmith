export type Order = {
  id: number;
  userId: number;
  productId?: number[];
};

export type OrderToJson = {
  id: number;
  userId: number;
  productIds: IdsNumbers[];
};

export type IdsNumbers = {
  id: number;
};

export type OrderT = {
  userId: number;
  productIds: IdsNumbers[];
};