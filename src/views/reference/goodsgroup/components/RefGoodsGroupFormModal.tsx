import { useEffect, useState } from 'react'
import { GoodsGroupFormModel } from '../../../../models/reference/RefModels'
import { useGoodsGroupFormQuery, useGoodsGroupsSaveMutation } from '../../../../hooks/reference/refGoodsGroupQueries'
import { parseResponseFormErrors } from '../../../../utils/ErrorUtil'
import FormModal from '../../../../components/FormModal'
import CustomSpinner from '../../../../components/spinner/CustomSpinner'
import RefGoodsGroupForm from './RefGoodsGroupForm'

type Props = {
  id: string | undefined
  visible: boolean
  close: () => void
  handleAfterSubmit: () => void
}

const DefaultFormModel: GoodsGroupFormModel = { name: '' }
const RefGoodsGroupFormModal = ({ id, visible, close, handleAfterSubmit }: Props) => {
  const [model, setModel] = useState<GoodsGroupFormModel>(DefaultFormModel)
  const [errors, setErrors] = useState<any>({})

  const formQuery = useGoodsGroupFormQuery(id, false)
  const saveMutation = useGoodsGroupsSaveMutation(id)

  useEffect(() => {
    if (id) {
      formQuery.refetch()
        .then(({ data }) => setModel(data || DefaultFormModel))
    } else {
      setModel(DefaultFormModel)
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
    title={id ? 'Редактирование группы' : 'Добавление группы'}
    handleSubmit={submitForm}
    saving={saveMutation.isLoading}>
    {formQuery.isLoading
      ? <CustomSpinner />
      : <RefGoodsGroupForm
        model={model}
        handleChange={handleChange}
        errors={errors}
      />}
  </FormModal>
}

export default RefGoodsGroupFormModal