import React, { ReactNode } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CLoadingButton,
  CRow,
} from '@coreui/react-pro'

interface Props {
  children: ReactNode
  title?: string
  handleCancel?: () => void
  handleSubmit: () => void
  cancelUrl?: string
  saving: boolean
}

const DocFormPageWrapper = ({
  children,
  title,
  handleCancel,
  handleSubmit,
  saving,
  cancelUrl,
}: Props) => {
  return (
    <CCard>
      {title && (
        <CCardHeader>
          <h5>{title}</h5>
        </CCardHeader>
      )}

      <CCardBody>{children}</CCardBody>
      <CCardFooter>
        <CRow lg={{ gutterY: 50 }}>
          <CCol xs={6}>
            {cancelUrl ? (
              <CButton color="light" href={cancelUrl}>
                Отмена
              </CButton>
            ) : (
              <CButton color="light" onClick={handleCancel}>
                Отмена
              </CButton>
            )}
          </CCol>
          <CCol xs={6}>
            <CLoadingButton className="float-end" loading={saving} onClick={handleSubmit}>
              {saving ? 'Ждите...' : 'Сохранить'}
            </CLoadingButton>
          </CCol>
        </CRow>
      </CCardFooter>
    </CCard>
  )
}

export default DocFormPageWrapper
