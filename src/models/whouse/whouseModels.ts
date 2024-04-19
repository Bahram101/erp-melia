import {
  CommonRefModel, ContextDocGridModel, ContextDocRefModel,
  CustomerRefModel, DocActionButton,
  DocStatus,
  Doctype,
  DoctypeRefModel,
  StatusRefModel,
} from 'models/CommonModels'

export interface WhouseDocGridModel {
  id: string
  regNumber: number
  docDate: string
  status: string
  statusName: string
  fromWhouseName: string | null
  toWhouseName: string
  customerName: string
  note: string | null
  doctype: string
}

export interface WhouseDocItemFormModel {
  id?: string
  goodsId: string | null
  goodsName?: string
  quantity: number
  unitPrice: number
  serialNumbers: string[]
}

export const DefaultWhouseDocItemFormModel: WhouseDocItemFormModel = {
  goodsId: null,
  quantity: 0,
  unitPrice: 0,
  serialNumbers: [],
}

export const DefaultWhouseDocFormModel: WhouseDocFormModel = {
  branchId: null,
  regNumber: 0,
  toWhouseId: null,
  fromWhouseId: null,
  contextDoctype: null,
  contextDocId: '',
  contractRegNumber: 0,
  docDate: '',
  customerId: '',
  amount: 0,
  doctype: Doctype.SUPPLY,
  status: DocStatus.NEW,
  note: '',
  items: [DefaultWhouseDocItemFormModel],
}

export interface WhouseDocFormModel {
  branchId?: null
  regNumber: number
  toWhouseId?: null
  fromWhouseId?: null
  contextDoctype?: null
  contextDocId?: string
  contractRegNumber?: number
  docDate: string
  customerId?: string
  amount?: number
  doctype: Doctype
  status: DocStatus
  note?: string
  items: WhouseDocItemFormModel[]
  contextDoc?: ContextDocRefModel | null
}

export interface WhouseDocDetailedModel {
  id: string
  regNumber: number
  branch?: CommonRefModel
  toWhouse?: CommonRefModel
  fromWhouse?: CommonRefModel
  docDate: string
  customer?: CustomerRefModel
  amount: number
  doctype: DoctypeRefModel
  status: StatusRefModel
  note: string
  createdAt: string
  updatedAt: string
  items: WhouseDocDetailedItemGridModel[]
  actions: DocActionButton[]
  relatedDocs?: ContextDocGridModel[]
  contextDoc?: ContextDocRefModel
}

export interface WhouseDocDetailedItemGridModel {
  id: string
  goodsName: string
  quantity: number
  unitPrice: number
  serialNumbers: string[]
}
