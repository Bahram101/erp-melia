import { DocStatus, Doctype } from 'models/CommonModels'

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
}
