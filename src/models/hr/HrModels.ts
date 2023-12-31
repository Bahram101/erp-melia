export interface EmployeeDetailedModel {
  id: string
  iin: string
  customerId: string
  birthDate: string
  firstname: string
  lastname: string
  middlename: string
}

export interface EmployeePostsModel {
  id: string
  accessAllBranches: boolean
  beginDate: string
  branchName: string
  endDate: string
  hasAccess: boolean
  positionName: string
  salary: number
}
