import { CCol, CDatePicker, CForm, CFormInput, CFormSelect } from '@coreui/react-pro'
import { RefOptionsField } from 'components/fields/RefOptionsField'
import { PositionModel } from 'models/reference/positionModels'

type Props = {
  branchOptions: { id: string; label: string }[]
  positionOptions: { id: string; name: string }[]
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
        <CDatePicker locale="en-US" label="Дата начала" onChange={handleChange} />
      </CCol>
      <CCol md={12}>
        <CFormInput
          type="text"
          value={state.salary}
          name="salary"
          onChange={handleChange}
          label="Оклад"
          required
        />
      </CCol>
      <CCol md={12}>
        <CCol md={12}>
          <CFormSelect
            label="Имеет доступ к системе"
            aria-label="Default select example"
            options={['Не выбрано']}
          />
        </CCol>
      </CCol>
      <CCol md={12}>
        <CCol md={12}>
          <CFormSelect
            label="Имеет доступ ко всем филиалам"
            aria-label="Default select example"
            options={['Не выбрано']}
          />
        </CCol>
      </CCol>
    </CForm>
  )
}

export default PostForm
