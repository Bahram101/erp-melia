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

export interface WhouseDocGoodsFormModel {
  id: string
  goodsId: string
  quantity: number
  unitPrice: number
  serialNumbers: string[]
}

export const DefaultWhouseDocGoodFormModel: WhouseDocGoodsFormModel = {
  id: '',
  goodsId: '',
  quantity: 0,
  unitPrice: 0,
  serialNumbers: [],
}

export const DefaultWhouseDocFormModel: WhouseDocFormModel = {
  branchId: '',
  regNumber: 0,
  toWhouseId: '',
  fromWhouseId: '',
  contextDoctype: '',
  contextDocId: '',
  contractRegNumber: 0,
  docDate: '',
  customerId: '',
  amount: 0,
  doctype: '',
  status: '',
  note: '',
  items: [],
}

export interface WhouseDocFormModel {
  branchId?: string
  regNumber: number
  toWhouseId?: string
  fromWhouseId?: string
  contextDoctype?: string
  contextDocId?: string
  contractRegNumber?: number
  docDate: string
  customerId?: string
  amount?: number
  doctype: string
  status: string
  note?: string
  items?: WhouseDocGoodsFormModel[]
}
