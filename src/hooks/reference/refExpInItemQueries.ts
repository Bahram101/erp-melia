import { useMutation, useQuery } from 'react-query'
import { request } from '../../http'
import { ExpInItemFormModel, ExpInItemGridModel } from '../../models/reference/RefModels'

export const useExpInItemGridQuery = (enabled: boolean) => {
  return useQuery<ExpInItemGridModel[]>(
    ['ref-get-exp-in-item-grid'],
    async () => {
      const { data } = await request.get('/reference/exp-in-items')
      return data
    },
    { enabled: enabled },
  )
}

export const useExpInItemFormQuery = (id: string | undefined, enabled: boolean) => {
  return useQuery<ExpInItemFormModel>(
    ['ref-get-exp-in-item-form', id],
    async () => {
      if (id) {
        const { data } = await request.get(`/reference/exp-in-items/${id}/form`)
        return data
      }
    },
    { enabled: enabled },
  )
}

export const useExpInItemSaveMutation = (id: string | undefined) => {
  if (id) {
    return useMutation(({ form }: { form: ExpInItemFormModel }) =>
      request.put(`/reference/exp-in-items/${id}`, form),
    )
  }
  return useMutation(({ form }: { form: ExpInItemFormModel }) => request.post(`/reference/exp-in-items`, form))
}