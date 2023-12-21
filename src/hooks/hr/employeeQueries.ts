import { request } from '../../http'
import { useQuery } from 'react-query'

export const useCurrentEmployeesQuery = () => {
  return useQuery<any[]>(
    ['hr-get-curren-employees-list'],
    async () => {
      const { data } = await request.get('/hr/employees/current')
      console.log('data', data)
      return data
    },
    { enabled: true },
  )
}
