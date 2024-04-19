import { useMutation, useQuery } from 'react-query'
import { request } from '../../http'
import { EmployeeUserFormModel, EmployeeUserModel } from '../../models/hr/HrModels'

export const useUserDetailedQuery = (id: string, enabled: boolean) => {
  return useQuery<EmployeeUserModel>(
    ['users-get-user-detailed'],
    async () => {
      if (id) {
        const { data } = await request.get(`/users/${id}/detailed`)
        return data
      }
    },
    { enabled: enabled },
  )
}

export const useUserFormQuery = (id: string, enabled: boolean) => {
  return useQuery<EmployeeUserFormModel>(
    ['users-get-user-form'],
    async () => {
      if (id) {
        const { data } = await request.get(`/users/${id}/form`)
        return data
      }
    },
    { enabled: enabled },
  )
}

export const useUserUpdateMutation = (id: string | undefined) => {
  return useMutation(({ form }: { form: EmployeeUserFormModel }) =>
    request.put(`/users/${id}`, form),
  )
}