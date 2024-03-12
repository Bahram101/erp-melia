import { RefOptionsModel } from 'models/CommonModels'
import { CustomFieldProps } from '../../models/customField/CustomFieldProps'
import { CFormSelect } from '@coreui/react-pro'

interface Props extends CustomFieldProps {
  value?: boolean | null
}

const YesNoOptionsField = ({ value, handleChange, label, fieldName }: Props) => {
  const options: RefOptionsModel[] = [
    { value: '', label: 'Не выбрано' },
    {
      value: 'yes',
      label: 'ДА',
    },
    {
      value: 'no',
      label: 'НЕТ',
    },
  ]

  const preHandleChange = (e: any) => {
    const { name, value } = e.target
    const updatedValue = value === 'yes' ? true : value === 'no' ? false : null
    handleChange({
      target: {
        name: name,
        value: updatedValue,
      },
    })
  }

  return (
    <CFormSelect 
      label={label}
      name={fieldName}
      options={options}
      value={value === true ? 'yes' : value === false ? 'no' : ''}
      onChange={preHandleChange}
      required={false}
    />
  )
}

export default YesNoOptionsField
