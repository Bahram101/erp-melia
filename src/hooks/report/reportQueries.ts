import { useQuery } from 'react-query'
import { request } from '../../http'
import { CustomerBalance } from 'models/report/reportModels'

export const useCustomerBalanceQuery = (customerId: string | undefined, params: {}) => {
  return useQuery<CustomerBalance[]>(
    ['report-get-customer-balance-list'],
    async () => {
      const { data } = await request.get(`/report/finance/customer-balance/${customerId}`, {
        params,
      })
      return data
    },
    { enabled: false },
  )
}
