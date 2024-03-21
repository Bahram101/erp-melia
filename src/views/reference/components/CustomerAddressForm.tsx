import { ChangeEvent } from 'react'
import { CCol } from '@coreui/react-pro'
import FormWrapper from 'components/FormWrapper'
import InputField from 'components/fields/InputField'
import { RefOptionsField } from 'components/fields/RefOptionsField'
import { CustomerAddressFormModel, EmployeeFormModel } from 'models/hr/HrModels'
import { RefOptionsModel } from 'models/CommonModels'
import { InputAutoComplete } from 'components/fields/InputAutoComplete'

type Props = {
  index: number
  title: string
  live?: boolean
  errors: any
  address: CustomerAddressFormModel
  regionOptions: RefOptionsModel[]
  districtOptions: RefOptionsModel[]
  cityOptions: RefOptionsModel[]
  villageOptions: RefOptionsModel[]
  cityDistrictOptions: RefOptionsModel[]
  microDistrictOptions: RefOptionsModel[]
  streetOptions: RefOptionsModel[]
  handleAddressChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
    index: number,
  ) => void
}

const CustomerAddressForm = ({
  index,
  title,
  address,
  errors,
  regionOptions,
  districtOptions,
  cityOptions,
  villageOptions,
  cityDistrictOptions,
  microDistrictOptions,
  streetOptions,
  handleAddressChange,
}: Props) => {
  return (
    <CCol
      xl={index === 0 ? 4 : { span: 4, offset: 0 }}
      lg={index === 0 ? 6 : { span: 6, offset: 6 }}
      md={index === 0 ? 6 : { span: 6, offset: 6 }}
    >
      <div className={index === 0 ? 'mb-5' : ''}>
        <h6>{title}</h6>
        <hr />
        <FormWrapper>
          <InputField
            label="Название адреса"
            placeholder={title}
            fieldName={'name'}
            error={''}
            value={address.name}
            handleChange={(e: ChangeEvent<HTMLInputElement>) => handleAddressChange(e, index)}
          />
          <RefOptionsField
            label='Область'
            fieldName='regionId'
            error={''}
            options={regionOptions}
            value={address.regionId}
            handleChange={(e) => handleAddressChange(e, index)}
          />
          <RefOptionsField
            label='Район'
            fieldName='districtId'
            optionLabel="Выберите район..."
            error={''}
            options={districtOptions}
            value={address.districtId}
            handleChange={(e) => handleAddressChange(e, index)}
          />
          <RefOptionsField
            label='Город'
            fieldName='cityId'
            optionLabel="Выберите город..."
            error={''}
            options={cityOptions}
            value={address.cityId}
            handleChange={(e) => handleAddressChange(e, index)}
          />
          <InputAutoComplete
            label='Аул'
            placeholder='Введите название аула...'
            index={index}
            fieldName="village"
            options={villageOptions}
            value={address.village}
            handleAddressChange={handleAddressChange}
          />
          <InputAutoComplete
            label='Район в городе'
            placeholder='Введите название района...'
            index={index}
            fieldName="cityDistrict"
            options={cityDistrictOptions}
            value={address.cityDistrict}
            handleAddressChange={handleAddressChange}
          /> 
          <InputAutoComplete
            label='Микрорайон'
            placeholder='Введите название микрорайона...'
            index={index}
            fieldName="microDistrict"
            options={microDistrictOptions}
            value={address.microDistrict}
            handleAddressChange={handleAddressChange}
          /> 
          <InputAutoComplete
            label='Улица'
            placeholder='Введите название улицы...'
            index={index}
            fieldName="street"
            options={streetOptions}
            value={address.street}
            handleAddressChange={handleAddressChange}
          />
          <InputField
            label={'Номер дома'}
            fieldName='houseNumber'
            error={''}
            value={address.houseNumber}
            handleChange={(e: ChangeEvent<HTMLInputElement>) => handleAddressChange(e, index)}
          />
          <InputField
            label={'Номер квартиры'}
            fieldName={'flatNumber'}
            type="number"
            error={''}
            value={address.flatNumber}
            handleChange={(e: ChangeEvent<HTMLInputElement>) => handleAddressChange(e, index)}
          />
        </FormWrapper>
      </div>
    </CCol>
  )
}

export default CustomerAddressForm
