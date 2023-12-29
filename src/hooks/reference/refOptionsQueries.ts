import { useQuery } from 'react-query'
import { request } from '../../http'
import { PositionModel } from 'models/reference/positionModels'

export const useBranchOptionsQuery = (enabled: boolean) => {
  return useQuery(
    ['get-reference-branche-options'],
    async () => {
      const { data } = await request.get('/reference/branches/as-options')
      return data
    },
    { enabled: enabled },
  )
}

export const usePositionOptionsQuery = (enabled: boolean) => {
  return useQuery(
    ['get-reference-positions-options'],
    async () => {
      const { data } = await request.get('/reference/positions')
      return data
    },
    { enabled: enabled },
  )
}
