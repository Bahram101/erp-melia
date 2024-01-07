import { useMutation } from 'react-query'
import { request } from '../../http'
import { CustomerDeptFormModel } from 'models/finance/FinModels'

export const useFinCustomerDepsMutation = () => {
  return useMutation(({ form }: { form: CustomerDeptFormModel }) =>
    request.post(`/finance/payments/customer-depts`, form),
  ) as ReturnType<typeof useMutation>
}
