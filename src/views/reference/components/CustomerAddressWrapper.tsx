import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { EmployeeAddressFormModel, EmployeeFormModel } from 'models/hr/HrModels'
import CustomerAddressForm from './CustomerAddressForm'
import {
  useCityOptionsQuery,
  useDistrictOptionsQuery,
  useRegionOptionsQuery,
} from 'hooks/reference/refOptionsQueries'

type Props = {
  index: number
  errors: any
  model: EmployeeFormModel
  setModel: (val: any) => void
  address: EmployeeAddressFormModel
}

const CustomerAddressWrapper = ({ index, model, errors, address, setModel }: Props) => {
  const [addressData, setAddressData] = useState<any>([])

  const regionOptionsQuery = useRegionOptionsQuery(true)
  const districtOptionsQuery = useDistrictOptionsQuery(address.regionId, true)

  useEffect(() => {
    if (address.regionId && !districtOptionsQuery.isFetching) {
      districtOptionsQuery.refetch().then(({ data }: any) => {
        setAddressData(data || [])
      })
    }
  }, [address.regionId ])

  // const handleAddressChange = (
  //   e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
  //   itemNumber: number,
  // ) => {
  //   const { name, value } = e.target

  //   setModel((prev: any) => ({
  //     ...prev,
  //     addresses: prev.addresses.map((el: EmployeeAddressFormModel, i: number) =>
  //       i === itemNumber ? { ...el, [name]: value } : el,
  //     ),
  //   }))
  // }
  
  const handleAddressChange = useCallback(
    (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>, itemNumber: number) => {
      const { name, value } = e.target
      setModel((prev: any) => ({
        ...prev,
        addresses: prev.addresses.map((el: EmployeeAddressFormModel, i: number) =>
          i === itemNumber ? { ...el, [name]: value } : el,
        ),
      }))
    },
    [setModel],
  )

  console.log('addressData', addressData)

  return (
    <CustomerAddressForm
      index={index}
      title={index === 0 ? 'Проживающий адрес' : 'Адрес регистрации'}
      regionOptions={regionOptionsQuery.data || []}
      districtOptions={[]}
      cityOptions={[]}
      errors={errors}
      address={address}
      handleAddressChange={handleAddressChange}
    />
  )
}

export default React.memo(CustomerAddressWrapper)
