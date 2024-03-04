import React, { useEffect, useState } from 'react'
import { CButton, CFormTextarea, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react-pro'

interface Props {
  visible: boolean
  serialNumbers: string[]
  index: number
  handleItemChange: (e: any, index: number) => void
  onClose: () => void
}

const ItemSerialNumberFormModal = ({
                                     visible,
                                     index,
                                     serialNumbers,
                                     handleItemChange,
                                     onClose,
                                   }: Props) => {
  const [localSerNums, setLocalSerNums] = useState<string>('')

  useEffect(() => {
    if (serialNumbers) {
      setLocalSerNums(serialNumbers.join('\n'))
    }
  }, [serialNumbers])


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
          <CModalTitle>Введите серийные номера (по строку) </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormTextarea
            value={localSerNums}
            onChange={(e) => setLocalSerNums(e.target.value)}
            style={{ height: '200px' }}
          />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={onClose}>
            Отмена
          </CButton>
          <CButton color="primary" onClick={() => {
            handleItemChange({
              target: {
                name: 'serialNumbers',
                value: localSerNums ? localSerNums.trim().split('\n') : [],
              },
            }, index)
            onClose()
          }}>
            Сохранить
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default ItemSerialNumberFormModal
