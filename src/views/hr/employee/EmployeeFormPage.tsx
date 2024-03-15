import { ChangeEvent } from 'react'
import DocFormPageWrapper from 'components/doc/DocFormPageWrapper'
import EmployeeForm from './components/EmployeeForm'
import CustomSpinner from 'components/spinner/CustomSpinner'
import EmployeeFormAddress from './components/EmployeeFormAddress'
import { CForm } from '@coreui/react-pro'
import { useState } from 'react'
import {
  DefaultEmployeeFormModel,
  DefaultEmployeePhoneFormModel,
  EmployeeAddressFormModel,
  EmployeeFormModel,
} from 'models/hr/HrModels'

const EmployeeFormPage = () => {
  const [model, setModel] = useState<EmployeeFormModel>(DefaultEmployeeFormModel)
  const [errors, setErrors] = useState<any>({})

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setModel({ ...model, [name]: value })
    setErrors({ ...errors, [name]: null })
  }

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>, itemNumber: number) => {
    const { name, value } = e.target
    setModel(prev => ({ ...prev, phoneNumbers: prev.phoneNumbers.map((el, i) => 
      i === itemNumber 
        ? { ...el, [name]: value } 
        : el) }))
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

  const handleAddressChange = (e: any, itemNumber: number) => {
    const { name, value } = e.target
    setModel(prev => ({ ...prev, phoneNumbers: prev.phoneNumbers.map((el, i) => 
      i === itemNumber 
        ? { ...el, [name]: value } 
        : el) }))
  }

  console.log('model', model)

  return (
    <>
      <DocFormPageWrapper
        saving={false}
        handleSubmit={() => { }}
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
              {model.addresses.map((item: EmployeeAddressFormModel, index:number) => (
                <EmployeeFormAddress 
                  key={index}
                  title={index === 0 ? "Проживающий адрес" : 'Адрес регистрации'}
                  item = {item} 
                  errors = {errors} 
                  handleAddressChange = {handleAddressChange} 
                  live = {index === 0 ? true : false } 
                />
              ))}
            </CForm>
          )
        }
      />
    </>
  )
}

export default EmployeeFormPage
