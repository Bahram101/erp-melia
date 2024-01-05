import { useQuery } from 'react-query'
import { request } from '../../http'
import { RefOptionsModel } from '../../models/CommonModels'

export const useBranchOptionsQuery = (enabled: boolean) => {
  return useQuery<RefOptionsModel[]>(
    ['get-reference-branches-as-options'],
    async () => {
      const { data } = await request.get('/reference/branches/as-options')
      return data
    },
    { enabled: enabled },
  )
}

export const usePositionOptionsQuery = (enabled: boolean) => {
  return useQuery<RefOptionsModel[]>(
    ['get-reference-positions-as-options'],
    async () => {
      const { data } = await request.get('/reference/positions/as-options')
      return data
    },
    { enabled: enabled },
  )
}
