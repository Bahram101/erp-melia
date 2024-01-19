import { useQuery } from 'react-query'
import { request } from '../../http'

export const useContractsListQuery = (params: {}) => {
  return useQuery<WhouseGridModel>(
    ['whouse-get-goods-list'],
    async () => {
      const { data } = await request.get('/whouse/docs', {
        params: params,
      })
      return data
    },
    { enabled: false },
  )
}
