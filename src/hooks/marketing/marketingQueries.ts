import { useQuery } from 'react-query'
import { request } from '../../http'
import { ContractGridModel } from '../../models/marketing/MrkModels'

export const useContractsListQuery = (params: {}) => {
  return useQuery<ContractGridModel[]>(
    ['hr-get-contracts-list'],
    async () => {
      const { data } = await request.get('/marketing/contracts', {
        params: params,
      })
      return data
    },
    { enabled: false },
  )
}
