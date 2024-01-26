import React, { useState } from 'react'
import { CButton, CFormInput, CFormLabel, CInputGroup } from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilSearch, cilX } from '@coreui/icons'
import CustomerFieldSearchModal from './CustomerFieldSearchModal'
import { CustomerRefModel } from '../../models/CommonModels'

interface Props {
  fieldName: string
  label?: string
  handleChange: any
  value?: CustomerRefModel | null
  error?: string
}

const CustomerField = ({ fieldName, label, value, handleChange, error }: Props) => {
  const [visibleModal, setVisibleModal] = useState<boolean>(false)
  const removeValue = () => {
    handleChange({
      target: {
        name: fieldName,
        value: {},
      },
    })
  }

  const onSelectVal = (selected: CustomerRefModel | null) => {
    handleChange({
      target: {
        name: fieldName,
        value: selected,
      },
    })
    setVisibleModal(false)
  }
  const onCancel = () => {
    setVisibleModal(false)
  }
  console.log('visibleModal', visibleModal)
  return (
    <>
      {label && <CFormLabel>{label}</CFormLabel>}
      <CInputGroup>
        <CButton onClick={removeValue} color="danger" size="sm">
          <CIcon style={{ color: 'white' }} icon={cilX} />
        </CButton>
        <CFormInput
          className={error ? 'bnc-invalid-field' : ''}
          disabled
          value={value?.displayName || ''}
        />
        <CButton onClick={() => setVisibleModal(true)} color="success" size="sm">
          <CIcon style={{ color: '#ffffff' }} icon={cilSearch} />
        </CButton>
      </CInputGroup>
      {error && error.length > 0 && <div className="invalid-feedback">{error}</div>}

      <CustomerFieldSearchModal
        visible={visibleModal}
        setVisibleModal={setVisibleModal}
        onOk={onSelectVal}
        onCancel={onCancel}
        onAdd={() => {}}
      />
    </>
  )
}

export default CustomerField
