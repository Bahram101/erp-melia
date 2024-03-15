import { ChangeEvent, Fragment, useEffect } from 'react'
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
import { useDistrictOptionsQuery, useRegionOptionsQuery } from 'hooks/reference/refOptionsQueries'

const EmployeeFormPage = () => {
  const [model, setModel] = useState<EmployeeFormModel>(DefaultEmployeeFormModel)
  const [errors, setErrors] = useState<any>({})

  const regionOptionsQuery = useRegionOptionsQuery(true)
  const districtOptionsQuery = useDistrictOptionsQuery(model.addresses[0].regionId, true)

  // useEffect(() => {
  //   regionOptionsQuery.refetch()
  // }, [model])

  useEffect(() => {
    districtOptionsQuery.refetch()
  }, [model.addresses[0].regionId])

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

  const handleAddressChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
    itemNumber: number,
  ) => {
    const { name, value } = e.target
    setModel((prev) => ({
      ...prev,
      addresses: prev.addresses.map((el, i) => (i === itemNumber ? { ...el, [name]: value } : el)),
    }))
  }

  console.log('model', model)
  console.log('districtOptionsQuery', districtOptionsQuery)

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
              <>
                <EmployeeFormAddress
                  regionOptions={regionOptionsQuery.data || []}  
                  title='Проживающий адрес'
                  errors={errors}
                  model={model}
                  live
                  handleAddressChange={handleAddressChange}
                />
                <EmployeeFormAddress
                  regionOptions={regionOptionsQuery.data || []}  
                  title='Адрес регистрации'
                  errors={errors}
                  model={model}
                  handleAddressChange={handleAddressChange}
                />
              </>
            </CForm>
          )
        }
      />
    </>
  )
}

export default EmployeeFormPage
