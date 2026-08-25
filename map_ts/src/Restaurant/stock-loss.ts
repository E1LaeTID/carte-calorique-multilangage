export type StockLossKind =
  | "preparation"
  | "table-reset";

export type StockLoss = {
  sourceId: string;

  kind: StockLossKind;

  quantity: number;
  unit: string;

  reason?: string;
};