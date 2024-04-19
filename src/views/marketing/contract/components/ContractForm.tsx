import { CCol, CForm } from '@coreui/react-pro'
import InputField from '../../../../components/fields/InputField'
import { ContractFormModel } from '../../../../models/marketing/MrkModels'
import { RefOptionsModel } from '../../../../models/CommonModels'
import { RefOptionsField } from '../../../../components/fields/RefOptionsField'
import CustomerField from '../../../../components/fields/CustomerField'
import YesNoOptionsField from '../../../../components/fields/YesNoOptionsField'
import { DatePickerField } from '../../../../components/fields/DatePickerField'
import CurrPostsField from '../../../../components/fields/CurrPostsField'
import { formatMoney } from '../../../../utils/UtilFuncs'
import TextAreaField from '../../../../components/fields/TextAreaField'
import ContractField from '../../../../components/fields/Contract/ContractField'
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
        <div className="mb-3">
          <InputField
            label={'Рег. номер'}
            type={'number'}
            fieldName={'regNumber'}
            handleChange={handleChange}
            value={model.regNumber}
            error={errors.regNumber}
          />
        </div>
        <div className="mb-3">
          <RefOptionsField
            label={'Филиал'}
            options={branchOptions}
            handleChange={handleChange}
            fieldName={'branchId'}
            value={model.branchId}
            error={errors.branchId}
          />
        </div>
        <div className="mb-3">
          <RefOptionsField
            label={'Сервис филиал'}
            options={branchOptions}
            handleChange={handleChange}
            fieldName={'serviceBranchId'}
            value={model.serviceBranchId}
            error={errors.serviceBranchId}
          />
        </div>
        <div className="mb-3">
          <DatePickerField
            label={'Дата договора'}
            fieldName={'docDate'}
            handleChange={handleChange}
            value={model.docDate}
            error={errors.docDate}
          />
        </div>
        <div className="mb-3">
          <CurrPostsField
            label={'Дилер'}
            fieldName={'dealer'}
            handleChange={handleChange}
            error={errors.dealer}
            value={model.dealer}
          />
        </div>
        <div className="mb-3">
          <CurrPostsField
            label={'Демосекретарь'}
            fieldName={'demoSec'}
            handleChange={handleChange}
            error={errors.demoSec}
            value={model.demoSec}
          />
        </div>
        <div className="mb-3">
          <CurrPostsField
            label={'Установщик'}
            fieldName={'fitter'}
            handleChange={handleChange}
            error={errors.fitter}
            value={model.fitter}
          />
        </div>
        <div className="mb-3">
          <CurrPostsField
            label={'Взносщик'}
            fieldName={'collector'}
            handleChange={handleChange}
            error={errors.collector}
            value={model.collector}
          />
        </div>
        <div className="mb-3">
          <TextAreaField
            label={'Примечание'}
            fieldName={'note'}
            handleChange={handleChange}
            value={model.note}
            error={errors.note}
          />
        </div>
      </CCol>
      <CCol md={6}>
        <div className="mb-3">
          <CustomerField
            label={'Клиент'}
            fieldName={'customer'}
            handleChange={handleChange}
            value={model.customer}
            error={errors.customer}
          />
        </div>
        <div className="mb-3">
          <RefOptionsField
            label={'Адрес'}
            options={addressOptions}
            handleChange={handleChange}
            fieldName={'addressId'}
            value={model.addressId}
            error={errors.addressId}
          />
        </div>
        <div className="mb-3">
          <YesNoOptionsField
            label={'За город'}
            fieldName={'outCity'}
            handleChange={handleChange}
            value={model.outCity}
            error={errors.outCity}
          />
        </div>
        <div className="mb-3">
          <ContractField
            label={'Рекомендатель'}
            value={model.recommender}
            error={errors.recommender}
            fieldName={'recommender'}
            handleChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <RefOptionsField
            label={'Продукт'}
            options={goodsOptions}
            handleChange={handleChange}
            fieldName={'goodsId'}
            value={model.goodsId}
            error={errors.goodsId}
          />
        </div>
        <div className="mb-3">
          <InputField
            label={'Серииный номер'}
            fieldName={'serialNumber'}
            handleChange={handleChange}
            value={model.serialNumber}
            error={errors.serialNumber}
          />
        </div>
        <div className="mb-3">
          <RefOptionsField
            label={'Вид продажи'}
            options={saleTypeOptions}
            handleChange={handleChange}
            fieldName={'saleTypeId'}
            value={model.saleTypeId}
            error={errors.saleTypeId}
          />
        </div>
        <div className="mb-3">
          <InputField
            label={'Цена продажи продукта'}
            fieldName={'price'}
            handleChange={(e: any) => null}
            value={formatMoney(model.price)}
            error={errors.price}
            disabled
          />
        </div>
        <div className="mb-3">
          <InputField
            label={'Первоначальный взнос'}
            fieldName={'firstPayment'}
            handleChange={handleChange}
            value={formatMoney(model.firstPayment)}
            error={errors.firstPayment}
          />
        </div>
        <div className="mb-3">
          ToDo - Перв. взнос наличными
        </div>
        <div className="mb-3">
          <InputField
            label={'Скидка от дилера'}
            fieldName={'discountFromDealer'}
            handleChange={handleChange}
            value={formatMoney(model.discountFromDealer)}
            error={errors.discountFromDealer}
          />
        </div>

        <hr />
        <PaymentScheduleForm
          items={model.payments}
          handleContractPaymentChange={handleContractPaymentChange}
          distributePayments={distributePayments}
          distributing={distributing}
        />
      </CCol>
    </CForm>
  )
}

export default ContractForm
