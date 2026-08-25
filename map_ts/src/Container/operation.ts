// operation.ts

export type Operation<TInput, TOutput = TInput> = {
  name: string;
  instruction: (input: TInput) => TOutput;
};

export type ExpandOperation<TInput, TOutput = TInput> = {
  name: string;
  instruction: (input: TInput) => TOutput[];
};