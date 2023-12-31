import { CCol, CForm, CFormInput, CFormSelect, CDatePicker } from '@coreui/react-pro'
import { RefOptionsField } from 'components/fields/RefOptionsField'
import { BranchModel, PositionModel } from 'models/reference/refModels'
import '@coreui/coreui/dist/css/coreui.min.css'
type Props = {
  branchOptions: BranchModel[] | undefined
  positionOptions: PositionModel[] | undefined
  handleChange: (e: any) => void
  state: any
}

const PostForm = ({ branchOptions, positionOptions, handleChange, state }: Props) => {
  return (
    <CForm className="row g-3 needs-validation">
      <CCol md={12}>
        <RefOptionsField
          optionLabel={'Филиал'}
          label={'Филиал'}
          fieldName={'branchId'}
          options={branchOptions || []}
          handleChange={handleChange}
        />
      </CCol>
      <CCol md={12}>
        <RefOptionsField
          optionLabel={'Должность'}
          label={'Должность'}
          fieldName={'positionId'}
          options={positionOptions || []}
          handleChange={handleChange}
        />
      </CCol>
      <CCol md={12}>
        {/* <CDatePicker
          placeholder={'Дата начало'}
          locale="en-US"
          label="Дата начала" 
        /> */}
        <CDatePicker label="Date" locale="en-US" />
      </CCol>
      <CCol md={12}>
        <CFormInput
          placeholder="Оклад"
          type="text"
          value={state.salary || ''}
          name="salary"
          onChange={handleChange}
          label="Оклад"
          required
        />
      </CCol>
      <CCol md={12}>
        <CCol md={12}>
          <RefOptionsField
            label={'Филиал'}
            fieldName={'hasAccess'}
            options={
              [
                { id: true, label: 'Да' },
                { id: false, label: 'Нет' },
              ] || []
            }
            handleChange={handleChange}
          />
        </CCol>
      </CCol>
      <CCol md={12}>
        <RefOptionsField
          label={'Имеет доступ ко всем филиалам'}
          fieldName={'accessAllBranches'}
          options={
            [
              { id: true, label: 'Да' },
              { id: false, label: 'Нет' },
            ] || []
          }
          handleChange={handleChange}
        />
      </CCol>
    </CForm>
  )
}

export default PostForm
