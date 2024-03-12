import { CCol, CForm } from '@coreui/react-pro'
import FormWrapper from 'components/FormWrapper'
import { DatePickerField } from 'components/fields/DatePickerField'
import InputField from 'components/fields/InputField'
import { RefOptionsField } from 'components/fields/RefOptionsField'
import EmployeeFormAdress from './EmployeeFormAddress'

const EmployeeForm = () => {
  return (
    <CCol className='mb-4'>
      <h6>Данные сотрудника</h6>
      <hr />
      <FormWrapper>
        <InputField
          label={'Фамилия'}
          fieldName={'lastname'}
          handleChange={() => {}}
          value={''}
          error={''}
        />
        <InputField
          label={'Имя'}
          fieldName={'firstname'}
          handleChange={() => {}}
          value={''}
          error={''}
        />
        <InputField
          label={'Отчество'}
          fieldName={'middlename'}
          handleChange={() => {}}
          value={''}
          error={''}
        />
        <InputField label={'ИИН'} fieldName={'iin'} handleChange={() => {}} value={''} error={''} />
        <DatePickerField
          label={'Дата рождения'}
          fieldName={'birthDate'}
          error={''}
          value={''}
          handleChange={() => {}}
        />
        <RefOptionsField
          label={'Пол'}
          fieldName={'gender'}
          error={''}
          options={[]}
          value={''}
          handleChange={() => {}}
        />
        <InputField
          label={'Тел. номер'}
          fieldName={''} 
          handleChange={() => {}}
          value={''}
          error={''}
        />
      </FormWrapper>
    </CCol>
  )
}

export default EmployeeForm
