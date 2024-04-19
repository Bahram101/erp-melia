import { useQuery } from 'react-query'
import { request } from '../../http'
import {
  RepGoodsBySerialNumberGridModel,
  RepGoodsInWhouseGridModel,
  RepGoodsWithSerialNumberGridModel,
} from '../../models/report/RepWhouseModels'

export const useGoodsInWhouseQuery = (params: {}) => {
  return useQuery<RepGoodsInWhouseGridModel[]>(
    ['report-get-goods-in-whouse'],
    async () => {
      const { data } = await request.get('/report/whouses/goods-in-whouses', {
        params,
      })
      return data
    },
    { enabled: false },
  )
}

export const useGoodsInWhouseWithSerialNumberQuery = (params: {}) => {
  return useQuery<RepGoodsWithSerialNumberGridModel[]>(
    ['report-get-goods-in-whouse-with-serial-number'],
    async () => {
      const { data } = await request.get('/report/whouses/goods-in-whouses-with-sn', {
        params,
      })
      return data
    },
    { enabled: false },
  )
}

export const useGoodsBySerialNumberQuery = (serialNumber: string | undefined) => {
  return useQuery<RepGoodsBySerialNumberGridModel[]>(
    ['report-get-goods-by-serial-number'],
    async () => {
      const { data } = await request.get(`/report/whouses/find-goods-by-sernum/${serialNumber}`)
      return data
    },
    { enabled: false },
  )
}

export const useGoodsFlowQuery = (params: {}) => {
  return useQuery<Map<string, RepGoodsBySerialNumberGridModel[]>>(
    ['report-get-goods-flow'],
    async () => {
      const { data } = await request.get('/report/whouses/goods-flow', {
        params: params
      })
      return data
    },
    { enabled: false },
  )
}
