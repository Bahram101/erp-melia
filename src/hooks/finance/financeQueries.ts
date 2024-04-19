import { useMutation, useQuery } from 'react-query'
import { request } from '../../http'
import {
  CashDocDetailedModel,
  CashDocFormModel,
  CashDocGridModel,
  CustomerDeptFormModel,
  MonthlyPaymentDocFormModel,
  MonthlyPaymentDocGridModel,
  RewardDocDetailedModel,
  RewardDocGridModel,
} from 'models/finance/FinModels'
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

export const useMonthlyPaymentDocGridQuery = (params: {}, enabled: boolean) => {
  return useQuery<MonthlyPaymentDocGridModel[]>(
    ['fin-get-monthly-payment-doc-grid'],
    async () => {
      const { data } = await request.get('/finance/cash-docs/monthly-payments', {
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

export const useCashDocFormQuery = (id: string | undefined, enabled: boolean) => {
  return useQuery<CashDocFormModel>(
    ['fin-get-cash-doc-form', id],
    async () => {
      const { data } = await request.get(`/finance/cash-docs/${id}/form`)
      return data
    },
    { enabled: enabled },
  )
}

export const useCashDocHandleActionQuery = () => {
  return useMutation(({ form }: { form: { docId: string, action: DocAction, addData?: any } }) => {
    return request.put(`/finance/cash-docs/handle-action`, form)
  })
}

export const useCashDocFormSaveMutation = (id: string | undefined) => {
  if (id) {
    return useMutation(({ form }: { form: CashDocFormModel }) =>
      request.put(`/finance/cash-docs/${id}`, form),
    )
  }

  return useMutation(({ form }: { form: CashDocFormModel }) =>
    request.post('/finance/cash-docs', form),
  )
}

export const useMonthlyPaymentDocFormCreateMutation = () => {
  return useMutation(({ form }: { form: MonthlyPaymentDocFormModel }) =>
    request.post('/finance/cash-docs/monthly-payments', form),
  )
}

export const useRewardDocGridQuery = (params: {}, enabled: boolean) => {
  return useQuery<RewardDocGridModel[]>(
    ['fin-get-reward-doc-grid'],
    async () => {
      const { data } = await request.get('/finance/reward-docs', {
        params: params,
      })
      return data
    },
    { enabled: enabled },
  )
}

export const useRewardDocDetailedQuery = (id: string | undefined, enabled: boolean) => {
  return useQuery<RewardDocDetailedModel>(
    ['fin-get-reward-doc-detailed', id],
    async () => {
      const { data } = await request.get(`/finance/reward-docs/${id}/detailed`)
      return data
    },
    { enabled: enabled },
  )
}

export const useRewardDocHandleActionQuery = () => {
  return useMutation(({ form }: { form: { docId: string, action: DocAction, addData?: any } }) => {
    return request.put(`/finance/reward-docs/handle-action`, form)
  })
}