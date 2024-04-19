import { useMutation, useQuery } from 'react-query'
import { request } from '../../http'
import { CallContractInfoModel, CallFormModel, CallGridModel } from '../../models/crm/CallModels'

export const useCallGridQuery = (params: {}, enabled: boolean) => {
  return useQuery<CallGridModel[]>(
    ['crm-get-call-grid'],
    async () => {
      const { data } = await request.get('/crm/calls', {
        params: params,
      })
      return data
    },
    { enabled: enabled },
  )
}

export const useCallContractInfoQuery = (id: string | undefined, enabled: boolean) => {
  return useQuery<CallContractInfoModel>(
    ['crm-get-call-contract-info'],
    async () => {
      const { data } = await request.get(`/crm/calls/${id}/contract-info`)
      return data
    },
    { enabled: enabled },
  )
}

export const useCallFormQuery = (id: string | undefined, enabled: boolean) => {
  return useQuery<CallFormModel>(
    ['crm-get-call-form', id],
    async () => {
      const { data } = await request.get(`/crm/calls/${id}/form`)
      return data
    },
    { enabled: enabled },
  )
}

export const useCallFormPatchMutation = (id: string | undefined) => {
  return useMutation(({ form }: { form: CallFormModel }) =>
    request.patch(`/crm/calls/${id}`, form),
  )
}