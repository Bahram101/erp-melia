import CurrencyInput from 'react-currency-input-field'
import { CFormLabel } from '@coreui/react-pro'

interface Props {
  fieldName: string
  label?: string
  handleChange: any
  value?: number | undefined
  error?: string
}

const CurrencyField = ({ label, value, fieldName, handleChange, error }: Props) => {
  const preHandleChange = (val: any) => {
    handleChange({
      target: {
        name: fieldName,
        value: +val,
      },
    })
  }
  const hasError = error && error.length > 0

  return (
    <>
      {label && <CFormLabel>{label}</CFormLabel>}
      <CurrencyInput
        placeholder="0"
        className={`mb-1 mt-1 form-control`}
        value={value}
        onValueChange={preHandleChange}
        required
      />
      {hasError && <div className="invalid-feedback">{error}</div>}
    </>
  )
}

export default CurrencyField
