import { CCol, CForm } from '@coreui/react-pro'
import FormWrapper from 'components/FormWrapper'
import { DatePickerField } from 'components/fields/DatePickerField'
import InputField from 'components/fields/InputField'
import { RefOptionsField } from 'components/fields/RefOptionsField'
import { EmployeeFormModel } from 'models/hr/HrModels'

type Props = {
  model: EmployeeFormModel
  errors: any
  handleChange: (e: any) => void
}

const EmployeeForm = ({ model, errors, handleChange }: Props) => {
  return (
    <CCol xl={4} lg={6} md={6} className="mb-4">
      <h6>Данные сотрудника</h6>
      <hr />
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
          value={model.birthDate}
          handleChange={() => {}}
        />
        <RefOptionsField
          label={'Пол'}
          fieldName={'gender'}
          error={errors.gender}
          options={[]}
          value={model.gender}
          handleChange={() => {}}
        />
        <InputField
          label={'Тел. номер'}
          fieldName={''}
          error={errors.firstname}
          value={model.lastname}
          handleChange={() => {}}
        />
      </FormWrapper>
    </CCol>
  )
}

export default EmployeeForm
