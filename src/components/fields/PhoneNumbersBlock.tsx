import React from 'react'
import PhoneNumberField from './PhoneNumberField'
import { CButton } from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilX } from '@coreui/icons'

interface Props {
  values: string[];
  handleChange: any;
  errors: any;
  fieldName: string;
}
const PhoneNumbersBlock = ({ values, fieldName, handleChange, errors }: Props) => {
  if (!values) {
    return <>{}</>
  }

  const preHandleChange = (e: any, index: any) => {
    handleChange({
      target: {
        name: fieldName,
        value: values.map((value, idx) => {
          if (idx === index) {
            return e.target.value
          }

          return value
        }),
      },
    })
  }

  const addRow = () => {
    handleChange({
      target: {
        name: fieldName,
        value: [...values, ''],
      },
    })
  }

  const removeRow = (index: any) => {
    handleChange({
      target: {
        name: fieldName,
        value: values.filter((value, idx) => index != idx),
      },
    })
  }

  let preparedErrors = new Map<string, string>()
  if (errors && Object.keys(errors).length > 0) {
    for (let key in values) {
      const errorKey = `${fieldName}[${key}]`
      if (errors.hasOwnProperty(errorKey)) {
        preparedErrors.set(values[key], errors[errorKey])
      }
    }
  }

  const invalid = errors && errors[fieldName] && errors[fieldName].length > 0

  return (
    <div>
      <div style={{ marginBottom: '15px' }}>
        Тел. номера
        <CButton onClick={addRow} variant={'outline'} size={'sm'} style={{ float: 'right', marginRight: '5px' }}>
          <CIcon icon={cilPlus} />
        </CButton>
      </div>
      {invalid && <div className="invalid-feedback">{errors[fieldName]}</div>}
      {values.map((value, idx) => <div key={idx} style={{ marginBottom: '10px', clear: 'both', height: '40px' }}>
          <div style={{ width: '90%', float: 'left' }}>
            <PhoneNumberField
              fieldName={fieldName}
              handleChange={(e: any) => preHandleChange(e, idx)}
              value={value}
              error={preparedErrors.get(value)}
            />
          </div>
          <CButton onClick={() => removeRow(idx)} size={'sm'} color={'danger'} variant={'outline'}
                   style={{ float: 'right' }}>
            <CIcon icon={cilX} />
          </CButton>
          <br />
        </div>,
      )}
    </div>
  )
}

export default PhoneNumbersBlock
