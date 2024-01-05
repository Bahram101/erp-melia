import { CCol, CForm, CFormFeedback, CFormSelect } from '@coreui/react-pro'
import { RefOptionsModel } from '../../../models/CommonModels'
import { EmployeePostFormModel } from '../../../models/hr/HrModels'
import { RefOptionsField } from '../../../components/fields/RefOptionsField'
import CurrencyField from '../../../components/fields/CurrencyField'
import YesNoOptionsField from '../../../components/fields/YesNoOptionsField'
import { DatePickerField } from '../../../components/fields/DatePickerField'

type Props = { 
  handleChange: (e: any) => void
  formValidated: boolean
  error: boolean
  model: any
}

const BalanceForm = ({ 
  handleChange,
  model,
  formValidated,
  error,
}: Props) => {
  if (!model) {
    return null
  }

  return (
    <CForm className="row g-3 needs-validation" validated={formValidated}>
      <CCol md={12}>
        <RefOptionsField
          label={'Филиал'}
          fieldName={'branchId'}
          options={[]}
          value={model.branchId}
          handleChange={handleChange}
        />
      </CCol>
      <CCol md={12}>
        <DatePickerField
          label={'Дата начала'}
          placeholder="Выберите дату"
          fieldName={'beginDate'}
          error={error}
          value={model.beginDate || ''}
          handleChange={handleChange}
        />
      </CCol>
      <CCol md={12}>
        <CurrencyField
          label={'Оклад'}
          error={''}
          fieldName={'salary'}
          handleChange={handleChange}
          value={model.salary}
        />
      </CCol>       
    </CForm>
  )
}

export default BalanceForm
