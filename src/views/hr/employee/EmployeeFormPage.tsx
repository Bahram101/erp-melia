import DocFormPageWrapper from 'components/doc/DocFormPageWrapper'
import EmployeeForm from './components/EmployeeForm'
import CustomSpinner from 'components/spinner/CustomSpinner'
import EmployeeFormAddress from './components/EmployeeFormAddress'
import { CCol, CForm } from '@coreui/react-pro'
import { useState } from 'react'
import { DefaultWhouseDocFormModel, WhouseDocFormModel } from 'models/whouse/whouseModels'

const EmployeeFormPage = () => {

  const [model, setModel] = useState()
  const [errors, setErrors] = useState<any>({})

  return (
    <>
      <DocFormPageWrapper
        saving={false}
        handleSubmit={() => {}}
        cancelUrl={``}
        title={`Создание сотрудника`}
        children={
          false ? (
            <CustomSpinner />
          ) : (
            <CForm className="row">
              <EmployeeForm />
              <CCol md={6}>
                <EmployeeFormAddress title="Проживающий адрес" live/>
                <EmployeeFormAddress title="Адрес регистрации"/>
              </CCol>
            </CForm>
          )
        }
      />
    </>
  )
}

export default EmployeeFormPage
