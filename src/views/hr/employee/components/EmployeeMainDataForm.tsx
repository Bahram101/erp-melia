import FormWrapper from 'components/FormWrapper'
import { DatePickerField } from 'components/fields/DatePickerField'
import InputField from 'components/fields/InputField'
import { EmployeeFormModel } from 'models/hr/HrModels'
import { RefOptionsField } from 'components/fields/RefOptionsField'
import { getGenderOptions } from 'utils/Helpers'

type Props = {
  model: EmployeeFormModel
  errors: any
  handleChange: (e: any) => void
}

const EmployeeMainDataForm = ({
                                model,
                                errors,
                                handleChange,
                              }: Props) => {
  return (
    <FormWrapper>
      <InputField
        label={'Фамилия'}
        fieldName={'lastname'}
        error={errors.lastname}
        value={model.lastname}
        handleChange={handleChange}
      />
      <InputField
        label={'Имя'}
        fieldName={'firstname'}
        error={errors.firstname}
        value={model.firstname}
        handleChange={handleChange}
      />
      <InputField
        label={'Отчество'}
        fieldName={'middlename'}
        error={errors.middlename}
        value={model.middlename}
        handleChange={handleChange}
      />
      <InputField
        label={'ИИН'}
        fieldName={'iin'}
        error={errors.iin}
        value={model.iin}
        handleChange={handleChange}
      />
      <DatePickerField
        label={'Дата рождения'}
        fieldName={'birthDate'}
        error={errors.birthDate}
        value={model.birthDate || ''}
        handleChange={handleChange}
      />
      <RefOptionsField
        label={'Пол'}
        fieldName={'gender'}
        error={errors.gender}
        options={getGenderOptions}
        value={model.gender}
        handleChange={handleChange}
      />
    </FormWrapper>
  )
}

export default EmployeeMainDataForm
