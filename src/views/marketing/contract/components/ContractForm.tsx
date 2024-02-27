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
  distributePayments: () => void
  distributing: boolean
  handleContractPaymentChange: (idx: number, e: any) => void
}
const ContractForm = ({
  model,
  handleChange,
  errors,
  branchOptions,
  addressOptions,
  goodsOptions,
  saleTypeOptions,
  distributePayments,
  handleContractPaymentChange,
  distributing = false,
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
        <RefOptionsField
          label={'Филиал'}
          options={branchOptions}
          handleChange={handleChange}
          fieldName={'branchId'}
          value={model.branchId}
          error={errors.branchId}
        />
        <RefOptionsField
          label={'Сервис филиал'}
          options={branchOptions}
          handleChange={handleChange}
          fieldName={'serviceBranchId'}
          value={model.serviceBranchId}
          error={errors.serviceBranchId}
        />
        <DatePickerField
          label={'Дата договора'}
          fieldName={'docDate'}
          handleChange={handleChange}
          value={model.docDate}
          error={errors.docDate}
        />
      </CCol>
      <CCol>
        <RefContractField
          branchOptions={[]}
          value={model.recommender}
          fieldName={'recommender'}
          handleChange={handleChange}
        />
      </CCol>

      <CCol md={6}>
        <CurrPostsField
          label={'Дилер'}
          fieldName={'dealer'}
          handleChange={handleChange}
          error={errors.dealer}
          value={model.dealer}
        />
        <CurrPostsField
          label={'Демосекретарь'}
          fieldName={'demoSec'}
          handleChange={handleChange}
          error={errors.demoSec}
          value={model.demoSec}
        />
        <CurrPostsField
          label={'Установщик'}
          fieldName={'fitter'}
          handleChange={handleChange}
          error={errors.fitter}
          value={model.fitter}
        />
        <CurrPostsField
          label={'Взносщик'}
          fieldName={'collector'}
          handleChange={handleChange}
          error={errors.collector}
          value={model.collector}
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
        <RefOptionsField
          label={'Адрес'}
          options={addressOptions}
          handleChange={handleChange}
          fieldName={'addressId'}
          value={model.addressId}
          error={errors.addressId}
        />
        <YesNoOptionsField
          label={'За город'}
          fieldName={'outCity'}
          handleChange={handleChange}
          value={model.outCity}
          error={errors.outCity}
        />
        {/* //ToDo Reco Field  */}
        <RefOptionsField
          label={'Продукт'}
          options={goodsOptions}
          handleChange={handleChange}
          fieldName={'goodsId'}
          value={model.goodsId}
          error={errors.goodsId}
        />
        <InputField
          label={'Серииный номер'}
          fieldName={'serialNumber'}
          handleChange={handleChange}
          value={model.serialNumber}
          error={errors.serialNumber}
        />
        <RefOptionsField
          label={'Вид продажи'}
          options={saleTypeOptions}
          handleChange={handleChange}
          fieldName={'saleTypeId'}
          value={model.saleTypeId}
          error={errors.saleTypeId}
        />
        <InputField
          label={'Цена продажи продукта'}
          fieldName={'price'}
          handleChange={(e: any) => null}
          value={formatMoney(model.price)}
          error={errors.price}
          disabled
        />
        <InputField
          label={'Первоначальный взнос'}
          fieldName={'firstPayment'}
          handleChange={handleChange}
          value={formatMoney(model.firstPayment)}
          error={errors.firstPayment}
        />
        {/*ToDo - Перв. взнос наличными*/}

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
