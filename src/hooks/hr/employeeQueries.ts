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

export const useEmployeeDetailedQuery = (id: any, enabled: boolean) => {
  return useQuery<any>(
    ['hr-get-employee-detailed'],
    async () => {
      const { data } = await request.get(`/hr/employees/${id}/detailed`)
      return data
    },
    { enabled: enabled },
  )
}

export const useCustomerAdressesQuery = (customerId: string, enabled: boolean) => {
  console.log('aaaaaaaaaa')
  return useQuery<any>(
    ['reference-customer-addresses'],
    async () => {
      const { data } = await request.get(`/reference/customer-addresses/${customerId}`)
      return data
    },
    { enabled: enabled },
  )
}
