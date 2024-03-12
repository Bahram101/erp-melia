import FormWrapper from 'components/FormWrapper'
import InputField from 'components/fields/InputField'
import { RefOptionsField } from 'components/fields/RefOptionsField'

type Props = {
  title: string
  live?: boolean
}

const EmployeeFormAdress = ({ title, live }: Props) => {
  return (
    <div className={live ? 'mb-5' : ''}>
      <h6>{title}</h6>
      <hr />
      <FormWrapper>
        <InputField
          label="Название адреса"
          placeholder={title}
          fieldName={'lastname'}
          handleChange={() => {}}
          value={''}
          error={''}
        />
        <RefOptionsField
          label={'Область'}
          fieldName={''}
          error={''}
          options={[]}
          value={''}
          handleChange={() => {}}
        />
        <RefOptionsField
          label={'Район'}
          fieldName={''}
          optionLabel="Выберите район..."
          error={''}
          options={[]}
          value={''}
          handleChange={() => {}}
        />
        <RefOptionsField
          label={'Город'}
          fieldName={''}
          optionLabel="Выберите город..."
          error={''}
          options={[]}
          value={''}
          handleChange={() => {}}
        />        
        <InputField
          label={'Аул'}
          placeholder='Введите название аула...'
          fieldName={'middlename'}
          handleChange={() => {}}
          value={''}
          error={''}
        />
        <InputField
          label={'Район в городе'}
          placeholder='Введите название района...'
          fieldName={'middlename'}
          handleChange={() => {}}
          value={''}
          error={''}
        />
        <InputField
          label={'Микрорайон'}
          placeholder='Введите название микрорайона...'
          fieldName={''} 
          handleChange={() => {}}
          value={''}
          error={''}
        />
        <InputField
          label={'Улица'}
          placeholder='Введите название улицы...'
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
  )
}

export default EmployeeFormAdress
