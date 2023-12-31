import { useQuery } from 'react-query'
import { request } from '../../http'
import { PositionModel, BranchModel } from 'models/reference/refModels'

export const useBranchOptionsQuery = (enabled: boolean) => {
  return useQuery<BranchModel[]>(
    ['get-reference-branche-options'],
    async () => {
      let { data } = await request.get('/reference/branches/as-options')
      return (data = data.map((item: any) => ({ value: item.id, label: item.label })))
    },
    { enabled: enabled },
  )
}

export const usePositionOptionsQuery = (enabled: boolean) => {
  return useQuery<PositionModel[]>(
    ['get-reference-positions-options'],
    async () => {
      let { data } = await request.get('/reference/positions')
      return (data = data.map((item: any) => ({ value: item.id, label: item.name })))
    },
    { enabled: enabled },
  )
}
