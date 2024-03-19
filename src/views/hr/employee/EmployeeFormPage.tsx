import { ChangeEvent, Fragment, useEffect } from 'react'
import DocFormPageWrapper from 'components/doc/DocFormPageWrapper'
import EmployeeForm from './components/EmployeeForm'
import CustomSpinner from 'components/spinner/CustomSpinner'
import { CForm } from '@coreui/react-pro'
import { useState } from 'react'
import {
  DefaultEmployeeFormModel,
  DefaultEmployeePhoneFormModel,
  EmployeeFormModel,
} from 'models/hr/HrModels'
import CustomerAddressWrapper from 'views/reference/components/CustomerAddressWrapper'

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
    setModel((prev) => ({
      ...prev,
      phoneNumbers: prev.phoneNumbers.map((el, i) =>
        i === itemNumber ? { ...el, [name]: value } : el,
      ),
    }))
  }

  const addPhoneRow = () => {
    setModel((prev: EmployeeFormModel) => ({
      ...prev,
      phoneNumbers: [...prev.phoneNumbers, DefaultEmployeePhoneFormModel],
    }))
  }

  const removePhoneRow = (removeItem: number) => {
    setModel((prev: EmployeeFormModel) => ({
      ...prev,
      phoneNumbers: prev.phoneNumbers.filter((item, index) => index !== removeItem),
    }))
  }

  // console.log('model', model)

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
                addPhoneRow={addPhoneRow}
                removePhoneRow={removePhoneRow}
              />
              {model.addresses.map((address: any, index: number) => (
                <Fragment key={index}>
                  <CustomerAddressWrapper
                    index={index} 
                    setModel={setModel}
                    errors={errors}
                    address={address}
                  />
                </Fragment>
              ))}
            </CForm>
          )
        }
      />
    </>
  )
}

export default EmployeeFormPage
