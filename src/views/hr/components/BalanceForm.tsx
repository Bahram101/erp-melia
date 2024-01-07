import { CCol, CForm } from '@coreui/react-pro'
import { RefOptionsField } from '../../../components/fields/RefOptionsField'
import CurrencyField from '../../../components/fields/CurrencyField'
import { DatePickerField } from '../../../components/fields/DatePickerField'
import { CustomerDeptFormModel } from 'models/finance/FinModels'
import { RefOptionsModel } from 'models/CommonModels'

type Props = {
  cashOptions: RefOptionsModel[]
  handleChange: (e: any) => void
  errors: any
  model: CustomerDeptFormModel
}

const BalanceForm = ({ handleChange, cashOptions, model, errors }: Props) => {
  if (!model) {
    return null
  }

  return (
    <CForm
      className="row g-3 needs-validation"
      validated={errors && Object.keys(errors).length > 0}
    >
      <CCol md={12}>
        <RefOptionsField
          label={'На кассу'}
          fieldName={'toCashId'}
          options={cashOptions}
          value={model.toCashId}
          handleChange={handleChange}
          error={errors.toCashId}
        />
      </CCol>
      <CCol md={12}>
        <DatePickerField
          label={'Дата оплаты'}
          placeholder="Выберите дату"
          fieldName={'docDate'}
          value={model.docDate}
          handleChange={handleChange}
          error={errors.docDate}
        />
      </CCol>
      <CCol md={12}>
        <CurrencyField
          label={'Сумма'}
          fieldName={'amount'}
          value={model.amount}
          handleChange={handleChange}
          error={errors.amount}
        />
      </CCol>
    </CForm>
  )
}

export default BalanceForm
