import { useMutation, useQuery } from 'react-query'
import { request } from '../../http'
import {
  ContractDetailedModel,
  ContractFormModel,
  ContractGridModel,
  ContractRewardGridModel,
  PaymentScheduleDetailedGridModel,
  PaymentScheduleFormModel,
  SaleTypeDetailedModel,
} from '../../models/marketing/MrkModels'
import { CashDocGridByContextModel } from '../../models/finance/FinModels'
import { RefOptionsModel } from '../../models/CommonModels'

export const useContractsListQuery = (params: {}) => {
  return useQuery<ContractGridModel[]>(
    ['mrk-get-contracts-list'],
    async () => {
      const { data } = await request.get('/marketing/contracts', {
        params: params,
      })
      return data
    },
    { enabled: false },
  )
}

export const useContractDetailedQuery = (id: string | undefined, enabled: boolean) => {
  return useQuery<ContractDetailedModel>(
    ['mrk-get-contract-detailed', id],
    async () => {
      const { data } = await request.get(`/marketing/contracts/${id}/detailed`)
      return data
    },
    { enabled: enabled },
  )
}

export const useContractFormQuery = (id: string | undefined, enabled: boolean) => {
  return useQuery<ContractFormModel>(
    ['mrk-get-contract-form', id],
    async () => {
      const { data } = await request.get(`/marketing/contracts/${id}/form`)
      return data
    },
    { enabled: enabled },
  )
}

export const useContractPaymentSchedulesQuery = (contractId: string, enabled: boolean) => {
  return useQuery<PaymentScheduleDetailedGridModel[]>(
    ['mrk-get-contract-payment-schedules-detailed', contractId],
    async () => {
      const { data } = await request.get(`/marketing/contracts/${contractId}/payment-schedules`)
      return data
    },
    { enabled: enabled },
  )
}

export const useSaleTypeDetailedQuery = (saleTypeId: string, enabled: boolean) => {
  return useQuery<SaleTypeDetailedModel>(
    ['mrk-get-sale-type-detailed', saleTypeId],
    async () => {
      const { data } = await request.get(`/marketing/sale-types/${saleTypeId}/detailed`)
      return data
    },
    { enabled: enabled },
  )
}

export const useSaleTypeOptionsQuery = (params: { forDate?: string }, enabled: boolean) => {
  return useQuery<RefOptionsModel[]>(
    ['mrk-get-sale-type-as-options', params?.forDate],
    async () => {
      if (params.forDate) {
        const { data } = await request.get('/marketing/sale-types/as-options', {
          params: params,
        })
        return data
      }

      return []
    },
    { enabled: enabled },
  )
}

export const useContractRewardsQuery = (contractId: string, enabled: boolean) => {
  return useQuery<ContractRewardGridModel[]>(
    ['mrk-get-contract-rewards', contractId],
    async () => {
      const { data } = await request.get(`/marketing/contracts/${contractId}/rewards`)
      return data
    },
    { enabled: enabled },
  )
}

export const useContractPaymentsQuery = (contractId: string, enabled: boolean) => {
  return useQuery<CashDocGridByContextModel[]>(
    ['mrk-get-contract-payments', contractId],
    async () => {
      const { data } = await request.get(`/marketing/contracts/${contractId}/payments`)
      return data
    },
    { enabled: enabled },
  )
}

export const useContractRefQuery = (branchId: string, regNumber: number, enabled: boolean) => {
  return useQuery<ContractRewardGridModel[]>(
    ['mrk-get-contract-as-ref', `${branchId}-${regNumber}`],
    async () => {
      const { data } = await request.get(`/marketing/contracts/${branchId}/${regNumber}/as-ref`)
      return data
    },
    { enabled: enabled },
  )
}

export const useSaleTypeDistributePaymentsQuery = (saleTypeId: string | undefined | null,
                                                   firstPayment: number,
                                                   discountFromDealer: number,
                                                   docDate: string) => {
  return useQuery<PaymentScheduleFormModel[]>(
    ['get-distribute-payment-schedules', saleTypeId],
    async () => {
      if (!saleTypeId) {
        return []
      }

      const { data } = await request.get('/marketing/sale-types/distribute-payments', {
        params: {
          saleTypeId: saleTypeId,
          firstPayment: firstPayment,
          discountFromDealer: discountFromDealer,
          docDate: docDate,
        },
      })

      return data
    },
    { enabled: false },
  )
}

export const useContractSaveMutation = (id: string | undefined) => {
  if (id) {
    return useMutation(({ form }: { form: ContractFormModel }) =>
      request.put(`/marketing/contracts/${id}`, form),
    )
  }

  return useMutation(({ form }: { form: ContractFormModel }) =>
    request.post('/marketing/contracts', form),
  )
}
