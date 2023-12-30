import React, { ChangeEventHandler } from 'react'
import { CFormLabel, CFormSelect } from '@coreui/react-pro'
import { CustomFieldProps } from 'models/customField/CustomFieldProps'

interface Props extends CustomFieldProps {
  fieldLabel?: string
  optionLabel?: string
  options: { id: string | boolean; label?: string; name?: string }[]
  handleChange: ChangeEventHandler<HTMLSelectElement>
}

export const RefOptionsField = ({
  fieldName,
  optionLabel,
  options,
  handleChange,
  label,
  error,
  value,
}: Props) => {
  const preparedOptions: {
    label?: string
    value?: string | number | undefined
    name?: string
  }[] = [
    {
      value: '',
      label: optionLabel || 'Не выбрано',
    },
  ] 

  if (options) {
    options.forEach((value: any) => {
      preparedOptions.push({
        value: value.id,
        label: value.label || value.name,
      })
    })
  }
  const invalid = error && error.length > 0 ? true : false

  return (
    <>
      {label && <CFormLabel>{label}</CFormLabel>}
      <select
        name={fieldName}
        className={`form-select ${invalid ? 'invalid-field' : ''}`}
        value={value}
        onChange={handleChange}
      >
        {preparedOptions?.map((option, index) => {
          return (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          )
        })}
      </select>
      {invalid && <div className="invalid-feedback">{error}</div>}
    </>
  )
}
