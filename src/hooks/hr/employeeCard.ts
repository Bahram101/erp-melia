import { useQuery } from 'react-query'
import { request } from '../../http'

export const useEmployeeDetailedQuery = (id: any, enabled: boolean) => {
  return useQuery(
    ['hr-get-employee-detailed'],
    async () => {
      const { data } = await request.get(`/hr/employees/${id}/detailed`)
      return data
    },
    { enabled: enabled },
  )
}
