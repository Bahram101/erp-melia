import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react-pro'
import React, { useState } from 'react'

type Props = {
  visibleFormModal: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  handleSubmit: (data: any) => void
}

const FormModal = ({ visibleFormModal, onClose, title, children, handleSubmit }: Props) => {
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
          <CButton color="primary" onClick={handleSubmit}>
            Сохранить
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default FormModal
