import { useMutation, useQuery } from 'react-query'
import { request } from '../../http'
import {
  WhouseDocDetailedModel,
  WhouseDocFormModel,
  WhouseDocGridModel,
  WhouseDocItemFormModel,
} from '../../models/whouse/whouseModels'
import { DocAction, Doctype } from '../../models/CommonModels'

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

export const useWhouseDocSaveMutation = (id: string | undefined) => {
  if (id) {
    return useMutation(({ form }: { form: WhouseDocFormModel }) =>
      request.put(`/whouse/docs/${id}`, form),
    )
  }
  return useMutation(({ form }: { form: WhouseDocFormModel }) => request.post(`/whouse/docs`, form))
}

export const useWhouseDocFormQuery = (id: string | undefined, enabled: boolean) => {
  return useQuery<WhouseDocFormModel>(
    ['wh-get-whouse-doc-form', id],
    async () => {
      if (id) {
        const { data } = await request.get(`/whouse/docs/${id}/form`)
        return data
      }
    },
    { enabled: enabled },
  )
}

export const useWhouseDocDetailedQuery = (id: string | undefined, enabled: boolean) => {
  return useQuery<WhouseDocDetailedModel>(
    ['wh-get-whouse-doc-detailed', id],
    async () => {
      const { data } = await request.get(`/whouse/docs/${id}/detailed`)
      return data
    },
    { enabled: enabled },
  )
}

export const useWhouseDocHandleActionQuery = () => {
  return useMutation(({ form }: { form: { docId: string, action: DocAction } }) => {
    return request.put(`/whouse/docs/handle-action`, form)
  })
}

type Params = {
  contextDocId: string | null
  contextDoctype: Doctype | null
}
export const useContractOutGoodsQuery = (params: Params, enabled: boolean) => {
  return useQuery<WhouseDocItemFormModel[]>(
    ["get-whouse-goods-contract-out-goods"],
    async () => {
      if(!params.contextDocId || !params.contextDoctype) {
        return []
      }

      const {data} = await request.get(`/whouse-goods/contract-out-goods/${params.contextDocId}/${params.contextDoctype}`);
      return data;
    },
    {enabled: enabled}
  );
}