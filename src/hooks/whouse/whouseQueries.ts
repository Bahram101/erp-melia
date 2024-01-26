import { useQuery } from 'react-query'
import { request } from '../../http'
import { WhouseDocGridModel } from 'models/whouse/WhouseModels'

export const useWhouseDocsListQuery = (params: {}) => {
  return useQuery<WhouseDocGridModel>(
    ['wh-get-whouse-docs-list'],
    async () => {
      const { data } = await request.get('/whouse/docs', {
        params: params,
      })
      return data
    },
    { enabled: false },
  )
}
