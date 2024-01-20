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

export const useCashOptionsQuery = (enabled: boolean) => {
  return useQuery<RefOptionsModel[]>(
    ['get-reference-chashes-as-options'],
    async () => {
      const { data } = await request.get('/reference/cashes/as-options')
      return data
    },
    { enabled: enabled },
  )
}

export const useGoodsOptionsQuery = (params: { hasSerial?: boolean }, enabled: boolean) => {
  return useQuery<RefOptionsModel[]>(
    ['get-reference-goods-as-options', params.hasSerial],
    async () => {
      const { data } = await request.get('/reference/goods/as-options', {
        params: params,
      })
      return data
    },
    { enabled: enabled },
  )
}
export const useWhouseOptionsQuery = (enabled: boolean) => {
  return useQuery<RefOptionsModel[]>(
    ['get-reference-whouses-as-options'],
    async () => {
      const { data } = await request.get('/reference/whouses/as-options')
      return data
    },
    { enabled },
  )
}
