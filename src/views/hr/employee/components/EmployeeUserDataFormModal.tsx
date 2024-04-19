import FormModal from '../../../../components/FormModal'
import { useEffect, useState } from 'react'
import { EmployeeUserFormModel } from '../../../../models/hr/HrModels'
import { parseResponseFormErrors } from '../../../../utils/ErrorUtil'
import { useUserFormQuery, useUserUpdateMutation } from '../../../../hooks/hr/userQueries'
import EmployeeUserDataForm from './EmployeeUserDataForm'

type Props = {
  visible: boolean
  onClose: () => void
  empId: string
  handleAfterSubmit: () => void
}
const EmployeeUserDataFormModal = ({ visible, onClose, empId, handleAfterSubmit }: Props) => {
  const [model, setModel] = useState<EmployeeUserFormModel | undefined>(undefined)
  const [errors, setErrors] = useState<any>({})

  const formQuery = useUserFormQuery(empId, false)
  const updateMutation = useUserUpdateMutation(empId)

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
    {model && <EmployeeUserDataForm
      model={model}
      errors={errors}
      handleChange={handleChange}
    />}
  </FormModal>
}

export default EmployeeUserDataFormModal