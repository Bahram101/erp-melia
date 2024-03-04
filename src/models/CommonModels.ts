import { SweetAlertOptions } from 'sweetalert2'

export enum DocStatus {
  NEW = 'NEW',
  ON_PAYING = 'ON_PAYING',
  CLOSED = 'CLOSED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
  ON_EXECUTION = 'ON_EXECUTION',
  PROBLEM = 'PROBLEM',
  ON_APPROVE = 'ON_APPROVE',
  DELETED = 'DELETED',
  APPROVED = 'APPROVED',
  MOVING = 'MOVING',
}

export enum Doctype {
  CONTRACT = 'CONTRACT',
  SUPPLY = 'SUPPLY',
  SHIPMENT = 'SHIPMENT',
  MOVE_OUT = 'MOVE_OUT',
  MOVE_IN = 'MOVE_IN',
  RETURN = 'RETURN',
  WRITEOFF_LOST = 'WRITEOFF_LOST',
  // CashDocs
  CASH_DOC_SERVICE_PAYMENT = 'CASH_DOC_SERVICE_PAYMENT',
  CASH_DOC_FIRST_PAYMENT = 'CASH_DOC_FIRST_PAYMENT',
  CASH_DOC_MONTHLY_PAYMENT = 'CASH_DOC_MONTHLY_PAYMENT',
  CASH_DOC_OUT = 'CASH_DOC_OUT',
  CASH_DOC_MOVE_OUT = 'CASH_DOC_MOVE_OUT',
  CASH_DOC_MOVE_IN = 'CASH_DOC_MOVE_IN',
  CASH_DOC_CUSTOMER_OUT = 'CASH_DOC_CUSTOMER_OUT',
  CASH_DOC_REWARD_OUT = 'CASH_DOC_REWARD_OUT',
  CASH_DOC_CONTRACT_CANCEL = 'CASH_DOC_CONTRACT_CANCEL',
  CASH_DOC_SALARY_OUT = 'CASH_DOC_SALARY_OUT',
  CASH_DOC_PREPAYMENT_OUT = 'CASH_DOC_PREPAYMENT_OUT',
}

export enum DocAction {
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  CANCEL = 'CANCEL',
  SEND_TO_PROBLEM = 'SEND_TO_PROBLEM',
  RESTORE = 'RESTORE',
  UPDATE_COLLECTOR = 'UPDATE_COLLECTOR',
  CONTRACT_RENEW = 'CONTRACT_RENEW',
  UPDATE_RECOMMENDER = 'UPDATE_RECOMMENDER',
  ADD_GIFT = 'ADD_GIFT',
  APPROVE = 'APPROVE',
  REJECT = 'REJECT',
  REGISTER = 'REGISTER',
}

export interface DocActionButton {
  name: DocAction;
  label: string;
}

export interface CommonRefModel {
  id: string
  displayName: string
}

export interface StatusRefModel {
  status: DocStatus
  displayName: string
}

export interface DoctypeRefModel {
  name: Doctype
  displayName: string
}

export interface PostRefModel {
  id: string
  empId: string
  empName: string
  positionName: string
}

export interface CustomerRefModel {
  id: string
  displayName: string
}

export const DefaultPostRefModel: PostRefModel = {
  empId: '',
  empName: '',
  id: '',
  positionName: '',
}

export interface RefOptionsModel {
  id?: string
  value?: string
  label: string
}

export const DeleteConfirmOptionsModel: SweetAlertOptions = {
  text: 'Действительно хотите удалить элемент?',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Да',
  cancelButtonText: 'Отмена',
}

export interface ContractRefModel {
  id: string
  customerName: string
  regNumber: number
  branchId: string
}

export const DefaultContractRefModel: ContractRefModel = {
  branchId: '',
  customerName: '',
  id: '',
  regNumber: 0,
}

export const DoctypeTitles: { [key in Doctype]?: string } = {
  [Doctype.CONTRACT]: 'Договор',
  [Doctype.SUPPLY]: 'Поступление товаров',
  [Doctype.SHIPMENT]: 'Реализация товаров',
  [Doctype.MOVE_OUT]: 'Отправка товаров на другой склад',
  [Doctype.MOVE_IN]: 'Внутр. поуступления товаров',
  [Doctype.RETURN]: 'Возврат товара от клиента',
  [Doctype.WRITEOFF_LOST]: 'Списание по потере',
  [Doctype.CASH_DOC_SERVICE_PAYMENT]: 'Сервис платежи',
  [Doctype.CASH_DOC_OUT]: 'Расходники',
  [Doctype.CASH_DOC_MOVE_IN]: 'Постпуления в кассу',
  [Doctype.CASH_DOC_MOVE_OUT]: 'Отправки из кассы',
}

export const DocStatusTitles: { [key in DocStatus]?: string } = {
  [DocStatus.NEW]: 'Новый',
  [DocStatus.CLOSED]: 'Закрытый',
  [DocStatus.CANCELLED]: 'Отменен',
}

export interface ContextDocRefModel {
  id: string
  doctype: DoctypeRefModel
  regNumber?: string
}

export interface ContextDocDetailedModel {
  id: string
  doctype: DoctypeRefModel
  regNumber?: string
  docDate?: string
  branch?: CommonRefModel
  customer?: CustomerRefModel
  responsible?: PostRefModel
}

export interface ContextDocGridModel {
  id: string
  doctype: Doctype
  doctypeName: string
  status: DocStatus
  statusName: string
  docDate: string
}