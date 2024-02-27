import {
  CommonRefModel,
  CustomerRefModel, DocActionButton,
  DocStatus,
  Doctype,
  DoctypeRefModel,
  PostRefModel,
  StatusRefModel,
} from '../CommonModels'

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

export interface CashDocGridModel {
  id: string
  regNumber?: string
  branchName?: string
  fromCashName?: string
  toCashName?: string
  amount: number
  status: DocStatus
  statusName: string
  docDate?: string
  note?: string
  createdAt: string
  doctype: Doctype
  doctypeName: string
  responsibleName?: string
}

export interface CashDocDetailedModel {
  id: string
  regNumber?: number
  doctype: DoctypeRefModel
  branch?: CommonRefModel
  fromCash?: CommonRefModel
  toCash?: CommonRefModel
  amount: number
  status: StatusRefModel
  //contextDoc:ContextDocRefModel
  customer?: CustomerRefModel
  currency?: string
  targetCurrency?: string
  docDate?: string
  createdAt: string
  updatedAt: string
  responsible?: PostRefModel
  note?: string
  actions: DocActionButton[]
}
