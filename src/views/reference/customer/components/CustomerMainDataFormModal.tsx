import {
  useCustomerMainDataFormQuery,
  useCustomerMainDataSaveMutation,
} from '../../../../hooks/reference/refCustomerQueries'
import { useEffect, useState } from 'react'
import { CustomerFormModel, DefaultCustomerFormModel } from '../../../../models/reference/RefModels'
import FormModal from '../../../../components/FormModal'
import { parseResponseFormErrors } from '../../../../utils/ErrorUtil'
import CustomerMainDataForm from './CustomerMainDataForm'

type Props = {
  id: string | undefined
  visible: boolean
  onClose: () => void
  handleAfterSubmit: () => void
}
const CustomerMainDataFormModal = ({ id, visible, onClose, handleAfterSubmit }: Props) => {
  const [model, setModel] = useState<CustomerFormModel>(DefaultCustomerFormModel)
  const [errors, setErrors] = useState<any>({})
  if (!id) {
    return null
  }

  const formQuery = useCustomerMainDataFormQuery(id, false)
  const saveMutation = useCustomerMainDataSaveMutation(id)

  useEffect(() => {
    if (id) {
      formQuery.refetch()
        .then(({ data }) => {
          setModel(data || DefaultCustomerFormModel)
        })
    }

    return () => formQuery.remove()
  }, [id])

  const handleSubmit = () => {
    saveMutation
      .mutateAsync({
        form: model,
      })
      .then(({ data }) => {
        handleAfterSubmit()
      })
      .catch((error) => {
        setErrors(parseResponseFormErrors(error))
      })
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setModel({ ...model, [name]: value })
    setErrors({ ...errors, [name]: null })
  }

  return <FormModal
    visibleFormModal={visible}
    onClose={onClose}
    title={'Редактирование данных контрагента'}
    handleSubmit={handleSubmit}
    saving={saveMutation.isLoading}>
    <CustomerMainDataForm
      model={model}
      handleChange={handleChange}
      errors={errors}
    />
  </FormModal>
}

export default CustomerMainDataFormModal