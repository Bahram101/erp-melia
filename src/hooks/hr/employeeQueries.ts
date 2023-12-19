import { request } from '../../http'
import { useQuery } from 'react-query'

export const useCurrentEmployeesQuery = () => {
  return useQuery<any[]>(
    ['hr-get-curren-employees-list'],
    async () => {
      console.log('useQuery')
      const { data } = await request.get('/hr/employees/current')
      return data
    },
    { enabled: true },
  )
}
