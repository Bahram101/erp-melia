import React from "react";
import CurrencyInput from "react-currency-input-field";
import {CFormLabel} from "@coreui/react-pro";

interface Props {
    fieldName: string;
    label?: string;
    handleChange: any;
    value?: number;
    error?: string
}

const CurrencyField = ({label, value, fieldName, handleChange, error}: Props) => {

    const preHandleChange = (val: any) => {
        handleChange({
            target: {
                name: fieldName,
                value: val
            }
        })
    }
    const hasError = error && error.length > 0;
    return (
        <>
            {label && <CFormLabel>{label}</CFormLabel>}
            <CurrencyInput
                className={`form-control ${hasError ? "bnc-invalid-field" : ""}`}
                value={value}
                onValueChange={preHandleChange}
            />
            {error && error.length > 0 && <div className="invalid-feedback">{error}</div>}
        </>
    );
}

export default CurrencyField;
