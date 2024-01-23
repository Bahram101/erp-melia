import { useQuery } from 'react-query'
import { request } from '../../http'
import { WhouseSupplyGoodsGridModel } from 'models/whouse/WhouseModels'

export const useReceiptOfGoodsQuery = (params: {}) => {
  return useQuery<WhouseSupplyGoodsGridModel>(
    ['whouse-get-receipt-of-goods'],
    async () => {
      const { data } = await request.get('/whouse/docs', {
        params: params,
      })
      return data
    },
    { enabled: false },
  )
}
