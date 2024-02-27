import { CommonRefModel, DoctypeRefModel, StatusRefModel } from '../CommonModels'

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
