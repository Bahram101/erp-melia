import FormModal from '../../../../components/FormModal'
import EmployeeMainDataForm from './EmployeeMainDataForm'
import { useEffect, useState } from 'react'
import { EmployeeFormModel } from '../../../../models/hr/HrModels'
import { useEmployeeFormQuery, useEmployeeUpdateMutation } from '../../../../hooks/hr/employeeQueries'
import { parseResponseFormErrors } from '../../../../utils/ErrorUtil'

type Props = {
  visible: boolean
  onClose: () => void
  empId: string
  handleAfterSubmit: () => void
}
const EmployeeMainDataFormModal = ({ visible, onClose, empId, handleAfterSubmit }: Props) => {
  const [model, setModel] = useState<EmployeeFormModel | undefined>(undefined)
  const [errors, setErrors] = useState<any>({})

  const formQuery = useEmployeeFormQuery(empId, false)
  const updateMutation = useEmployeeUpdateMutation(empId)

  useEffect(() => {
    if (empId) {
      formQuery.refetch()
        .then(({ data }) => setModel(data))
    } else {
      setModel(undefined)
    }
  }, [empId])
  const handleSubmit = () => {
    if (model) {
      updateMutation
        .mutateAsync({
          form: model,
        })
        .then(() => {
          handleAfterSubmit()
        })
        .catch((error) => {
          setErrors(parseResponseFormErrors(error))
        })
    }
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target
    if (model) {
      setModel({ ...model, [name]: value })
    }

    setErrors({ ...errors, [name]: null })
  }

  return <FormModal
    visibleFormModal={visible}
    onClose={onClose}
    title={'Редактирование данных сотрудника'}
    handleSubmit={handleSubmit}
    saving={updateMutation.isLoading}
  >
    {model && <EmployeeMainDataForm
      model={model}
      errors={errors}
      handleChange={handleChange}
    />}
  </FormModal>
}

export default EmployeeMainDataFormModal