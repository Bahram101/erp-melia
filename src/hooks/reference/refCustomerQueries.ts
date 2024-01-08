import { useQuery } from 'react-query'
import { request } from '../../http'
import { CustomerDetailedModel, CustomerGridModel } from '../../models/reference/RefModels'
import { RefOptionsModel } from '../../models/CommonModels'

export const useCustomerAdressesQuery = (customerId: string | undefined, enabled: boolean) => {
  return useQuery<any>(
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
    ["get-reference-customer-search"],
    async () => {
      const { data } = await request.get("/reference/customers/search", {
        params: params
      });

      return data;
    },
    { enabled: false }
  );
};
