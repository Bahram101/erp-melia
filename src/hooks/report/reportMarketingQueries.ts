import { useQuery } from 'react-query'
import { request } from '../../http'
import { RepSales2GridModel } from '../../models/report/RepMarketingModels'

export const useSales2Query = (params: {}) => {
  return useQuery<RepSales2GridModel[]>(
    ['report-get-sales-2'],
    async () => {
      const { data } = await request.get('/report/marketing/sales-2', {
        params,
      })
      return data
    },
    { enabled: false },
  )
}
