import { useMutation, useQuery } from 'react-query'
import { GiftFormModel, GiftGridModel } from '../../models/reference/RefModels'
import { request } from '../../http'

export const useGiftGridQuery = (enabled: boolean) => {
  return useQuery<GiftGridModel[]>(
    ['get-reference-customer-search'],
    async () => {
      const { data } = await request.get('/reference/gifts')

      return data
    },
    { enabled: enabled },
  )
}

export const useGiftFormQuery = (id: string | undefined, enabled: boolean) => {
  return useQuery<GiftFormModel>(
    ['ref-get-gift-form', id],
    async () => {
      if (id) {
        const { data } = await request.get(`/reference/gifts/${id}/form`)
        return data
      }
    },
    { enabled: enabled },
  )
}

export const useGiftSaveMutation = (id: string | undefined) => {
  if (id) {
    return useMutation(({ form }: { form: GiftFormModel }) =>
      request.put(`/reference/gifts/${id}`, form),
    )
  }
  return useMutation(({ form }: { form: GiftFormModel }) => request.post(`/reference/gifts`, form))
}