import { useMutation, useQuery } from 'react-query'
import { request } from '../../http'
import { GoodsFormModel, GoodsGridModel } from '../../models/reference/RefModels'

export const useGoodsGridQuery = (enabled: boolean) => {
  return useQuery<GoodsGridModel[]>(
    ['ref-get-goods-grid'],
    async () => {
      const { data } = await request.get('/reference/goods')
      return data
    },
    { enabled: enabled },
  )
}

export const useGoodsFormQuery = (id: string | undefined, enabled: boolean) => {
  return useQuery<GoodsFormModel>(
    ['ref-get-goods-form', id],
    async () => {
      if (id) {
        const { data } = await request.get(`/reference/goods/${id}/form`)
        return data
      }
    },
    { enabled: enabled },
  )
}

export const useGoodsSaveMutation = (id: string | undefined) => {
  if (id) {
    return useMutation(({ form }: { form: GoodsFormModel }) =>
      request.put(`/reference/goods/${id}`, form),
    )
  }
  return useMutation(({ form }: { form: GoodsFormModel }) => request.post('/reference/goods', form))
}