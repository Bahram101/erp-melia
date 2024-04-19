import React from "react";
import { CFormCheck } from "@coreui/react-pro";

interface Props {
  fieldName: string;
  label?: string;
  handleChange: (e: any) => void;
  value?: boolean;
  error?: string;
}

const CheckboxField = ({ label, value, fieldName, handleChange }: Props) => {

  const preHandleChange = (val: boolean) => {
    handleChange({
      target: {
        name: fieldName,
        value: val,
      }
    });
  };

  return (
    <>
      <CFormCheck
        id={fieldName}
        label={label}
        checked={value}
        onChange={(event) => preHandleChange(event.target.checked)}
      />
    </>
  );
};

export default CheckboxField;
