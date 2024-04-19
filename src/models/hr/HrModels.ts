import { DefaultPostRefModel, PostRefModel } from 'models/CommonModels'

export interface EmployeeDetailedModel {
  id: string
  iin: string
  customerId: string
  birthDate: string
  firstname: string
  lastname: string
  middlename: string
  user: EmployeeUserModel
}

export interface EmployeeUserModel {
  username: string
  status: 'ACTIVE' | 'BLOCKED'
}

export interface EmployeeUserFormModel {
  username: string
  status: 'ACTIVE' | 'BLOCKED' | null
  password: string
}

export interface EmployeePostGridModel {
  id: string
  accessAllBranches: boolean
  beginDate: string
  branchName: string
  endDate: string
  hasAccess: boolean
  positionName: string
  salary: number
}

export interface EmployeePostFormModel {
  branchId?: string
  positionId?: string
  beginDate: string | null
  endDate?: string | null
  salary: number
  note: string | null
  hasAccess: boolean | null
  accessAllBranches: boolean | null
}

export const DefaultEmployeePostFormModel: EmployeePostFormModel = {
  accessAllBranches: null,
  beginDate: null,
  hasAccess: null,
  note: null,
  salary: 0,
}

//CompanyStructureForm
export interface CompanyStructureModel {
  children?: CompanyStructureModel[] | []
  expanded: boolean
  id: string
  parentId: string
  path?: string[]
  postId: string
  subTitle: string
  title: string
  postName?: string
}

export interface CompanyStructureFormModel {
  id?: string | null
  post: PostRefModel
  title: string | undefined | null
  parentId: string | null
  year: number | null
  month: number | null
  postName?: string | null
}

export const DefaultCompanyStructureFormModel: CompanyStructureFormModel = {
  id: null,
  post: DefaultPostRefModel,
  title: null,
  parentId: null,
  year: null,
  month: null,
  postName: null,
}

export interface StructureSearchParamModel {
  year: string
  month: string
}

export interface EmployeeMainDataFormModel {
  lastname: string
  firstname: string
  middlename: string
  iin: string
  gender: string | null
  birthDate: string | null
}

//EmployeeFormModel
export interface EmployeeFormModel extends EmployeeMainDataFormModel {
  phoneNumbers: string[]
  addresses: CustomerAddressFormModel[]
}

export interface EmployeePhoneFormModel {
  type: string
  number: string
}

export interface CustomerAddressFormModel {
  id?: string
  name: string
  regionId: string
  districtId: string
  cityId: string
  village: string
  cityDistrict: string
  microDistrict: string
  street: string
  houseNumber: string
  flatNumber: number
}

export const DefaultEmployeePhoneFormModel: EmployeePhoneFormModel = {
  type: 'MOBILE',
  number: '',
}

export const DefaultCustomerAddressFormModel: CustomerAddressFormModel = {
  id: '',
  name: '',
  regionId: '',
  districtId: '',
  cityId: '',
  village: '',
  cityDistrict: '',
  microDistrict: '',
  street: '',
  houseNumber: '',
  flatNumber: 0,
}

export const DefaultEmployeeFormModel: EmployeeFormModel = {
  lastname: '',
  firstname: '',
  middlename: '',
  iin: '',
  gender: null,
  birthDate: null,
  phoneNumbers: [''],
  addresses: [DefaultCustomerAddressFormModel],
}

export interface EmpPostAccessBranch {
  postId: string
  postName: string
  branchIds: string[]
}

export interface EmpPostAccessBranchFormModel {
  postId: string
  branchIds: string[]
}
