import { ChangeEvent } from 'react'
import { CCol } from '@coreui/react-pro'
import FormWrapper from 'components/FormWrapper'
import InputField from 'components/fields/InputField'
import { RefOptionsField } from 'components/fields/RefOptionsField'
import { EmployeeAddressFormModel, EmployeeFormModel } from 'models/hr/HrModels'
import { RefOptionsModel } from 'models/CommonModels'

type Props = { 
  title: string
  live?: boolean
  model: EmployeeFormModel
  errors: any
  regionOptions: RefOptionsModel[]
  districtOptions: RefOptionsModel[]
  cityOptions: RefOptionsModel[]
  handleAddressChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
    index: number,
  ) => void
}

const EmployeeFormAdress = ({ 
  live,
  title, 
  model,
  errors,
  regionOptions,
  districtOptions,
  cityOptions,
  handleAddressChange,
}: Props) => {

  const index = live === true ? 0 : 1

  return (
    <CCol
      xl={live ? 4 : { span: 4, offset: 0 }}
      lg={live ? 6 : { span: 6, offset: 6 }}
      md={live ? 6 : { span: 6, offset: 6 }}
    >
      <div className={live ? 'mb-5' : ''}>
        <h6>{title}</h6>
        <hr />
        <FormWrapper>
          <InputField
            label="Название адреса"
            placeholder={title}
            fieldName={'name'}
            error={''}
            value={model.addresses[index].name}
            handleChange={(e: ChangeEvent<HTMLInputElement>) => handleAddressChange(e, index)}
          />
          <RefOptionsField
            label={'Область'}
            fieldName={'regionId'}
            error={''}
            options={regionOptions}
            value={model.addresses[index].regionId}
            handleChange={(e) => handleAddressChange(e, index)}
          />
          <RefOptionsField
            label={'Район'}
            fieldName={'districtId'}
            optionLabel="Выберите район..."
            error={''}
            options={districtOptions}
            value={model.addresses[index].districtId}
            handleChange={(e) => handleAddressChange(e, index)}
          />
          <RefOptionsField
            label={'Город'}
            fieldName={'cityId'}
            optionLabel="Выберите город..."
            error={''}
            options={cityOptions}
            value={model.addresses[index].cityId}
            handleChange={(e) => handleAddressChange(e, index)}
          />
          <InputField
            label={'Аул'}
            placeholder="Введите название аула..."
            fieldName={'middlename'}
            handleChange={() => {}}
            value={''}
            error={''}
          />
          <InputField
            label={'Район в городе'}
            placeholder="Введите название района..."
            fieldName={'middlename'}
            handleChange={() => {}}
            value={''}
            error={''}
          />
          <InputField
            label={'Микрорайон'}
            placeholder="Введите название микрорайона..."
            fieldName={''}
            handleChange={() => {}}
            value={''}
            error={''}
          />
          <InputField
            label={'Улица'}
            placeholder="Введите название улицы..."
            fieldName={''}
            handleChange={() => {}}
            value={''}
            error={''}
          />
          <InputField
            label={'Номер дома'}
            fieldName={''}
            handleChange={() => {}}
            value={''}
            error={''}
          />
          <InputField
            label={'Номер квартиры'}
            fieldName={'lastname'}
            type="number"
            handleChange={() => {}}
            value={''}
            error={''}
          />
        </FormWrapper>
      </div>
    </CCol>
  )
}

export default EmployeeFormAdress
