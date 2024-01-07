import React from 'react'
import { CDatePicker } from '@coreui/react-pro'
import { stringDDMMYYYYHHToMoment, stringDDMMYYYYToMoment } from 'utils/DateHelper'
import '@coreui/coreui-pro/dist/css/coreui.min.css'

interface Props {
  label?: string
  fieldName: string
  handleChange: any
  value?: string
  timepicker?: boolean
  placeholder?: string
  error?: string
}

export const DatePickerField = ({
  fieldName,
  handleChange,
  value,
  timepicker,
  label,
  placeholder,
  error,
}: Props) => {
  const preHandle = (selectedVal: any) => {
    handleChange({
      target: {
        name: fieldName,
        value: selectedVal,
      },
    })
  }

  let format = 'dd.MM.yyyy'
  if (timepicker) {
    format += ' HH:mm'
  }

  const invalid: boolean = error && error.length > 0 ? true : false

  return (
    <>
      <CDatePicker
        label={label}
        feedbackInvalid={invalid && error}
        invalid={invalid}
        todayButton="Сегодня"
        cancelButton="Сброс"
        confirmButton="Выбрать"
        timepicker={timepicker}
        placeholder={placeholder || ''}
        locale="ru-RU"
        format={format}
        onDateChange={(_date, formattedDate) => preHandle(formattedDate)}
        date={
          value
            ? timepicker
              ? stringDDMMYYYYHHToMoment(value)
              : stringDDMMYYYYToMoment(value)
            : null
        }
      />
    </>
  )
}
