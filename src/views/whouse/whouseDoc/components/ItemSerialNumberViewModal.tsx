import React from 'react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react-pro'

interface Props {
  visible: boolean
  serialNumbers: string[]
  onClose: () => void
}

const ItemSerialNumberViewModal = ({
                                     visible,
                                     serialNumbers,
                                     onClose,
                                   }: Props) => {
  return (
    <>
      <CModal
        alignment="center"
        size={'lg'}
        visible={visible}
        onClose={onClose}
        backdrop={'static'}
      >
        <CModalHeader>
          <CModalTitle>Список серииных номеров</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {serialNumbers.map((item, i) => {
            return <p key={item + '-' + i}>{item}</p>
          })}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={onClose}>
            Закрыть
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default ItemSerialNumberViewModal
