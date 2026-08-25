import type { Entity } from "./entity.js";

export type EntityOperationKind =
  | "connect"
  | "disconnect"
  | "add"
  | "subtract"
  | "apply"
  | "evolve";


export type EntityOperation<
  TInputPayload = unknown,
  TOutputPayload = TInputPayload
> = {
  name: string;
  kind: EntityOperationKind;

  apply: (
    entity: Entity<TInputPayload>
  ) => Entity<TOutputPayload>;
};


export type EntityExpansion<
  TInputPayload = unknown,
  TOutputPayload = TInputPayload
> = {
  name: string;
  kind: EntityOperationKind;

  apply: (
    entity: Entity<TInputPayload>
  ) => Entity<TOutputPayload>[];
};