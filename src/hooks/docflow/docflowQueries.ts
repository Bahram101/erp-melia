import { useMutation, useQuery } from 'react-query'
import { request } from '../../http'
import { DocAction, DocStatus } from '../../models/CommonModels'
import { ApproveDocDetailedModel, ApproveDocGridModel } from '../../models/docflow/DocflowModels'

export const useDocApproveGridQuery = (params: {
  status: DocStatus
}, enabled: boolean) => {
  return useQuery<ApproveDocGridModel[]>(
    ['docflow-get-doc-approve-grid'],
    async () => {
      const { data } = await request.get('/docflow/approve-docs', {
        params: params,
      })
      return data
    },
    { enabled: enabled },
  )
}

export const useDocApproveDetailedQuery = (id: string, enabled: boolean) => {
  return useQuery<ApproveDocDetailedModel>(
    ['docflow-get-doc-approve-detailed'],
    async () => {
      const { data } = await request.get(`/docflow/approve-docs/${id}/detailed`)
      return data
    },
    { enabled: enabled },
  )
}

export const useDocApproveHandleActionQuery = () => {
  return useMutation(({ form }: { form: { docId: string, action: DocAction } }) => {
    return request.put('/docflow/approve-docs/handle-action', form)
  })
}