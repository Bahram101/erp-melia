import { CCol, CForm } from '@coreui/react-pro'
import { RefOptionsModel } from '../../../models/CommonModels'
import { EmployeePostFormModel } from '../../../models/hr/HrModels'
import { RefOptionsField } from '../../../components/fields/RefOptionsField'
import CurrencyField from '../../../components/fields/CurrencyField'
import YesNoOptionsField from '../../../components/fields/YesNoOptionsField'
import { DatePickerField } from '../../../components/fields/DatePickerField'

type Props = {
  branchOptions: RefOptionsModel[]
  positionOptions: RefOptionsModel[]
  handleChange: (e: any) => void
  errors: any
  model: EmployeePostFormModel | undefined
}

const PostForm = ({ branchOptions, positionOptions, handleChange, model, errors }: Props) => {
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
          label={'Филиал'}
          fieldName={'branchId'}
          options={branchOptions}
          value={model.branchId}
          handleChange={handleChange}
          error={errors.branchId}
        />
      </CCol>
      <CCol md={12}>
        <RefOptionsField
          label={'Должность'}
          fieldName={'positionId'}
          options={positionOptions}
          value={model.positionId}
          handleChange={handleChange}
          error={errors.positionId}
        />
      </CCol>
      <CCol md={12}>
        <DatePickerField
          label={'Дата начала'}
          placeholder="Выберите дату"
          fieldName={'beginDate'}
          error={errors.beginDate}
          value={model.beginDate || ''}
          handleChange={handleChange}
        />
      </CCol>
      <CCol md={12}>
        <CurrencyField
          label={'Оклад'}
          error={errors.salary}
          fieldName={'salary'}
          handleChange={handleChange}
          value={model.salary}
        />
      </CCol>
      <CCol md={12}>
        <CCol md={12}>
          <YesNoOptionsField
            label={'Доступ к системе'}
            fieldName={'hasAccess'}
            value={model.hasAccess}
            handleChange={handleChange}
          />
        </CCol>
      </CCol>
      <CCol md={12}>
        <YesNoOptionsField
          label={'Имеет доступ ко всем филиалам'}
          fieldName={'accessAllBranches'}
          value={model.accessAllBranches}
          handleChange={handleChange}
        />
      </CCol>
    </CForm>
  )
}

export default PostForm
