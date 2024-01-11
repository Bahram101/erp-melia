import { useQuery } from 'react-query'
import { request } from '../../http'
import { CompanyStructuresModel } from 'models/hr/HrModels'

export const useCompanyStructureQuery = (params: any, enabled: boolean) => {
  return useQuery<CompanyStructuresModel>(
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
