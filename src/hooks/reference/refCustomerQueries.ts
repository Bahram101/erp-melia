import { useMutation, useQuery } from 'react-query'
import { request } from '../../http'
import {
  CustomerAddressGridModel,
  CustomerDetailedModel,
  CustomerFormModel,
  CustomerGridModel,
} from '../../models/reference/RefModels'
import { RefOptionsModel } from '../../models/CommonModels'
import { CustomerAddressFormModel } from '../../models/hr/HrModels'

export const useCustomerAdressesGridQuery = (customerId: string | undefined, enabled: boolean) => {
  return useQuery<CustomerAddressGridModel[]>(
    ['ref-get-customer-addresses', customerId],
    async () => {
      if (customerId) {
        const { data } = await request.get(`/reference/customer-addresses/${customerId}`)
        return data
      }
    },
    { enabled: enabled },
  )
}

export const useCustomerAdressesAsOptionsQuery = (customerId: string | undefined, enabled: boolean) => {
  return useQuery<RefOptionsModel[]>(
    ['ref-get-customer-addresses-as-options', customerId],
    async () => {
      if (customerId) {
        const { data } = await request.get(`/reference/customer-addresses/${customerId}/as-options`)
        return data
      }
    },
    { enabled: enabled },
  )
}

export const useCustomerDetailedQuery = (id: string | undefined, enabled: boolean) => {
  return useQuery<CustomerDetailedModel>(
    ['ref-get-customer-detailed', id],
    async () => {
      if (id) {
        const { data } = await request.get(`/reference/customers/${id}/detailed`)
        return data
      }
    },
    { enabled: enabled },
  )
}

export interface CustomerSearchParams {
  lastname?: string | undefined;
  firstname?: string | undefined;
  iin?: string | undefined;
  name?: string | undefined;
}

export const useCustomerSearchQuery = (params: CustomerSearchParams) => {
  return useQuery<CustomerGridModel[]>(
    ['get-reference-customer-search'],
    async () => {
      const { data } = await request.get('/reference/customers/search', {
        params: params,
      })

      return data
    },
    { enabled: false },
  )
}

export const useCustomerGridQuery = (params: {}) => {
  return useQuery<CustomerGridModel[]>(
    ['get-reference-customer-grid'],
    async () => {
      const { data } = await request.get('/reference/customers', {
        params: params,
      })

      return data
    },
    { enabled: false },
  )
}

export const useCustomerMainDataFormQuery = (id: string, enabled: boolean) => {
  return useQuery<CustomerFormModel>(
    ['get-reference-customer-form'],
    async () => {
      const { data } = await request.get(`/reference/customers/${id}/main-data-form`)

      return data
    },
    { enabled: enabled },
  )
}

export const useCustomerMainDataSaveMutation = (id: string | undefined) => {
  return useMutation(({ form }: { form: CustomerFormModel }) =>
    request.put(`/reference/customers/${id}/main-data`, form),
  )
}

export const useCustomerAddressFormQuery = (id: string, enabled: boolean) => {
  return useQuery<CustomerAddressFormModel>(
    ['get-reference-customer-form'],
    async () => {
      const { data } = await request.get(`/reference/customer-addresses/${id}/form`)

      return data
    },
    { enabled: enabled },
  )
}

export const useCustomerAddressSaveMutation = (customerId: string, id: string | undefined) => {
  return useMutation(({ form }: { form: CustomerAddressFormModel }) =>
    id ? request.put(`/reference/customer-addresses/${customerId}/${id}`, form) : request.post(`/reference/customer-addresses/${customerId}`, form),
  )
}
