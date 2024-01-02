import { CustomFieldProps } from '../../models/customField/CustomFieldProps'
import { RefOptionsModel } from '../../models/CommonModels'
import { RefOptionsField } from './RefOptionsField'

interface Props extends CustomFieldProps {
  value?: boolean
}

const YesNoOptionsField = ({value, handleChange, label, fieldName}: Props) => {
  const options: RefOptionsModel[] = [
    {
      id: 'yes',
      label: 'ДА',
    },
    {
      id: 'no',
      label: 'НЕТ',
    }]

  const preHandleChange = (e: any) => {
    const {name, value} = e.target;
    handleChange({
      target: {
        name: name,
        value: value === 'yes' ? true : false,
      }
    })
  }

  return <RefOptionsField
    options={options}
    handleChange={preHandleChange}
    value={value === null ? null : (value === true ? 'yes' : 'no')}
    fieldName={fieldName}
    label={label}
  />
}

export default YesNoOptionsField
