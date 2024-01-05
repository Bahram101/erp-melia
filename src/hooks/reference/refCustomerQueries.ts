import { useQuery } from 'react-query'
import { request } from '../../http'

export const useCustomerAdressesQuery = (customerId: string | undefined, enabled: boolean) => {
  return useQuery<any>(
    ['reference-customer-addresses'],
    async () => {
      if (customerId) {
        const { data } = await request.get(`/reference/customer-addresses/${customerId}`)
        return data
      }
    },
    { enabled: enabled },
  )
}
