import React from 'react'
import { CFormInput } from '@coreui/react-pro'
import { CustomFieldProps } from '../../models/customField/CustomFieldProps'

interface Props extends CustomFieldProps {
  type?: 'color' | 'file' | 'text' | string
  disabled?: boolean
  value?: string | string[] | number
  placeholder?: string
  readOnly?: boolean
}

const InputField = ({
  label,
  fieldName,
  value,
  handleChange,
  error,
  type,
  disabled,
  placeholder,
  readOnly,
}: Props) => {
  return (
    <CFormInput
      className="mb-1 mt-1"
      disabled={disabled}
      type={type || 'text'}
      name={fieldName}
      onChange={handleChange}
      label={label}
      value={value}
      required={error && error.length > 0 ? true : false}
      feedbackInvalid={error || ''}
      placeholder={placeholder}
      readOnly={readOnly}
    />
  )
}

export default InputField
