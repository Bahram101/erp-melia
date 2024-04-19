import { useMutation, useQuery } from 'react-query'
import { request } from '../../http'
import { GoodsGroupFormModel, GoodsGroupGridModel } from '../../models/reference/RefModels'

export const useGoodsGroupGridQuery = (enabled: boolean) => {
  return useQuery<GoodsGroupGridModel[]>(
    ['ref-get-goods-group-grid'],
    async () => {
      const { data } = await request.get('/reference/goods-groups')
      return data
    },
    { enabled: enabled },
  )
}

export const useGoodsGroupFormQuery = (id: string | undefined, enabled: boolean) => {
  return useQuery<GoodsGroupFormModel>(
    ['ref-get-goods-group-form', id],
    async () => {
      if (id) {
        const { data } = await request.get(`/reference/goods-groups/${id}/form`)
        return data
      }
    },
    { enabled: enabled },
  )
}

export const useGoodsGroupsSaveMutation = (id: string | undefined) => {
  if (id) {
    return useMutation(({ form }: { form: GoodsGroupFormModel }) =>
      request.put(`/reference/goods-groups/${id}`, form),
    )
  }
  return useMutation(({ form }: { form: GoodsGroupFormModel }) => request.post(`/reference/goods-groups`, form))
}