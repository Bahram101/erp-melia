import React from "react";
import { CFormInput } from "@coreui/react-pro";
import { CustomFieldProps } from '../../models/customField/CustomFieldProps'

interface Props extends CustomFieldProps {
  type?: 'color' | 'file' | 'text' | string;
  disabled?: boolean;
  value?: string | string[] | number;
}
const InputField = ({
  label,
  fieldName,
  value,
  handleChange,
  error,
  type,
  disabled,
}: Props) => {
  return (
    <>
      <CFormInput
        disabled={disabled}
        type={type ? type : 'text'}
        name={fieldName}
        onChange={handleChange}
        label={label}
        value={value}
        feedbackInvalid={error || ''}
      />
    </>
  );
};

export default InputField;
