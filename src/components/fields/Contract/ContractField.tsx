import { ContextDocRefModel } from '../../../models/CommonModels'
import { useState } from 'react'
import { cilSearch, cilX } from '@coreui/icons'
import { CButton, CFormInput, CFormLabel, CInputGroup } from '@coreui/react-pro'
import ContractFieldSearchModal from './ContractFieldSearchModal'
import CIcon from '@coreui/icons-react'

type Props = {
  fieldName: string
  label?: string
  handleChange: (e: any) => void
  value?: ContextDocRefModel | null
  error?: string
}
const ContractField = ({ fieldName, label, handleChange, value, error }: Props) => {
  const [visibleModal, setVisibleModal] = useState<boolean>(false)
  const removeValue = () => {
    handleChange({
      target: {
        name: fieldName,
        value: null,
      },
    })
  }

  const onSelectVal = (selected: ContextDocRefModel | null) => {
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

  const displayValue = value ? value.displayName : ''

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
          value={displayValue}
        />
        <CButton
          onClick={() => setVisibleModal(true)}
          color="success"
          size="sm"
        >
          <CIcon style={{ color: '#ffffff' }} icon={cilSearch} />
        </CButton>
      </CInputGroup>
      {error && error.length > 0 && <div className="invalid-feedback">{error}</div>}

      <ContractFieldSearchModal
        visible={visibleModal}
        onOk={onSelectVal}
        onCancel={onCancel}
        onAdd={() => {
        }}
      />
    </>
  )
}

export default ContractField