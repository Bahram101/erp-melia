import { useQuery } from 'react-query'
import { request } from '../../http'
import {
  ContractDetailedModel, ContractFormModel,
  ContractGridModel, ContractRewardGridModel,
  PaymentScheduleDetailedGridModel, SaleTypeDetailedModel,
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

export const useSaleTypeOptionsQuery = (params: {forDate?: string}, enabled: boolean) => {
  return useQuery<RefOptionsModel[]>(
    ['mrk-get-sale-type-as-options', params?.forDate],
    async () => {
      if(params.forDate) {
        const { data } = await request.get('/marketing/sale-types/as-options', {
          params: params
        })
        return data
      }

      return [];
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
