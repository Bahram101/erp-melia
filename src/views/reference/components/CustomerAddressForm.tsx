import { ChangeEvent, useEffect, useState } from 'react'
import FormWrapper from 'components/FormWrapper'
import InputField from 'components/fields/InputField'
import { RefOptionsField } from 'components/fields/RefOptionsField'
import { CustomerAddressFormModel } from 'models/hr/HrModels'
import { RefOptionsModel } from 'models/CommonModels'
import { InputAutoComplete } from 'components/fields/InputAutoComplete'
import {
  useCityDistrictOptionsQuery,
  useCityOptionsQuery,
  useDistrictOptionsQuery,
  useMicroDistrictOptionsQuery,
  useStreetOptionsQuery,
  useVillageOptionsQuery,
} from '../../../hooks/reference/refOptionsQueries'

type Props = {
  live?: boolean
  errors: any
  address: CustomerAddressFormModel
  regionOptions: RefOptionsModel[]
  handleChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => void
}

const CustomerAddressForm = ({
                               address,
                               errors,
                               regionOptions,
                               handleChange,
                             }: Props) => {
  const [districtOptions, setDistrictOptions] = useState<RefOptionsModel[]>([])
  const [cityOptions, setCityOptions] = useState<RefOptionsModel[]>([])
  const [villageOptions, setVillageOptions] = useState<RefOptionsModel[]>([])
  const [cityDistrictOptions, setCityDistrictOptions] = useState<RefOptionsModel[]>([])
  const [microDistrictOptions, setMicroDistrictOptions] = useState<RefOptionsModel[]>([])
  const [streetOptions, setStreetOptions] = useState<RefOptionsModel[]>([])

  const districtOptionsQuery = useDistrictOptionsQuery(address.regionId, true)
  const cityOptionsQuery = useCityOptionsQuery(address.regionId, true)
  const villageOptionsQuery = useVillageOptionsQuery(address.village, true)
  const cityDistrictOptionsQuery = useCityDistrictOptionsQuery(address.cityDistrict, true)
  const microDistrictOptionsQuery = useMicroDistrictOptionsQuery(address.microDistrict, true)
  const streetOptionsQuery = useStreetOptionsQuery(address.street, true)

  useEffect(() => {
    if (address.regionId) {
      districtOptionsQuery.refetch().then(({ data }) => {
        setDistrictOptions(data || [])
      })
      cityOptionsQuery.refetch().then(({ data }) => {
        setCityOptions(data || [])
      })
    } else {
      setDistrictOptions([])
      setCityOptions([])
    }
  }, [address.regionId])

  useEffect(() => {
    if (address.village?.length > 2) {
      villageOptionsQuery.refetch().then(({ data }) => {
        setVillageOptions(data || [])
      })
    }
  }, [address.village])

  useEffect(() => {
    if (address.cityDistrict?.length > 2) {
      cityDistrictOptionsQuery.refetch().then(({ data }) => {
        setCityDistrictOptions(data || [])
      })
    }
  }, [address.cityDistrict])

  useEffect(() => {
    if (address.microDistrict?.length > 2) {
      microDistrictOptionsQuery.refetch().then(({ data }) => {
        setMicroDistrictOptions(data || [])
      })
    }
  }, [address.microDistrict])

  useEffect(() => {
    if (address.street?.length > 2) {
      streetOptionsQuery.refetch().then(({ data }) => {
        setStreetOptions(data || [])
      })
    }
  }, [address.street])

  return <FormWrapper>
    <InputField
      label="Название адреса"
      placeholder={'Название адреса'}
      fieldName={'name'}
      error={errors.name}
      value={address.name}
      handleChange={handleChange}
    />
    <RefOptionsField
      label="Область"
      fieldName="regionId"
      error={errors.regionId}
      options={regionOptions}
      value={address.regionId}
      handleChange={handleChange}
    />
    <RefOptionsField
      label="Район"
      fieldName="districtId"
      optionLabel="Выберите район..."
      error={errors.districtId}
      options={districtOptions}
      value={address.districtId}
      handleChange={handleChange}
    />
    <RefOptionsField
      label="Город"
      fieldName="cityId"
      optionLabel="Выберите город..."
      error={errors.cityId}
      options={cityOptions}
      value={address.cityId}
      handleChange={handleChange}
    />
    <InputAutoComplete
      label="Аул"
      placeholder="Введите название аула..."
      fieldName="village"
      options={villageOptions}
      value={address.village}
      handleChange={handleChange}
    />
    <InputAutoComplete
      label="Район в городе"
      placeholder="Введите название района..."
      fieldName="cityDistrict"
      options={cityDistrictOptions}
      value={address.cityDistrict}
      handleChange={handleChange}
    />
    <InputAutoComplete
      label="Микрорайон"
      placeholder="Введите название микрорайона..."
      fieldName="microDistrict"
      options={microDistrictOptions}
      value={address.microDistrict}
      handleChange={handleChange}
    />
    <InputAutoComplete
      label="Улица"
      placeholder="Введите название улицы..."
      fieldName="street"
      options={streetOptions}
      value={address.street}
      handleChange={handleChange}
    />
    <InputField
      label={'Номер дома'}
      fieldName="houseNumber"
      error={errors.houseNumber}
      value={address.houseNumber}
      handleChange={handleChange}
    />
    <InputField
      label={'Номер квартиры'}
      fieldName={'flatNumber'}
      type="number"
      error={errors.flatNumber}
      value={address.flatNumber}
      handleChange={handleChange}
    />
  </FormWrapper>
}

export default CustomerAddressForm
