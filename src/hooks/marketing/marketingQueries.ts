import { useMutation, useQuery } from 'react-query'
import { request } from '../../http'
import {
  ContractDetailedModel,
  ContractFormModel,
  ContractGridModel,
  ContractRenewFormModel,
  ContractRewardGridModel, ContractSearchResultGridModel,
  DefaultSaleTypeFormModel,
  DistributeRenewFormModel,
  PaymentScheduleDetailedGridModel,
  PaymentScheduleFormModel,
  SaleBonusFormModel,
  SaleBonusGridModel,
  SaleTypeDetailedModel,
  SaleTypeFormModel,
  SaleTypeGridModel,
} from '../../models/marketing/MrkModels'
import { CashDocGridByContextModel } from '../../models/finance/FinModels'
import { ContractRefModel, RefOptionsModel } from '../../models/CommonModels'

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
  return useQuery<ContractRefModel>(
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

export const useContractHandleActionQuery = () => {
  return useMutation(({ form }: { form: any }) => {
    return request.put(`/marketing/contracts/handle-action`, form)
  })
}

export const useContractRenewFormQuery = (id: string | undefined, enabled: boolean) => {
  return useQuery<ContractRenewFormModel>(
    ['mrk-get-contract-renew-form', id],
    async () => {
      const { data } = await request.get(`/marketing/contracts/${id}/renew-form`)
      return data
    },
    { enabled: enabled },
  )
}

export const useContractRenewSaveMutation = (id: string | undefined) => {
  return useMutation(({ form }: { form: ContractRenewFormModel }) =>
    request.patch(`/marketing/contracts/${id}/renew`, form),
  )
}

export const useDistributeContractRenewPaymentsMutation = () => {
  return useMutation(({ form }: { form: DistributeRenewFormModel }) =>
    request.put('/marketing/contracts/distribute-renew-payments', form),
  )
}

export const useSaleTypeGridQuery = (params: { isActive: boolean }, enabled: boolean) => {
  return useQuery<SaleTypeGridModel[]>(
    ['mrk-get-sale-type-grid'],
    async () => {
      const { data } = await request.get('/marketing/sale-types', {
        params: params,
      })
      return data
    },
    { enabled: enabled },
  )
}

export const useSaleTypeFormQuery = (id: string | undefined, enabled: boolean) => {
  return useQuery<SaleTypeFormModel>(
    ['mrk-get-sale-type-form'],
    async () => {
      if (id) {
        const { data } = await request.get(`/marketing/sale-types/${id}/form`)
        return data
      }

      return DefaultSaleTypeFormModel
    },
    { enabled: enabled },
  )
}

export const useSaleTypeSaveMutation = (id: string | undefined) => {
  if (id) {
    return useMutation(({ form }: { form: SaleTypeFormModel }) =>
      request.put(`/marketing/sale-types/${id}`, form),
    )
  }

  return useMutation(({ form }: { form: SaleTypeFormModel }) =>
    request.post('/marketing/sale-types', form),
  )
}

export const useSaleBonusGridQuery = (params: { isActive: boolean }, enabled: boolean) => {
  return useQuery<SaleBonusGridModel[]>(
    ['mrk-get-sale-bonus-grid'],
    async () => {
      const { data } = await request.get('/marketing/sale-bonuses', {
        params: params,
      })
      return data
    },
    { enabled: enabled },
  )
}

export const useSaleBonusFormQuery = (id: string | undefined, enabled: boolean) => {
  return useQuery<SaleBonusFormModel>(
    ['mrk-get-sale-bonus-form'],
    async () => {
      if (id) {
        const { data } = await request.get(`/marketing/sale-bonuses/${id}/form`)
        return data
      }
    },
    { enabled: enabled },
  )
}

export const useSaleBonusSaveMutation = (id: string | undefined) => {
  if (id) {
    return useMutation(({ form }: { form: SaleBonusFormModel }) =>
      request.put(`/marketing/sale-bonuses/${id}`, form),
    )
  }

  return useMutation(({ form }: { form: SaleBonusFormModel }) =>
    request.post('/marketing/sale-bonuses', form),
  )
}

export const useContractSearchQuery = (params: any, enabled: boolean) => {
  return useQuery<ContractSearchResultGridModel[]>(
    ["mrk-get-contract-by-branch-id-and-reg-number"],
    async () => {
      const { data } = await request.get("/marketing/contracts/find-by-branchid-and-regnumber", {
        params: params,
      });

      return data;
    },
    { enabled: enabled }
  );
}