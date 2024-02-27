import { useMutation, useQuery } from 'react-query'
import { request } from '../../http'
import { CashDocDetailedModel, CashDocGridModel, CustomerDeptFormModel } from 'models/finance/FinModels'
import { DocAction } from '../../models/CommonModels'

export const useFinCustomerDepsMutation = () => {
  return useMutation(({ form }: { form: CustomerDeptFormModel }) =>
    request.post(`/finance/payments/customer-depts`, form),
  ) as ReturnType<typeof useMutation>
}

export const useCashDocGridQuery = (params: {}, enabled: boolean) => {
  return useQuery<CashDocGridModel[]>(
    ['fin-get-cash-doc-grid'],
    async () => {
      const { data } = await request.get('/finance/cash-docs', {
        params: params,
      })
      return data
    },
    { enabled: enabled },
  )
}

export const useCashDocDetailedQuery = (id: string | undefined, enabled: boolean) => {
  return useQuery<CashDocDetailedModel>(
    ['fin-get-cash-doc-detailed', id],
    async () => {
      const { data } = await request.get(`/finance/cash-docs/${id}/detailed`)
      return data
    },
    { enabled: enabled },
  )
}

export const useCashDocHandleActionQuery = () => {
  return useMutation(({ form }: { form: { docId: string, action: DocAction } }) => {
    return request.put(`/finance/cash-docs/handle-action`, form)
  })
}
