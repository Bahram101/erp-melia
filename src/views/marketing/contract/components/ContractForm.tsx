import { CCol, CForm, CRow } from '@coreui/react-pro'
import InputField from '../../../../components/fields/InputField'
import { ContractFormModel } from '../../../../models/marketing/MrkModels'
import { RefOptionsModel } from '../../../../models/CommonModels'
import { RefOptionsField } from '../../../../components/fields/RefOptionsField'
import CustomerField from '../../../../components/fields/CustomerField'
import YesNoOptionsField from '../../../../components/fields/YesNoOptionsField'
import { DatePickerField } from '../../../../components/fields/DatePickerField'
import CurrPostsField from '../../../../components/fields/CurrPostsField'
import { formatMoney } from '../../../../utils/UtilFuncs'
import RefContractField from '../../../../components/fields/RefContractField'
import TextAreaField from '../../../../components/fields/TextAreaField'
import PaymentScheduleForm from './PaymentScheduleForm'

type Props = {
  model: ContractFormModel
  handleChange: (e: any) => void
  errors: any
  branchOptions: RefOptionsModel[]
  addressOptions: RefOptionsModel[]
  goodsOptions: RefOptionsModel[]
  saleTypeOptions: RefOptionsModel[]
}
const ContractForm = ({
  model,
  handleChange,
  errors,
  branchOptions,
  addressOptions,
  goodsOptions,
  saleTypeOptions,
}: Props) => {
  return (
    <CForm className="row g-3 needs-validation">
      <CCol md={6}>
        <InputField
          label={'Рег. номер'}
          type={'number'}
          fieldName={'regNumber'}
          handleChange={handleChange}
          value={model.regNumber}
          error={errors.regNumber}
        />
      </CCol>
      <CCol md={6}>
        <CustomerField
          label={'Клиент'}
          fieldName={'customer'}
          handleChange={handleChange}
          value={model.customer}
          error={errors.customer}
        />
      </CCol>

      <CCol md={6}>
        <RefOptionsField
          label={'Филиал'}
          options={branchOptions}
          handleChange={handleChange}
          fieldName={'branchId'}
          value={model.branchId}
          error={errors.branchId}
        />
      </CCol>
      <CCol md={6}>
        <RefOptionsField
          label={'Адрес'}
          options={addressOptions}
          handleChange={handleChange}
          fieldName={'addressId'}
          value={model.addressId}
          error={errors.addressId}
        />
      </CCol>

      <CCol md={6}>
        <RefOptionsField
          label={'Сервис филиал'}
          options={branchOptions}
          handleChange={handleChange}
          fieldName={'serviceBranchId'}
          value={model.serviceBranchId}
          error={errors.serviceBranchId}
        />
      </CCol>
      <CCol md={6}>
        <YesNoOptionsField
          label={'За город'}
          fieldName={'outCity'}
          handleChange={handleChange}
          value={model.outCity}
          error={errors.outCity}
        />
      </CCol>

      <CCol md={6}>
        <DatePickerField
          label={'Дата договора'}
          fieldName={'docDate'}
          handleChange={handleChange}
          value={model.docDate}
          error={errors.docDate}
        />
      </CCol>
      <CCol>//ToDo Reco Field</CCol>

      <CCol md={6}>
        <CurrPostsField
          label={'Дилер'}
          fieldName={'dealer'}
          handleChange={handleChange}
          error={errors.dealer}
          value={model.dealer}
        />
      </CCol>
      <CCol md={6}>
        <RefOptionsField
          label={'Продукт'}
          options={goodsOptions}
          handleChange={handleChange}
          fieldName={'goodsId'}
          value={model.goodsId}
          error={errors.goodsId}
        />
      </CCol>

      <CCol md={6}>
        <CurrPostsField
          label={'Демосекретарь'}
          fieldName={'demoSec'}
          handleChange={handleChange}
          error={errors.demoSec}
          value={model.demoSec}
        />
      </CCol>
      <CCol md={6}>
        <InputField
          label={'Серииный номер'}
          fieldName={'serialNumber'}
          handleChange={handleChange}
          value={model.serialNumber}
          error={errors.serialNumber}
        />
      </CCol>

      <CCol md={6}>
        <CurrPostsField
          label={'Установщик'}
          fieldName={'fitter'}
          handleChange={handleChange}
          error={errors.fitter}
          value={model.fitter}
        />
      </CCol>
      <CCol md={6}>
        <RefOptionsField
          label={'Вид продажи'}
          options={saleTypeOptions}
          handleChange={handleChange}
          fieldName={'saleTypeId'}
          value={model.saleTypeId}
          error={errors.saleTypeId}
        />
      </CCol>

      <CCol md={6}>
        <CurrPostsField
          label={'Взносщик'}
          fieldName={'collector'}
          handleChange={handleChange}
          error={errors.collector}
          value={model.collector}
        />
      </CCol>
      <CCol md={6}>
        <InputField
          label={'Цена продажи продукта'}
          fieldName={'price'}
          handleChange={(e: any) => null}
          value={formatMoney(model.price)}
          error={errors.price}
          disabled
        />
      </CCol>

      <CCol md={{ span: 6, offset: 6 }}>
        <InputField
          label={'Первоначальный взнос'}
          fieldName={'firstPayment'}
          handleChange={handleChange}
          value={formatMoney(model.firstPayment)}
          error={errors.firstPayment}
        />
        {/*ToDo - Перв. взнос наличными*/}
      </CCol>

      <CCol md={{ span: 6, offset: 6 }}>
        <InputField
          label={'Скидка от дилера'}
          fieldName={'discountFromDealer'}
          handleChange={handleChange}
          value={formatMoney(model.discountFromDealer)}
          error={errors.discountFromDealer}
        />
      </CCol>
    </CForm>
  )
}

export default ContractForm
