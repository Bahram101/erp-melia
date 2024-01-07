import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react-pro'
import React from 'react'

type Props = {
  visibleFormModal: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  handleSubmit: (data: any) => void
  saving: boolean
}

const FormModal = ({ visibleFormModal, onClose, title, children, handleSubmit, saving }: Props) => {
  return (
    <>
      <CModal alignment="center" size={'lg'} visible={visibleFormModal} onClose={onClose}>
        <CModalHeader>
          <CModalTitle>{title}</CModalTitle>
        </CModalHeader>
        <CModalBody>{children}</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={onClose}>
            Отмена
          </CButton>
          <CButton disabled={saving} color="primary" onClick={handleSubmit}>
            {saving ? 'Ждите...' : 'Сохранить'}
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default FormModal
