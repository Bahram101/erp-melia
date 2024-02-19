import { useQuery } from 'react-query'
import { request } from '../../http'
import { RefOptionsModel } from '../../models/CommonModels'

export const useCollectorsAsOptionsQuery = (enabled: boolean) => {
  return useQuery<RefOptionsModel[]>(
    ['hr-get-collectors-as-options'],
    async () => {
      const { data } = await request.get('/hr/posts/collectors-as-options')
      return data
    },
    { enabled: enabled },
  )
}
