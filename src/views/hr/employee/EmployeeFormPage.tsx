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
import { useCityOptionsQuery, useDistrictOptionsQuery, useRegionOptionsQuery } from 'hooks/reference/refOptionsQueries'

const EmployeeFormPage = () => {
  const [model, setModel] = useState<EmployeeFormModel>(DefaultEmployeeFormModel)
  const [errors, setErrors] = useState<any>({})
  const [addressData, setAddressData] = useState<any>({
    districts1: [],
    districts2: [],
    cities1:[],
    cities2:[]
  })
  const regionOptionsQuery = useRegionOptionsQuery(true)
  const districtOptionsQuery1 = useDistrictOptionsQuery(model.addresses[0].regionId, true)
  const districtOptionsQuery2 = useDistrictOptionsQuery(model.addresses[1].regionId, true)
  const cityOptionsQuery1 = useCityOptionsQuery(model.addresses[0].regionId, true)
  const cityOptionsQuery2 = useCityOptionsQuery(model.addresses[1].regionId, true)

  useEffect(() => {
    districtOptionsQuery1.refetch().then(({data}) => 
      setAddressData((prev:any) => ({...prev, districts1: data}))
    )
    cityOptionsQuery1.refetch().then(({data}) => 
      setAddressData((prev:any) => ({...prev, cities1: data}))
    )
  }, [model.addresses[0].regionId])

  useEffect(() => {
    districtOptionsQuery2.refetch().then(({data}) => 
      setAddressData((prev:any) => ({...prev, districts2: data}))
    )
    cityOptionsQuery2.refetch().then(({data}) => 
      setAddressData((prev:any) => ({...prev, cities2: data}))
    )
  }, [model.addresses[1].regionId])


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
    console.log('name',name);
    console.log('value',value);
    
    
    setModel((prev) => ({
      ...prev,
      addresses: prev.addresses.map((el, i) => (i === itemNumber ? { ...el, [name]: value } : el)),
    }))
  }

  console.log('model', model) 
  console.log('addressData', addressData);
  
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
                  live
                  title='Проживающий адрес'
                  regionOptions={regionOptionsQuery.data || []}  
                  districtOptions={addressData.districts1}
                  cityOptions={addressData.cities1}
                  errors={errors}
                  model={model}
                  handleAddressChange={handleAddressChange}
                />
                <EmployeeFormAddress
                  title='Адрес регистрации'
                  regionOptions={regionOptionsQuery.data || []}  
                  districtOptions={addressData.districts2}
                  cityOptions={addressData.cities2}
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
