import { useQuery } from 'react-query'
import { request, requestWithoutAuth } from '../../http'

export const useEmployeeCard = (id: any) => {
  return useQuery(
    ['hr/getEmployeeCard'],
    async () => {
      const { data } = await request.get(`/hr/employees/${id}/detailed`)
      return data
    },
    { enabled: true },
  )
}
