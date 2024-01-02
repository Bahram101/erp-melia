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
  beginDate?: string;
  endDate: string | null;
  salary: number;
  note: string | null;
  hasAccess: boolean;
  accessAllBranches: boolean;
}

export const DefaultEmployeePostFormModel: EmployeePostFormModel = {
  accessAllBranches: false,
  endDate: null,
  hasAccess: false,
  note: null,
  salary: 0,
}
