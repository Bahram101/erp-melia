import { Doctype } from '../models/CommonModels'

export const getOutWhouseDoctypes = () => {
  return [Doctype.MOVE_OUT, Doctype.SHIPMENT, Doctype.WRITEOFF_LOST]
}

export const getInWhouseDoctypes = () => {
  return [Doctype.SUPPLY, Doctype.MOVE_IN, Doctype.RETURN]
}