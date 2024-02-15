import { useMutation, useQuery } from 'react-query'
import { request } from '../../http'
import { WhouseDocFormModel, WhouseDocGridModel } from '../../models/whouse/whouseModels'

export const useWhouseDocsListQuery = (params: {}) => {
  return useQuery<WhouseDocGridModel[]>(
    ['wh-get-whouse-docs-list'],
    async () => {
      const { data } = await request.get('/whouse/docs', {
        params: params,
      })
      return data
    },
    { enabled: false },
  )
}

export const useWhouseDocsSaveMutation = (id: string | undefined) => {
  if (id) {
    return useMutation(({ form }: { form: WhouseDocFormModel }) =>
      request.put(`/whouse/docs/${id}`, form),
    )
  }
  return useMutation(({ form }: { form: WhouseDocFormModel }) => request.post(`/whouse/docs`, form))
}

export const useWhouseDocsFormQuery = (id: string | undefined, enabled: boolean) => {
  return useQuery<WhouseDocFormModel>(
    ['wh-get-whouse-docs-form', id],
    async () => {
      if (id) {
        const { data } = await request.get(`/whouse/docs/${id}/form`)
        return data
      }
    },
    { enabled: enabled },
  )
}
