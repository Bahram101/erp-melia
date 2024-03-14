import { CButton, CCol } from '@coreui/react-pro'
import { FaPlus } from 'react-icons/fa'
import { SlClose } from 'react-icons/sl'

import FormWrapper from 'components/FormWrapper'
import { DatePickerField } from 'components/fields/DatePickerField'
import InputField from 'components/fields/InputField'
import { EmployeeFormModel } from 'models/hr/HrModels'
import { RefOptionsField } from 'components/fields/RefOptionsField'
import { genderList } from 'utils/Helpers'

type Props = {
  model: EmployeeFormModel
  errors: any
  handleChange: (e: any) => void
  handlePhoneChange: (e: React.ChangeEventHandler<HTMLInputElement>, itemNumber: number) => void
  onClickAddPhone: (e: any) => void
  onClickRemovePhone: (e: any) => void
}

const EmployeeForm = ({
  model,
  errors,
  handleChange,
  handlePhoneChange,
  onClickAddPhone,
  onClickRemovePhone,
}: Props) => {
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
          handleChange={handleChange}
        />
        <RefOptionsField
          label={'Пол'}
          fieldName={'gender'}
          error={errors.gender}
          options={genderList}
          value={model.gender}
          handleChange={handleChange}
        />
        {model.phoneNumbers.map((item: any, index: number) => (
          <div className="d-flex align-items-center" key={index}>
            <InputField
              label={'Тел. номер'}
              fieldName={'number'}
              error={errors.number}
              value={item.number}
              handleChange={(e: any) => handlePhoneChange(e, index)}
            />
            {index !== 0 && (
              <SlClose
                size={28}
                color="red"
                className="closeIcon"
                onClick={() => onClickRemovePhone(index)}
              />
            )}
          </div>
        ))}
        <CButton
          size="sm"
          variant="outline"
          color="secondary"
          className="float-end"
          onClick={onClickAddPhone}
          disabled={model.phoneNumbers.length > 4}
        >
          <FaPlus style={{ transform: 'translateY(-1px)' }} />
        </CButton>
      </FormWrapper>
    </CCol>
  )
}

export default EmployeeForm
