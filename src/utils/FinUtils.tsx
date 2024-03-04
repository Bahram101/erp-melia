import { Doctype } from '../models/CommonModels'

export const getOutCashDoctypes = () => {
  return [Doctype.CASH_DOC_OUT, Doctype.CASH_DOC_MOVE_OUT,
    Doctype.CASH_DOC_CUSTOMER_OUT, Doctype.CASH_DOC_REWARD_OUT,
    Doctype.CASH_DOC_CONTRACT_CANCEL, Doctype.CASH_DOC_SALARY_OUT,
    Doctype.CASH_DOC_PREPAYMENT_OUT]
}