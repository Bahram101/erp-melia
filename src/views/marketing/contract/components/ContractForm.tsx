import { CCol, CRow } from '@coreui/react-pro'
import InputField from '../../../../components/fields/InputField'
import { ContractFormModel } from '../../../../models/marketing/MrkModels'
import { RefOptionsModel } from '../../../../models/CommonModels'
import { RefOptionsField } from '../../../../components/fields/RefOptionsField'
import CustomerField from '../../../../components/fields/CustomerField'
import YesNoOptionsField from '../../../../components/fields/YesNoOptionsField'
import { DatePickerField } from '../../../../components/fields/DatePickerField'
import CurrPostsField from '../../../../components/fields/CurrPostsField'
import { formatMoney } from '../../../../utils/UtilFuncs'

type Props = {
  model: ContractFormModel;
  handleChange: (e: any) => void;
  errors: any;
  branchOptions: RefOptionsModel[];
  addressOptions: RefOptionsModel[];
  goodsOptions: RefOptionsModel[];
  saleTypeOptions: RefOptionsModel[];
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
  return <>
    <CRow>
      <CCol>
        <InputField
          label={'Рег. номер'}
          type={'number'}
          fieldName={'regNumber'}
          handleChange={handleChange}
          value={model.regNumber}
          error={errors.regNumber}
        />
      </CCol>
      <CCol>
        <CustomerField
          label={'Клиент'}
          fieldName={'customer'}
          handleChange={handleChange}
          value={model.customer}
          error={errors.customer}
        />
      </CCol>
    </CRow>

    <CRow>
      <CCol>
        <RefOptionsField
          label={'Филиал'}
          options={branchOptions}
          handleChange={handleChange}
          fieldName={'branchId'}
          value={model.branchId}
          error={errors.branchId}
        />
      </CCol>
      <CCol>
        <RefOptionsField
          label={'Адрес'}
          options={addressOptions}
          handleChange={handleChange}
          fieldName={'addressId'}
          value={model.addressId}
          error={errors.addressId}
        />
      </CCol>
    </CRow>

    <CRow>
      <CCol>
        <RefOptionsField
          label={'Сервис филиал'}
          options={branchOptions}
          handleChange={handleChange}
          fieldName={'serviceBranchId'}
          value={model.serviceBranchId}
          error={errors.serviceBranchId}
        />
      </CCol>
      <CCol>
        <YesNoOptionsField
          label={'За город'}
          fieldName={'outCity'}
          handleChange={handleChange}
          value={model.outCity}
          error={errors.outCity}
        />
      </CCol>
    </CRow>

    <CRow>
      <CCol>
        <DatePickerField
          label={'Дата договора'}
          fieldName={'docDate'}
          handleChange={handleChange}
          value={model.docDate}
          error={errors.docDate}
        />
      </CCol>
      <CCol>
        //ToDo Reco Field
      </CCol>
    </CRow>

    <CRow>
      <CCol>
        <CurrPostsField
          label={'Дилер'}
          fieldName={'dealer'}
          handleChange={handleChange}
          error={errors.dealer}
          value={model.dealer}
        />
      </CCol>
      <CCol>
        <RefOptionsField
          label={'Продукт'}
          options={goodsOptions}
          handleChange={handleChange}
          fieldName={'goodsId'}
          value={model.goodsId}
          error={errors.goodsId}
        />
      </CCol>
    </CRow>

    <CRow>
      <CCol>
        <CurrPostsField
          label={'Демосекретарь'}
          fieldName={'demoSec'}
          handleChange={handleChange}
          error={errors.demoSec}
          value={model.demoSec}
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
    </CRow>

    <CRow>
      <CCol>
        <CurrPostsField
          label={'Установщик'}
          fieldName={'fitter'}
          handleChange={handleChange}
          error={errors.fitter}
          value={model.fitter}
        />
      </CCol>
      <CCol>
        <RefOptionsField
          label={'Вид продажи'}
          options={saleTypeOptions}
          handleChange={handleChange}
          fieldName={'saleTypeId'}
          value={model.saleTypeId}
          error={errors.saleTypeId}
        />
      </CCol>
    </CRow>

    <CRow>
      <CCol>
        <CurrPostsField
          label={'Взносщик'}
          fieldName={'collector'}
          handleChange={handleChange}
          error={errors.collector}
          value={model.collector}
        />
      </CCol>
      <CCol>
        <InputField
          label={'Цена продажи продукта'}
          fieldName={'price'}
          handleChange={(e: any) => null}
          value={formatMoney(model.price)}
          error={errors.price}
          disabled
        />
      </CCol>
    </CRow>

    <CRow>
      <CCol>

      </CCol>
      <CCol>
        <InputField
          label={'Первоначальный взнос'}
          fieldName={'firstPayment'}
          handleChange={handleChange}
          value={formatMoney(model.firstPayment)}
          error={errors.firstPayment}
        />
        {/*ToDo - Перв. взнос наличными*/}
      </CCol>
    </CRow>

    <CRow>
      <CCol>

      </CCol>
      <CCol>
        <InputField
          label={'Скидка от дилера'}
          fieldName={'discountFromDealer'}
          handleChange={handleChange}
          value={formatMoney(model.discountFromDealer)}
          error={errors.discountFromDealer}
        />
      </CCol>
    </CRow>
  </>
}

export default ContractForm
