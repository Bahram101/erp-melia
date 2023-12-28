import { CCol, CDatePicker, CForm, CFormInput, CFormSelect } from '@coreui/react-pro'

type Props = {
  validated: boolean
  setValidated: (status: boolean) => void
}

const PostForm = ({ validated, setValidated }: Props) => {
  return (
    <CForm
      className="row g-3 needs-validation"
      noValidate
      // validated={validated}
    >
      <CCol md={12}>
        <CFormSelect label="Филиал" aria-label="Default select example" options={['Не выбрано']} />
      </CCol>
      <CCol md={12}>
        <CFormSelect
          label="Должность"
          aria-label="Default select example"
          options={['Не выбрано']}
        />
      </CCol>
      <CCol md={12}>
        <CDatePicker locale="en-US" label="Дата начала" />
      </CCol>
      <CCol md={12}>
        <CFormInput
          type="text"
          defaultValue="Mark"
          feedbackValid="Looks good!"
          id="validationCustom01"
          label="First name"
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
