import { useMutation, useQuery } from 'react-query'
import { request } from '../../http'
import {
  EmployeeDetailedModel,
  EmployeeFormModel,
  EmployeePostFormModel,
  EmployeePostGridModel,
} from '../../models/hr/HrModels'

export const useCurrentEmployeesQuery = (params: {
  branchId?: string;
  positionId?: string;
}, enabled: boolean) => {
  return useQuery<any[]>(
    ['hr-get-current-employees-list'],
    async () => {
      const { data } = await request.get('/hr/employees/current', {
        params: params,
      })
      return data
    },
    { enabled: enabled },
  )
}

export const useEmployeeDetailedQuery = (id: any, enabled: boolean) => {
  return useQuery<EmployeeDetailedModel>(
    ['hr-get-employee-detailed'],
    async () => {
      const { data } = await request.get(`/hr/employees/${id}/detailed`)
      return data
    },
    { enabled: enabled },
  )
}

export const useEmployeePostsQuery = (employeeId: string | undefined, enabled: boolean) => {
  return useQuery<EmployeePostGridModel[]>(
    ['hr-get-employee-posts', employeeId],
    async () => {
      if (employeeId) {
        const { data } = await request.get(`/hr/employees/${employeeId}/posts`)
        return data
      }
    },
    { enabled: enabled },
  )
}

export const useEmployeePostFormQuery = (id: string, postId: string, enabled: boolean) => {
  return useQuery<EmployeePostFormModel>(
    ['hr-get-employee-post-form', postId],
    async () => {
      if (postId) {
        const { data } = await request.get(`/hr/employees/${id}/posts/${postId}/as-form`)
        return data
      }
    },
    { enabled: enabled },
  )
}

export const useEmployeePostSaveMutation = (id: string, postId: string | undefined) => {
  if (postId) {
    return useMutation(({ form }: { form: EmployeePostFormModel }) =>
      request.put(`/hr/employees/${id}/posts/${postId}`, form),
    )
  }
  return useMutation(({ form }: { form: EmployeePostFormModel }) =>
    request.post(`/hr/employees/${id}/posts`, form),
  )
}

export const useEmployeeInfoSaveMutation = (id: string | undefined) => {
  if (id) {
    return useMutation(({ form }: { form: EmployeeFormModel }) =>
      request.put(`/hr/employees/${id}`, form),
    )
  }
  return useMutation(({ form }: { form: EmployeeFormModel }) =>
    request.post(`/hr/employees`, form),
  )
}