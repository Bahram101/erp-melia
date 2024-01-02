import React from "react";
import { CFormLabel, CDatePicker } from "@coreui/react-pro";
import {
  stringDDMMYYYYToMoment,
  stringDDMMYYYYHHToMoment,
} from "utils/DateHelper";

interface Props {
  label?: string;
  fieldName: string;
  handleChange: any;
  value?: string;
  timepicker?: boolean;
  placeholder?: string;
  error?: string;
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
    });
  };

  let format = "dd.MM.yyyy";
  if (timepicker) {
    format += " HH:mm";
  }

  return (
    <>
      {label && <CFormLabel>{label}</CFormLabel>}
      <CDatePicker
        invalid={error ? true : false}
        todayButton="Сегодня"
        cancelButton="Сброс"
        confirmButton="Выбрать"
        timepicker={timepicker}
        placeholder={placeholder || ""}
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
      {error && error.length > 0 && <div className="invalid-feedback">{error}</div>}
    </>
  );
};
