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
  branchId?: string;
  positionId?: string;
  beginDate: string | null;
  endDate?: string | null;
  salary: number;
  note: string | null;
  hasAccess: boolean | null;
  accessAllBranches: boolean | null;
}

export const DefaultEmployeePostFormModel: EmployeePostFormModel = {
  accessAllBranches: null,
  beginDate: null,
  hasAccess: null,
  note: null,
  salary: 0,
}
