import { useQuery } from 'react-query'
import { request } from '../../http'
import { ContractGridModel } from '../../models/marketing/MrkModels'

export const useContractsListQuery = (params: {}) => {
  return useQuery<ContractGridModel[]>(
    ['mrk-get-contracts-list'],
    async () => {
      const { data } = await request.get('/marketing/contracts', {
        params: params,
      })
      return data
    },
    { enabled: false },
  )
}
