export enum DocStatus {
  NEW = "NEW",
  ON_PAYING = "ON_PAYING",
  CLOSED = "CLOSED",
  REJECTED = "REJECTED",
  CANCELLED = "CANCELLED",
  ON_EXECUTION = "ON_EXECUTION",
  PROBLEM = "PROBLEM",
  ON_APPROVE = "ON_APPROVE",
  DELETED = "DELETED",
}

export interface RefOptionsModel {
  id?: string ;
  value?: string;
  label: string;
}
