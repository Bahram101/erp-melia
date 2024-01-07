import React, { ChangeEventHandler } from 'react'
import { CFormLabel, CFormSelect } from '@coreui/react-pro'
import { CustomFieldProps } from 'models/customField/CustomFieldProps'
import { RefOptionsModel } from '../../models/CommonModels'

interface Props extends CustomFieldProps {
  fieldLabel?: string
  optionLabel?: string
  options: RefOptionsModel[]
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
    value?: string | undefined
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
        label: value.label,
      })
    })
  }

  const invalid = error && error.length > 0;

  return (
    <>
      <CFormSelect 
        label={label}
        name={fieldName}
        options={preparedOptions}
        value={value || ''}
        onChange={handleChange}
        required
        feedbackInvalid={invalid && error}
        invalid={invalid ? true : false}
      />
    </>
  )
}
