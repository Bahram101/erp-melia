import { ContractDetailedModel, PaymentScheduleDetailedGridModel } from '../marketing/MrkModels'

export interface CallGridModel {
  id: string
  contractRegCode: string
  customerName: string
  typeName: string
  callTime: string
  scheduleTime: string
  resultName: string
  phoneNumber: string
  note: string
  createdAt: string
}

export enum CallType {
  AFTER_SALE = 'AFTER_SALE',
}

export enum CallResult {
  NO_ANSWER = 'NO_ANSWER',
  NOT_AVAILABLE = 'NOT_AVAILABLE',
  RECALL = 'RECALL',
  POSITIVE = 'POSITIVE',
  NEGATIVE = 'NEGATIVE',
  WRONG_NUMBER = 'WRONG_NUMBER',
}

export interface CallFormModel {
  id?: string
  phoneNumber: string
  contractRegCode: string
  type: CallType | null
  direction: 'OUT'
  result: CallResult | null
  callTime: string
  recallTime: string
  note: string
  reasonId: string | null
}

export interface CallContractInfoModel {
  contract: ContractDetailedModel
  paymentSchedules: PaymentScheduleDetailedGridModel[]
  calls: CallGridModel[]
}

export const DefaultCallFormModel: CallFormModel = {
  callTime: '',
  contractRegCode: '',
  direction: 'OUT',
  note: '',
  phoneNumber: '',
  reasonId: null,
  recallTime: '',
  result: null,
  type: null,
}