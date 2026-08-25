export type ContractCondition = {
  name: string;
  satisfied: boolean;
};


export type OperationCost = {
  amount: number;
  unit: string;
};


export type EntityContract = {
  name: string;

  conditions: ContractCondition[];

  applyCost?: OperationCost;
  evolveCost?: OperationCost;
};