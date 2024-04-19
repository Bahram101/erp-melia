import { CommonRefModel, DoctypeRefModel, StatusRefModel } from '../CommonModels'

export interface CustomerAddressGridModel {
  id: string
  name: string
  regionName: string
  districtName: string
  cityName: string
  cityDistrict: string
  microDistrict: string
  street: string
  houseNumber: string
  flatNumber: number
  displayName: string
}

export interface CustomerDetailedModel {
  id: string;
  type: string;
  isSupplier: boolean;
  iin: string;
  name: string;
  lastname: string;
  firstname: string;
  middlename: string;
  birthDate: string;
  addresses: CustomerAddressDetailedModel[];
  phones: CustomerPhoneDetailedModel[];
  docs: CustomerDocModel[];
}

export interface CustomerAddressDetailedModel {
  id: string;
  name: string;
  region?: CommonRefModel;
  district?: CommonRefModel;
  city?: CommonRefModel;
  village: string;
  microDistrict: string;
  cityDistrict: string;
  street: string;
  houseNumber: string;
  flatNumber?: number;
}

export interface CustomerPhoneDetailedModel {
  id: string;
  type: string;
  phoneNumber: string;
}

export interface CustomerDocModel {
  id: string;
  regCode: string;
  regNumber: string;
  docDate: string;
  status: StatusRefModel;
  doctype: DoctypeRefModel;
}

export interface CustomerGridModel {
  id: string;
  name: string;
  lastname: string;
  firstname: string;
  middlename: string;
  iin: string;
}

export interface GiftGridModel {
  id: string
  name: string
  goodsName: string
  price: number
  createdAt: string
  updatedAt: string
}

export interface GiftFormModel {
  name: string
  goodsId: string | null
  price: number
}

export interface CustomerFormModel {
  type: 'LEGAL' | 'INDIVIDUAL'
  iin: string
  lastname: string
  middlename: string
  firstname: string
  birthDate: string
  name: string
  supplier: boolean
}

export const DefaultCustomerFormModel: CustomerFormModel = {
  birthDate: '',
  firstname: '',
  iin: '',
  lastname: '',
  middlename: '',
  name: '',
  supplier: false,
  type: 'LEGAL',
}

export interface ExpInItemGridModel {
  id: string
  name: string
  type: 'OUT' | 'IN'
  typeName: string
  system: boolean
  viewOnlyAdmin: boolean
}

export interface ExpInItemFormModel {
  name: string
  type: 'OUT' | 'IN' | null
  system: boolean
  viewOnlyAdmin: boolean
}

export const DefaultExpInItemFormModel: ExpInItemFormModel = {
  name: '',
  system: false,
  type: null,
  viewOnlyAdmin: false,
}

export interface CashGridModel {
  id: string
  name: string
  typeName: string
  branchesNames: string[]
  system: boolean
  currency: string
  bankName: string
}

export interface CashFormModel {
  name: string
  type: 'CASH' | 'BANK_ACCOUNT' | null
  branchIds: (string | null)[]
  currency: 'KZT' | 'USD' | null
  bankId: string | null
}

export interface GoodsGroupGridModel {
  id: string
  name: string
}

export interface GoodsGroupFormModel {
  name: string
  description?: string
}

export interface GoodsGridModel {
  id: string
  name: string
  code: string
  measure: string
  hasSerialNumber: boolean
  groupName: string
}

export interface GoodsFormModel {
  name: string
  code: string
  hasSerialNumber: boolean
  measure: string
  groupId: string | null
}