import React from 'react'
import { CFormInput } from '@coreui/react-pro'
import { CustomFieldProps } from '../../models/customField/CustomFieldProps'

interface Props extends CustomFieldProps {
  type?: 'color' | 'file' | 'text' | string
  disabled?: boolean
  value?: string | string[] | number
  placeholder?: string
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
}: Props) => {
  return (
    <CFormInput
      disabled={disabled}
      type={type || 'text'}
      name={fieldName}
      onChange={handleChange}
      label={label}
      value={value}
      required={error && error.length > 0 ? true : false}
      feedbackInvalid={error || ''}
      placeholder={placeholder}
    />
  )
}

export default InputField
