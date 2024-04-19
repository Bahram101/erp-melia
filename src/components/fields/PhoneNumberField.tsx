import React from "react";
import InputField from "./InputField";
import { CustomFieldProps } from '../../models/customField/CustomFieldProps'

const PhoneNumberField = (props: CustomFieldProps) => {
    const { value, handleChange } = props;
    const preHandleChange = (e: any) => {
        const {name, value} = e.target;
        let preparedValue = "";
        if(value && value.length > 0) {
            preparedValue = value.replace(/[^\d.-]+/g, "").replaceAll("-", "").substring(0,10)
        }

        handleChange({
            target: {
                name: name,
                value: preparedValue
            }
        });
    }

    const prepareDisplayValue = (value: string | undefined) => {
        if(!value || value.length === 0) {
            return value;
        }

        let out = "(";

        for(let k = 0; k < value.length; k++) {
            if(k === 3 || k === 6 || k === 8) {
                out += "-";
            }

            out += value.charAt(k);
            if(k === 2) {
                out += ")";
            }
        }

        return out;
    }

    return (
        <>
            <InputField
                {...props}
                value={prepareDisplayValue(value)}
                handleChange={preHandleChange}/>
        </>
    )
}

export default PhoneNumberField;
