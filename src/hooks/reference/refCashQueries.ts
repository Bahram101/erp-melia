import { useMutation, useQuery } from 'react-query'
import { CashFormModel, CashGridModel } from '../../models/reference/RefModels'
import { request } from '../../http'

export const useCashGridQuery = (enabled: boolean) => {
  return useQuery<CashGridModel[]>(
    ['get-reference-cash-grid'],
    async () => {
      const { data } = await request.get('/reference/cashes')

      return data
    },
    { enabled: enabled },
  )
}

export const useCashFormQuery = (id: string | undefined, enabled: boolean) => {
  return useQuery<CashFormModel>(
    ['ref-get-cash-form', id],
    async () => {
      if (id) {
        const { data } = await request.get(`/reference/cashes/${id}/form`)
        return data
      }
    },
    { enabled: enabled },
  )
}

export const useCashSaveMutation = (id: string | undefined) => {
  if (id) {
    return useMutation(({ form }: { form: CashFormModel }) =>
      request.put(`/reference/cashes/${id}`, form),
    )
  }
  return useMutation(({ form }: { form: CashFormModel }) => request.post(`/reference/cashes`, form))
}