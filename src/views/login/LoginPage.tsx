import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react-pro'
import { useNavigate } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useLogin } from '../../hooks/login/loginQueries'
import toaster from 'toastify-react'

const LoginPage = () => {
  const [error, setError] = useState<string | undefined>(undefined)
  const loginQuery = useLogin()
  const navigate = useNavigate()

  const onSubmit = (event: any) => {
    event.preventDefault()
    let data = {
      username: event.target.username.value,
      password: event.target.password.value,
    }

    const loginPromise = loginQuery.mutateAsync({
      data,
    })
    loginPromise
      .then((response: any) => {
        localStorage.setItem('access_token', response?.data?.accessToken)
        localStorage.setItem('refresh_token', response?.data?.refreshToken)
        localStorage.setItem('display_name', response?.data?.displayName)
        navigate('/')
      })
      .catch((err: any) => {
        if (err.response && err.response.data) {
          if (err.response.data.message && err.response.data.message.length > 0) {
            // toaster.error(err.response.data.message, {
            //   position: 'top-right',
            // })
            setError(err.response.data.message)
          }
        } else {
          toaster.error('Warning Notification !', {
            position: 'top-right',
          })
        }
      })
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCard className="p-4">
              <CCardBody>
                <CForm onSubmit={onSubmit}>
                  <h3>Вход в систему</h3>
                  {error && <div className="text-medium-emphasis">{error}</div>}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput name={'username'} placeholder="Логин" autoComplete="username" />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      name={'password'}
                      type="password"
                      placeholder="Пароль"
                      autoComplete="current-password"
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol xs={6}>
                      <CButton
                        type={'submit'}
                        disabled={loginQuery.isLoading}
                        color="primary"
                        className="px-4"
                      >
                        {loginQuery.isLoading ? 'Ждите...' : 'Войти'}
                      </CButton>
                    </CCol>
                    <CCol xs={6} className="text-right"></CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default LoginPage
