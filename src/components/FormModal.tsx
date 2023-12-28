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
  visible: boolean
  setVisible: (status: boolean) => void
  title: string
  children: React.ReactNode
  handleSubmit: (data: any) => void
}

const FormModal = ({ visible, setVisible, title, children, handleSubmit }: Props) => {
  return (
    <>
      <CModal
        alignment="center"
        scrollable
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="VerticallyCenteredScrollableExample"
      >
        <CModalHeader>
          <CModalTitle id="VerticallyCenteredScrollableExample">{title}</CModalTitle>
        </CModalHeader>
        <CModalBody>{children}</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
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
