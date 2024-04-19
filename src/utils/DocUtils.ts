import { Doctype } from '../models/CommonModels'

export const doctypeIsCashDoc = (doctype: Doctype) => {
  return [Doctype.CASH_DOC_MOVE_OUT, Doctype.CASH_DOC_MOVE_IN, Doctype.CASH_DOC_SERVICE_PAYMENT, Doctype.CASH_DOC_OUT,
    Doctype.CASH_DOC_CONTRACT_CANCEL, Doctype.CASH_DOC_CUSTOMER_OUT, Doctype.CASH_DOC_FIRST_PAYMENT,
    Doctype.CASH_DOC_MONTHLY_PAYMENT, Doctype.CASH_DOC_REWARD_OUT, Doctype.CASH_DOC_PREPAYMENT_OUT,
    Doctype.CASH_DOC_SALARY_OUT].includes(doctype)
}

export const doctypeIsWhouseDoc = (doctype: Doctype) => {
  return [Doctype.SUPPLY, Doctype.SHIPMENT, Doctype.MOVE_OUT, Doctype.MOVE_IN,
    Doctype.RETURN, Doctype.WRITEOFF_LOST].includes(doctype)
}