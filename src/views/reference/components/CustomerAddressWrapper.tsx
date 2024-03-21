import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { CustomerAddressFormModel, EmployeeFormModel } from 'models/hr/HrModels'
import CustomerAddressForm from './CustomerAddressForm'
import {
  useCityDistrictOptionsQuery,
  useCityOptionsQuery,
  useDistrictOptionsQuery,
  useMicroDistrictOptionsQuery,
  useRegionOptionsQuery,
  useStreetOptionsQuery,
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
    cityDistricts: [],
    microDistricts: [],
    streets: [],
  })

  const regionOptionsQuery = useRegionOptionsQuery(true)
  const districtOptionsQuery = useDistrictOptionsQuery(address.regionId, true)
  const cityOptionsQuery = useCityOptionsQuery(address.regionId, true)
  const villageOptionsQuery = useVillageOptionsQuery(address.village, true)
  const cityDistrictOptionsQuery = useCityDistrictOptionsQuery(address.cityDistrict, true)
  const microDistrictOptionsQuery = useMicroDistrictOptionsQuery(address.microDistrict, true)
  const streetOptionsQuery = useStreetOptionsQuery(address.street, true)

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
    if (address.village?.length > 2) {
      villageOptionsQuery.refetch().then(({ data }) => {
        setAddressData((prev: any) => ({ ...prev, villages: data }))
      })
    }
    if (address.cityDistrict?.length > 2) {
      cityDistrictOptionsQuery.refetch().then(({ data }) => {
        setAddressData((prev: any) => ({ ...prev, cityDistricts: data }))
      })
    } 
    if (address.microDistrict?.length > 2) {
      microDistrictOptionsQuery.refetch().then(({ data }) => {
        setAddressData((prev: any) => ({ ...prev, microDistricts: data }))
      })
    } 
    if (address.street?.length > 2) {
      streetOptionsQuery.refetch().then(({ data }) => {
        setAddressData((prev: any) => ({ ...prev, streets: data }))
      })
    } 
  }, [address.village, address.cityDistrict, address.microDistrict, address.street])

  const handleAddressChange = (
    e: any,
    index: number,
  ) => {
    const { name, value } = e.target 
    console.log('name', name);
    console.log('value', value);
    
    setModel((prev: any) => ({
      ...prev,
      addresses: prev.addresses.map((el: CustomerAddressFormModel, i: number) =>
        i === index ? { ...el, [name]: value } : el,
      ),
    }))
  }

  return (
    <CustomerAddressForm
      index={index}
      errors={errors}
      address={address}
      title={index === 0 ? 'Проживающий адрес' : 'Адрес регистрации'}
      regionOptions={regionOptionsQuery.data || []}
      districtOptions={addressData.districts || []}
      cityOptions={addressData.cities || []}
      villageOptions={addressData.villages || []}
      cityDistrictOptions={addressData.cityDistricts || []}
      microDistrictOptions={addressData.microDistricts || []}
      streetOptions={addressData.streets || []}
      handleAddressChange={handleAddressChange}
    />
  )
}

export default CustomerAddressWrapper
