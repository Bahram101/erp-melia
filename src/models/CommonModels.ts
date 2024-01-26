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
}

export enum Doctype {
  CONTRACT = 'CONTRACT',
  CASH_DOC_FIRST_PAYMENT = 'CASH_DOC_FIRST_PAYMENT',
  CASH_DOC_MONTHLY_PAYMENT = 'CASH_DOC_MONTHLY_PAYMENT',
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
  cancelButtonText: 'Отмена'
}

export interface ContractRefModel {
  id: string;
  customerName: string;
  regNumber: number;
  branchId: string;
}

export const DefaultContractRefModel: ContractRefModel = { branchId: '', customerName: '', id: '', regNumber: 0 }
