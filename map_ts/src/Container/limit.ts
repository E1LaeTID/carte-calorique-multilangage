// limit.ts

export type Subdivision = [
  unit: string,
  quantity: number
];

export type SizeLimit =
  | number
  | [width: number, height: number];

export type AmountPerUnit = [
  unit: string,
  amount: number
];

export type Limit = {
  id: string;
  subdivision: Subdivision;
  size: SizeLimit;
  amountPerUnit: AmountPerUnit;
};