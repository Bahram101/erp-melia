import { useEffect, useState } from 'react'
import { GoodsFormModel } from '../../../../models/reference/RefModels'
import { useGoodsFormQuery, useGoodsSaveMutation } from '../../../../hooks/reference/refGoodsQueries'
import { parseResponseFormErrors } from '../../../../utils/ErrorUtil'
import FormModal from '../../../../components/FormModal'
import CustomSpinner from '../../../../components/spinner/CustomSpinner'
import RefGoodsForm from './RefGoodsForm'
import { useGoodsGroupOptionsQuery } from '../../../../hooks/reference/refOptionsQueries'

type Props = {
  id: string | undefined
  visible: boolean
  close: () => void
  handleAfterSubmit: () => void
}

const DefaultFormModel: GoodsFormModel = { code: '', groupId: null, hasSerialNumber: false, measure: 'шт.', name: '' }
const RefGoodsFormModal = ({ id, visible, close, handleAfterSubmit }: Props) => {
  const [model, setModel] = useState<GoodsFormModel>(DefaultFormModel)
  const [errors, setErrors] = useState<any>({})

  const formQuery = useGoodsFormQuery(id, false)
  const saveMutation = useGoodsSaveMutation(id)
  const goodsGroupOptionsQuery = useGoodsGroupOptionsQuery(true)

  useEffect(() => {
    if (id) {
      formQuery.refetch()
        .then(({ data }) => setModel(data || DefaultFormModel))
    } else {
      setModel(DefaultFormModel)
    }

    return () => {
      setErrors({})
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
    title={id ? 'Редактирование товара' : 'Добавление товара'}
    handleSubmit={submitForm}
    saving={saveMutation.isLoading}>
    {formQuery.isLoading
      ? <CustomSpinner />
      : <RefGoodsForm
        model={model}
        handleChange={handleChange}
        errors={errors}
        groupOptions={goodsGroupOptionsQuery.data || []}
      />}
  </FormModal>
}

export default RefGoodsFormModal