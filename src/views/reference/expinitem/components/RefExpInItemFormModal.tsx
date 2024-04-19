import { useEffect, useState } from 'react'
import { DefaultExpInItemFormModel, ExpInItemFormModel } from '../../../../models/reference/RefModels'
import FormModal from '../../../../components/FormModal'
import { parseResponseFormErrors } from '../../../../utils/ErrorUtil'
import CustomSpinner from '../../../../components/spinner/CustomSpinner'
import RefExpInItemForm from './RefExpInItemForm'
import { useExpInItemFormQuery, useExpInItemSaveMutation } from '../../../../hooks/reference/refExpInItemQueries'

type Props = {
  id: string | undefined
  visible: boolean
  close: () => void
  handleAfterSubmit: () => void
}
const RefExpInItemFormModal = ({ id, visible, close, handleAfterSubmit }: Props) => {
  const [model, setModel] = useState<ExpInItemFormModel>(DefaultExpInItemFormModel)
  const [errors, setErrors] = useState<any>({})

  const formQuery = useExpInItemFormQuery(id, false)
  const saveMutation = useExpInItemSaveMutation(id)

  useEffect(() => {
    if (id) {
      formQuery.refetch()
        .then(({ data }) => setModel(data || DefaultExpInItemFormModel))
    } else {
      setModel(DefaultExpInItemFormModel)
    }

    return () => {
    }
  }, [id])

  const submitForm = () => {
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
    onClose={close}
    title={id ? 'Редактирование статьи' : 'Добавление статьи'}
    handleSubmit={submitForm}
    saving={saveMutation.isLoading}>
    {formQuery.isLoading
      ? <CustomSpinner />
      : <RefExpInItemForm
        model={model}
        handleChange={handleChange}
        errors={errors}
      />}
  </FormModal>
}

export default RefExpInItemFormModal