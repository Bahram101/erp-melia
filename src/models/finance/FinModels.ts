import { CommonRefModel, DoctypeRefModel, PostRefModel, StatusRefModel } from '../CommonModels'

export interface CustomerDeptFormModel {
  customerId?: string | undefined
  amount: number | undefined
  toCashId: string
  docDate: string
}

export const DefaultCustomerDeptFormModel: CustomerDeptFormModel = {
  amount: undefined,
  toCashId: '',
  docDate: '',
}

export interface CashDocGridByContextModel {
  id: string;
  regNumber: number | null;
  amount: number;
  toCash: CommonRefModel;
  docDate: string;
  status: StatusRefModel;
  doctype: DoctypeRefModel;
  collector: PostRefModel;
  createdAt: string;
}
