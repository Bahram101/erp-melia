export interface RepGoodsInWhouseGridModel {
  goodsId: string
  goodsName: string
  qty: number
}

export interface RepGoodsWithSerialNumberGridModel {
  goodsName: string
  serialNumber: string
}

export interface RepGoodsBySerialNumberGridModel {
  id: string
  goodsName: string
  serialNumber: string
  date: string
  sender: string
  receiver: string
  doctypeName: string
}

export interface RepGoodsFlowGridModel {
  id: string
  goodsName: string
  doctypeName: string
  qty: number
  inQty: number
  outQty: number
  remainQty: number
  docDate: string
  notes: string[]
}