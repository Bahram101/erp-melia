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