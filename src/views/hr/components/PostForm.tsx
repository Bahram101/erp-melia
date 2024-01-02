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
  model: EmployeePostFormModel | undefined
}

const PostForm = ({ branchOptions, positionOptions, handleChange, model }: Props) => {
  if (!model) {
    return null
  }

  return (
    <CForm className="row g-3 needs-validation">
      <CCol md={12}>
        <RefOptionsField
          label={'Филиал'}
          options={branchOptions}
          handleChange={handleChange}
          fieldName={'branchId'}
          value={model.branchId}
        />
      </CCol>
      <CCol md={12}>
        <RefOptionsField
          label={'Должность'}
          options={positionOptions}
          handleChange={handleChange}
          fieldName={'positionId'}
          value={model.positionId}
        />
      </CCol>
      <CCol md={12}>
        <DatePickerField
          label={'Дата начала'}
          fieldName={'beginDate'}
          handleChange={handleChange}
          value={model.beginDate}
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
      <CCol md={12}>
        <CCol md={12}>
          <YesNoOptionsField
            label={'Доступ к системе'}
            value={model.hasAccess}
            handleChange={handleChange}
            fieldName={'hasAccess'}
          />
        </CCol>
      </CCol>
      <CCol md={12}>
        <YesNoOptionsField
          label={'Имеет доступ ко всем филиалам'}
          value={model.accessAllBranches}
          handleChange={handleChange}
          fieldName={'accessAllBranches'}
        />
      </CCol>
    </CForm>
  )
}

export default PostForm
