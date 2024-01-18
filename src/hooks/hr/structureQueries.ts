import { useMutation, useQuery } from 'react-query'
import { request } from '../../http'
import { CompanyStructureFormModel, CompanyStructureModel } from 'models/hr/HrModels'

export const useCompanyStructureQuery = (params: any, enabled: boolean) => {
  return useQuery<CompanyStructureModel[]>(
    ['hr-get-company-structure'],
    async () => {
      if (params.year && params.month) {
        const { data } = await request.get(`/hr/structures`, { params })
        return data
      }
    },
    { enabled: enabled },
  )
}

export const useStructureFormQuery = (id: string, enabled: boolean) => {
  return useQuery<CompanyStructureFormModel>(
    ['hr-get-structure-form', id],
    async () => {
      if (id) {
        const { data } = await request.get(`/hr/structures/${id}/form`)
        return data
      }
    },
    { enabled: enabled },
  )
}

export const useStructurePostSaveMutation = (id: string | null) => {
  if (id) {
    return useMutation(({ form }: { form: CompanyStructureFormModel }) =>
      request.put(`/hr/structures/${id}`, form),
    )
  }
  return useMutation(({ form }: { form: CompanyStructureFormModel }) =>
    request.post(`/hr/structures`, form),
  )
}

export const useStructureDeleteMutation = (id: string) => {
  return useMutation(() => request.delete(`/hr/structures/${id}`))
}
