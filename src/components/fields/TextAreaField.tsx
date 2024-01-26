import React from "react";
import { CFormTextarea } from "@coreui/react-pro";
import { CustomFieldProps } from '../../models/customField/CustomFieldProps'

const TextAreaField = ({
  value,
  fieldName,
  handleChange,
  label,
  error,
}: CustomFieldProps) => {
  return (
    <>
      <CFormTextarea
        invalid={(error && error.length > 0) ? true : false}
        value={value}
        onChange={handleChange}
        name={fieldName}
        label={label || ""}
        rows={2}
        feedbackInvalid={error}
        required={(error && error.length > 0) ? true : false}
      />
    </>
  );
};

export default TextAreaField;
