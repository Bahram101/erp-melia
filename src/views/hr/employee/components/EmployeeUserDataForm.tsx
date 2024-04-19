import FormWrapper from 'components/FormWrapper'
import InputField from 'components/fields/InputField'
import { EmployeeUserFormModel } from 'models/hr/HrModels'
import { RefOptionsField } from 'components/fields/RefOptionsField'
import { getUserStatusOptions } from 'utils/Helpers'

type Props = {
  model: EmployeeUserFormModel
  errors: any
  handleChange: (e: any) => void
}

const EmployeeUserDataForm = ({
                                model,
                                errors,
                                handleChange,
                              }: Props) => {
  return (
    <FormWrapper>
      <InputField
        label={'Логин'}
        fieldName={'username'}
        error={errors.username}
        value={model.username}
        handleChange={handleChange}
      />
      <InputField
        type={'password'}
        label={'Пароль'}
        fieldName={'password'}
        error={errors.password}
        value={model.password}
        handleChange={handleChange}
      />
      <RefOptionsField
        label={'Статус'}
        fieldName={'status'}
        error={errors.status}
        options={getUserStatusOptions}
        value={model.status}
        handleChange={handleChange}
      />
    </FormWrapper>
  )
}

export default EmployeeUserDataForm
