import { useQuery } from 'react-query'
import { request } from '../../http'
import { EmployeeDetailedModel } from '../../models/hr/HrModels'
import { PositionModel } from 'models/reference/positionModels'

export const useCurrentEmployeesQuery = () => {
  return useQuery<any[]>(
    ['hr-get-current-employees-list'],
    async () => {
      const { data } = await request.get('/hr/employees/current')
      return data
    },
    { enabled: true },
  )
}

export const useEmployeeDetailedQuery = (id: any, enabled: boolean) => {
  return useQuery<EmployeeDetailedModel>(
    ['hr-get-employee-detailed'],
    async () => {
      const { data } = await request.get(`/hr/employees/${id}/detailed`)
      return data
    },
    { enabled: enabled },
  )
}

export const useEmployeePostsQuery = (employeeId: string | undefined, enabled: boolean) => {
  return useQuery<PositionModel>(
    ['hr-get-employee-posts'],
    async () => {
      if (employeeId) {
        const { data } = await request.get(`/hr/employees/${employeeId}/posts`)
        return data
      }
    },
    { enabled: enabled },
  )
}
