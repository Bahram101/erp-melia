import { CustomerFormModel } from '../../../../models/reference/RefModels'
import { CCol, CRow } from '@coreui/react-pro'
import InputField from '../../../../components/fields/InputField'
import { DatePickerField } from '../../../../components/fields/DatePickerField'
import { RefOptionsField } from '../../../../components/fields/RefOptionsField'

type Props = {
  model: CustomerFormModel
  handleChange: (e: any) => void
  errors: any
}
const CustomerMainDataForm = ({ model, handleChange, errors }: Props) => {

  return <CRow>
    <CCol>
      <RefOptionsField
        label={'Тип'}
        options={[
          {
            id: 'INDIVIDUAL',
            label: 'Физ. лицо',
          },
          {
            id: 'LEGAL',
            label: 'Юр. лицо',
          },
        ]}
        handleChange={handleChange}
        fieldName={'type'}
        value={model.type}
        error={errors.type}
      />
      {model.type === 'LEGAL' && <InputField
        label={'Название'}
        fieldName={'name'}
        handleChange={handleChange}
        value={model.name}
        error={errors.name}
      />}
      {model.type === 'INDIVIDUAL' && <InputField
        label={'Фамилия'}
        fieldName={'lastname'}
        handleChange={handleChange}
        value={model.lastname}
        error={errors.lastname}
      />}
      {model.type === 'INDIVIDUAL' && <InputField
        label={'Имя'}
        fieldName={'firstname'}
        handleChange={handleChange}
        value={model.firstname}
        error={errors.firstname}
      />}

      {model.type === 'INDIVIDUAL' && <InputField
        label={'Отчество'}
        fieldName={'middlename'}
        handleChange={handleChange}
        value={model.middlename}
        error={errors.middlename}
      />}

      {model.type === 'INDIVIDUAL' && <DatePickerField
        label={'Дата рождения'}
        fieldName={'birthDate'}
        handleChange={handleChange}
        value={model.birthDate}
        error={errors.birthDate}
      />}

      <InputField
        label={'ИИН/БИН'}
        fieldName={'iin'}
        handleChange={handleChange}
        value={model.iin}
        error={errors.iin}
      />
    </CCol>
  </CRow>
}

export default CustomerMainDataForm