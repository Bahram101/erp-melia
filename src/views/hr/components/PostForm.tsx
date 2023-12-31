import { CCol, CForm, CFormInput, CFormSelect, CDatePicker } from '@coreui/react-pro'
import { RefOptionsField } from 'components/fields/RefOptionsField'
import { BranchModel, PositionModel } from 'models/reference/refModels' 
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
        <CFormSelect
          label={'Филиал'}
          name={'branchId'}
          options={branchOptions}
          onChange={handleChange}
        />
      </CCol>
      <CCol md={12}>
        <CFormSelect
          label={'Должность'}
          name={'positionId'}
          options={positionOptions}
          onChange={handleChange}
        />
      </CCol>
      <CCol md={12}>
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
          <CFormSelect
            label={'Доступ к системе'}
            name={'hasAccess'}
            options={[
              { value: '', label: 'Не выбрано' },
              { value: 'true', label: 'Да' },
              { value: 'false', label: 'Нет' },
            ]}
            onChange={handleChange}
          />
        </CCol>
      </CCol>
      <CCol md={12}>
        <CFormSelect
          label={'Имеет доступ ко всем филиалам'}
          name={'accessAllBranches'}
          options={[
            { value: '', label: 'Не выбрано' },
            { value: 'true', label: 'Да' },
            { value: 'false', label: 'Нет' },
          ]}
          onChange={handleChange}
        />
      </CCol>
    </CForm>
  )
}

export default PostForm
