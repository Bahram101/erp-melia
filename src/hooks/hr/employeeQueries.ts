import { useQuery } from 'react-query'
import { request } from '../../http'

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
