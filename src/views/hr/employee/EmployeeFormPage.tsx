import DocFormPageWrapper from 'components/doc/DocFormPageWrapper'
import EmployeeForm from './components/EmployeeForm'
import CustomSpinner from 'components/spinner/CustomSpinner'
import EmployeeFormAddress from './components/EmployeeFormAddress'
import { CForm } from '@coreui/react-pro'
import { useState } from 'react'
import {
  DefaultEmployeeFormModel,
  DefaultEmployeePhoneFormModel,
  EmployeeFormModel,
} from 'models/hr/HrModels'

const EmployeeFormPage = () => {
  const [model, setModel] = useState<EmployeeFormModel>(DefaultEmployeeFormModel)
  const [errors, setErrors] = useState<any>({})

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setModel({ ...model, [name]: value })
    setErrors({ ...errors, [name]: null })
  }

  const handlePhoneChange = (e: any, itemNumber: number) => {
    const { name, value } = e.target
    console.log('name', name)
    console.log('value', value)
  }

  const onClickAddPhone = () => {
    setModel((prev: EmployeeFormModel) => ({
      ...prev,
      phoneNumbers: [...prev.phoneNumbers, DefaultEmployeePhoneFormModel],
    }))
  }

  const onClickRemovePhone = (removeItem: number) => {
    setModel((prev: EmployeeFormModel) => ({
      ...prev,
      phoneNumbers: prev.phoneNumbers.filter((item, index) => index !== removeItem),
    }))
  }

  console.log('model', model)

  return (
    <>
      <DocFormPageWrapper
        saving={false}
        handleSubmit={() => {}}
        cancelUrl={``}
        title={`Создание сотрудника`}
        children={
          false ? (
            <CustomSpinner />
          ) : (
            <CForm className="row">
              <EmployeeForm
                model={model}
                errors={errors}
                handleChange={handleChange}
                handlePhoneChange={handlePhoneChange}
                onClickAddPhone={onClickAddPhone}
                onClickRemovePhone={onClickRemovePhone}
              />
              <EmployeeFormAddress title="Проживающий адрес" live />
              <EmployeeFormAddress title="Адрес регистрации" />
            </CForm>
          )
        }
      />
    </>
  )
}

export default EmployeeFormPage
