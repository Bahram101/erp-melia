export interface EmployeeDetailedModel {
  id: string
  iin: string
  customerId: string
  birthDate: string
  firstname: string
  lastname: string
  middlename: string
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
  id: string | null
  postId: string | null
  title: string | undefined | null
  parentId: string | null
  year: number | null
  month: number | null
  postName: string | null
}

export const DefaultCompanyStructureFormModel: CompanyStructureFormModel = {
  id: null,
  postId: null,
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

export const DefaultStructureSearchModel: StructureSearchParamModel = {
  year: '',
  month: '',
}
