import DocFormPageWrapper from 'components/doc/DocFormPageWrapper'
import EmployeeForm from './components/EmployeeForm'
import CustomSpinner from 'components/spinner/CustomSpinner'
import EmployeeFormAddress from './components/EmployeeFormAddress'
import { CCol, CForm } from '@coreui/react-pro'
import { useState } from 'react'
import { DefaultEmployeeFormModel, EmployeeFormModel } from 'models/hr/HrModels'

const EmployeeFormPage = () => {
  const [model, setModel] = useState<EmployeeFormModel>(DefaultEmployeeFormModel)
  const [errors, setErrors] = useState<any>({})

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setModel({ ...model, [name]: value })
    setErrors({ ...errors, [name]: null })
  }

  console.log('model', model)

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
              <EmployeeForm model={model} errors={errors} handleChange={handleChange} />
              <EmployeeFormAddress title="Проживающий адрес" live />
              <EmployeeFormAddress title="Адрес регистрации" />
            </CForm>
          )
        }
      />
    </>
  )
}

export default EmployeeFormPage
