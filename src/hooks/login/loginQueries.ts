import { useMutation } from 'react-query'
import { requestWithoutAuth } from '../../http'

type LoginType = {
  username: string
  password: string
}
export const useLogin = () => {
  return useMutation(({ data }: { data: LoginType }) =>
    requestWithoutAuth.post(`/users/auth`, data),
  )
}
