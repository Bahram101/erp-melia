import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { CustomerAddressFormModel, EmployeeFormModel } from 'models/hr/HrModels'
import CustomerAddressForm from './CustomerAddressForm'
import {
  useCityOptionsQuery,
  useDistrictOptionsQuery,
  useRegionOptionsQuery,
  useVillageOptionsQuery,
} from 'hooks/reference/refOptionsQueries'

type Props = {
  index: number
  errors: any
  setModel: (val: any) => void
  address: CustomerAddressFormModel
}

const CustomerAddressWrapper = ({ index, errors, address, setModel }: Props) => {
  const [addressData, setAddressData] = useState<any>({
    districts: [],
    cities: [],
    villages: [],
  })

  const regionOptionsQuery = useRegionOptionsQuery(true)
  const districtOptionsQuery = useDistrictOptionsQuery(address.regionId, true)
  const cityOptionsQuery = useCityOptionsQuery(address.regionId, true)
  const villageOptionsQuery = useVillageOptionsQuery(address.village, true)

  useEffect(() => {
    if (address.regionId) {
      districtOptionsQuery.refetch().then(({ data }) => {
        setAddressData((prev: any) => ({ ...prev, districts: data }))
      })
      cityOptionsQuery.refetch().then(({ data }) => {
        setAddressData((prev: any) => ({ ...prev, cities: data }))
      })
    }
  }, [address.regionId])

  useEffect(() => {
    if (address.village && address.village.length > 2) {
      villageOptionsQuery.refetch().then(({ data }) => {
        setAddressData((prev: any) => ({ ...prev, villages: data }))
      })
    }
  }, [address.village])

  const handleAddressChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
    itemNumber: number,
  ) => {
    const { name, value } = e.target
    setModel((prev: any) => ({
      ...prev,
      addresses: prev.addresses.map((el: CustomerAddressFormModel, i: number) =>
        i === itemNumber ? { ...el, [name]: value } : el,
      ),
    }))
  }

  console.log('addressData', addressData)
  console.log('address', address)

  return (
    <CustomerAddressForm
      index={index}
      title={index === 0 ? 'Проживающий адрес' : 'Адрес регистрации'}
      regionOptions={regionOptionsQuery.data || []}
      districtOptions={addressData.districts || []}
      cityOptions={addressData.cities || []}
      villageOptions={addressData.cities || []}
      errors={errors}
      address={address}
      handleAddressChange={handleAddressChange}
    />
  )
}

export default CustomerAddressWrapper
