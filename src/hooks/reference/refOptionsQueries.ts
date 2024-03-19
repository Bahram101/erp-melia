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

export const useCashOptionsQuery = (
  params: {
    type?: string
  },
  enabled: boolean,
) => {
  return useQuery<RefOptionsModel[]>(
    ['get-reference-chashes-as-options'],
    async () => {
      const { data } = await request.get('/reference/cashes/as-options', {
        params: params,
      })
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

export const useSupplierOptionsQuery = (enabled: boolean) => {
  return useQuery<RefOptionsModel[]>(
    ['get-reference-suppliers-as-options'],
    async () => {
      const { data } = await request.get('/reference/customers/suppliers/as-options')
      return data
    },
    { enabled: enabled },
  )
}

export const useGiftOptionsQuery = (enabled: boolean) => {
  return useQuery<RefOptionsModel[]>(
    ['get-reference-gifts-as-options'],
    async () => {
      const { data } = await request.get('/reference/gifts/as-options')
      return data
    },
    { enabled },
  )
}

export const useBankOptionsQuery = (enabled: boolean) => {
  return useQuery<RefOptionsModel[]>(
    ['get-reference-banks-as-options'],
    async () => {
      const { data } = await request.get('/reference/banks/as-options')
      return data
    },
    { enabled: enabled },
  )
}

export const useExpInItemOptionsQuery = (
  params: {
    isSystem?: boolean
    type?: 'IN' | 'OUT'
  },
  enabled: boolean,
) => {
  return useQuery<RefOptionsModel[]>(
    ['get-reference-exp-in-item-as-options'],
    async () => {
      const { data } = await request.get('/reference/exp-in-items/as-options', {
        params: params,
      })
      return data
    },
    { enabled: enabled },
  )
}

export const useRegionOptionsQuery = (enabled: boolean) => {
  return useQuery<RefOptionsModel[]>(
    ['get-reference-regions-as-options'],
    async () => {
      const { data } = await request.get('/reference/regions/as-options')
      return data
    },
    { enabled: enabled },
  )
}

export const useDistrictOptionsQuery = (regionId: string, enabled: boolean) => {
  return useQuery<RefOptionsModel[]>(
    ['get-reference-districts-as-options'],
    async () => {
      if (regionId) {
        const { data } = await request.get(`/reference/districts/as-options?regionId=${regionId}`) 
        return data
      }
    },
    { enabled:enabled },
  )
}

export const useCityOptionsQuery = (regionId: string, enabled: boolean) => {
  return useQuery<RefOptionsModel[]>(
    ['get-reference-cities-as-options'],
    async () => {
      if (regionId) {
        const { data } = await request.get(`/reference/cities/as-options?regionId=${regionId}`) 
        return data
      }
    },
    { enabled:enabled },
  )
}

export const useVillageOptionsQuery = (str: string, enabled: boolean) => {
  return useQuery<RefOptionsModel[]>(
    ['get-reference-cities-as-options'],
    async () => {
      if (str) {
        const { data } = await request.get(`/reference/villages/as-options?q=${str}`) 
        return data
      }
    },
    { enabled:enabled },
  )
}