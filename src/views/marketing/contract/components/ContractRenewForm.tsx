import { CCol, CForm } from '@coreui/react-pro'
import InputField from '../../../../components/fields/InputField'
import { ContractRenewFormModel } from '../../../../models/marketing/MrkModels'
import { RefOptionsModel } from '../../../../models/CommonModels'
import { RefOptionsField } from '../../../../components/fields/RefOptionsField'
import { DatePickerField } from '../../../../components/fields/DatePickerField'
import { formatMoney } from '../../../../utils/UtilFuncs'
import PaymentScheduleForm from './PaymentScheduleForm'

type Props = {
  model: ContractRenewFormModel
  handleChange: (e: any) => void
  errors: any
  branchOptions: RefOptionsModel[]
  addressOptions: RefOptionsModel[]
  goodsOptions: RefOptionsModel[]
  saleTypeOptions: RefOptionsModel[]
  distributePayments: () => void
  distributing: boolean
  whouseOptions: RefOptionsModel[]
}
const ContractRenewForm = ({
                             model,
                             handleChange,
                             errors,
                             branchOptions,
                             addressOptions,
                             goodsOptions,
                             saleTypeOptions,
                             distributePayments,
                             distributing = false,
  whouseOptions,
                           }: Props) => {
  return (
    <CForm className="row g-3 needs-validation">
      <CCol md={6}>
        <InputField
          disabled={true}
          label={'Рег. номер'}
          fieldName={'regNumber'}
          handleChange={() => {
          }}
          value={model.regCode}
        />
      </CCol>
      <CCol md={6}>
        <DatePickerField
          label={'Дата переоформления'}
          fieldName={'renewDate'}
          handleChange={handleChange}
          value={model.renewDate}
          error={errors.renewDate}
        />
      </CCol>

      <CCol md={6}>
        <InputField
          disabled={true}
          label={'Статус'}
          fieldName={'statusName'}
          handleChange={() => {
          }}
          value={model.statusName}
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
        <InputField
          disabled={true}
          label={'Филиал'}
          fieldName={'branchName'}
          handleChange={() => {
          }}
          value={model.branchName}
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
        <InputField
          disabled={true}
          label={'Дата договора'}
          fieldName={'docDate'}
          handleChange={() => {
          }}
          value={model.docDate}
        />
      </CCol>
      <CCol>
        <InputField
          label={'Серииный номер'}
          fieldName={'serialNumber'}
          handleChange={handleChange}
          value={model.serialNumber}
          error={errors.serialNumber}
        />
      </CCol>

      <CCol md={6}>
        <InputField
          disabled={true}
          label={'Клиент'}
          fieldName={'customerName'}
          handleChange={() => {
          }}
          value={model.customerName}
        />
      </CCol>
      <CCol md={6}>
        <RefOptionsField
          label={'Склад для возврата'}
          options={whouseOptions}
          handleChange={handleChange}
          fieldName={'toWhouseId'}
          value={model.toWhouseId}
          error={errors.toWhouseId}
        />
      </CCol>

      <CCol md={6}>
        <InputField
          disabled={true}
          label={'Дилер'}
          fieldName={'dealerName'}
          handleChange={() => {
          }}
          value={model.dealerName}
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
        <InputField
          disabled={true}
          label={'Цена продажи'}
          fieldName={'price'}
          handleChange={() => {
          }}
          value={formatMoney(model.price)}
        />
      </CCol>
      <CCol md={6}>
        <InputField
          label={'Цена продажи продукта'}
          fieldName={'price'}
          handleChange={() => {}}
          value={formatMoney(model.price)}
          disabled
        />
      </CCol>

      <CCol md={6}>
      </CCol>
      <CCol md={6}>
        <InputField
          label={'Скидка от дилера'}
          fieldName={'discountFromDealer'}
          handleChange={() => {}}
          value={formatMoney(model.discountFromDealer)}
          disabled={true}
        />
      </CCol>

      <CCol md={{ span: 6, offset: 6 }}>
        <InputField
          disabled={true}
          label={'Первоначальный взнос'}
          fieldName={'firstPayment'}
          handleChange={() => {}}
          value={formatMoney(model.firstPayment || 0)}
        />
        {/*ToDo - Перв. взнос наличными*/}
      </CCol>

      <CCol md={{ span: 6, offset: 6 }}>
        <PaymentScheduleForm
          items={model.payments}
          handleContractPaymentChange={() => {
          }}
          distributePayments={distributePayments}
          distributing={distributing}
          editMode={false}
        />
      </CCol>
    </CForm>
  )
}

export default ContractRenewForm
