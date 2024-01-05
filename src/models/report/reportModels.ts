export interface CustomerBalance {
  id: string
  docId: string | null
  docDate: string | null
  balance: number
  outAmount: number
  inAmount: number
  doctype: string | null
  doctypeName: string | null
  actionName: string | null
  note: string | null
}
