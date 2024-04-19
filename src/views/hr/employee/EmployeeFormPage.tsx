import { ChangeEvent, Fragment, useEffect, useState } from 'react'
import DocFormPageWrapper from 'components/doc/DocFormPageWrapper'
import EmployeeMainDataForm from './components/EmployeeMainDataForm'
import CustomSpinner from 'components/spinner/CustomSpinner'
import { CCol, CForm } from '@coreui/react-pro'
import { DefaultEmployeeFormModel, EmployeeFormModel } from 'models/hr/HrModels'
import CustomerAddressWrapper from 'views/reference/components/CustomerAddressWrapper'
import { useEmployeeFormQuery, useEmployeeInfoSaveMutation } from 'hooks/hr/employeeQueries'
import { useParams } from 'react-router-dom'
import { parseResponseFormErrors } from 'utils/ErrorUtil'
import PhoneNumbersBlock from '../../../components/fields/PhoneNumbersBlock'

const EmployeeFormPage = () => {
  const { id } = useParams()
  const [model, setModel] = useState<EmployeeFormModel>(DefaultEmployeeFormModel)
  const [errors, setErrors] = useState<any>({})

  const employeeFormQuery = useEmployeeFormQuery(id, false)
  const saveMutation = useEmployeeInfoSaveMutation(id)

  useEffect(() => {
    if (id) {
      employeeFormQuery.refetch()
        .then(({ data }) => setModel(data || DefaultEmployeeFormModel))
    } else {
      setModel(DefaultEmployeeFormModel)
    }
  }, [id])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setModel({ ...model, [name]: value })
    setErrors({ ...errors, [name]: null })
  }

  const handleSubmit = () => {
    saveMutation
      .mutateAsync({
        form: model,
      })
      .then(({ data }) => {
        location.pathname = data ? `/hr/employees/view/${data.id}` : '/hr/employees'
      })
      .catch((error) => {
        setErrors(parseResponseFormErrors(error))
      })
  }

  return (
    <>
      <DocFormPageWrapper
        saving={saveMutation.isLoading}
        handleSubmit={handleSubmit}
        cancelUrl={``}
        title={`Создание сотрудника`}
        children={
          false ? (
            <CustomSpinner />
          ) : (
            <CForm className="row">
              <CCol xl={4} lg={6} md={6} className="mb-4">
                <h6>Данные сотрудника</h6>
                <hr />
                <EmployeeMainDataForm
                  model={model}
                  errors={errors}
                  handleChange={handleChange}
                />

                <hr />
                <PhoneNumbersBlock
                  values={model.phoneNumbers}
                  handleChange={handleChange}
                  errors={errors}
                  fieldName={'phoneNumbers'}
                />
              </CCol>

              <CCol>
                <h6>Адреса</h6>
                <hr />
                <CustomerAddressWrapper
                  handleChange={handleChange}
                  errors={errors}
                  addresses={model.addresses}
                />
              </CCol>
            </CForm>
          )
        }
      />
    </>
  )
}

export default EmployeeFormPage
