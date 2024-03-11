import { Doctype } from '../models/CommonModels'

export const getWhouseDoctypeFromUriPath = (path: string): Doctype | null => {
  switch (path) {
    case 'supplies':
      return Doctype.SUPPLY
    case 'shipments':
      return Doctype.SHIPMENT
    case 'move-outs':
      return Doctype.MOVE_OUT
    case 'move-ins':
      return Doctype.MOVE_IN
    case 'returns':
      return Doctype.RETURN
    case 'writeoff-losts':
      return Doctype.WRITEOFF_LOST
    default:
      return null
  }
}

export const getWhouseDocUriPathFromDoctype = (doctype: Doctype): string => {
  switch (doctype) {
    case Doctype.SUPPLY:
      return 'supplies'
    case Doctype.SHIPMENT:
      return 'shipments'
    case Doctype.MOVE_OUT:
      return 'move-outs'
    case Doctype.MOVE_IN:
      return 'move-ins'
    case Doctype.RETURN:
      return 'returns'
    case Doctype.WRITEOFF_LOST:
      return 'writeoff-losts'
    default:
      return ''
  }
}

export const getCashDoctypeFromUriPath = (path: string): Doctype | null => {
  switch (path) {
    case 'service-payments':
      return Doctype.CASH_DOC_SERVICE_PAYMENT
    case 'expenses':
      return Doctype.CASH_DOC_OUT
    case 'move-ins':
      return Doctype.CASH_DOC_MOVE_IN
    case 'move-outs':
      return Doctype.CASH_DOC_MOVE_OUT
    case 'first-payments':
      return Doctype.CASH_DOC_FIRST_PAYMENT
    default:
      return null
  }
}

export const getCashDocUriPathFromDoctype = (doctype: Doctype): string => {
  switch (doctype) {
    case Doctype.CASH_DOC_SERVICE_PAYMENT:
      return 'service-payments'
    case Doctype.CASH_DOC_OUT:
      return 'expenses'
    case Doctype.CASH_DOC_MOVE_IN:
      return 'move-ins'
    case Doctype.CASH_DOC_MOVE_OUT:
      return 'move-outs'
    case Doctype.CASH_DOC_FIRST_PAYMENT:
      return 'first-payments'
    default:
      return ''
  }
}
