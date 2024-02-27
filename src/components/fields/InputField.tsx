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
  const preHandleChange = (e: any) => {
    const { value } = e.target
    handleChange({
      target: {
        name: fieldName,
        value: type === 'number' ? +value : value,
      },
    })
  }

  const invalid = error && error.length > 0
  return (
    <CFormInput
      className="mb-1 mt-1"
      disabled={disabled}
      type={type || 'text'}
      name={fieldName}
      onChange={preHandleChange}
      label={label}
      value={value}
      required={invalid ? true : false}
      feedbackInvalid={invalid && error}
      invalid={invalid ? true : false}
      placeholder={placeholder}
    />
  )
}

export default InputField
