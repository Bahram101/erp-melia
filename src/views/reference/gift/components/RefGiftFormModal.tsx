import { useGiftFormQuery, useGiftSaveMutation } from '../../../../hooks/reference/refGiftQueries'
import { useEffect, useState } from 'react'
import { GiftFormModel } from '../../../../models/reference/RefModels'
import FormModal from '../../../../components/FormModal'
import RefGiftForm from './RefGiftForm'
import { useGoodsOptionsQuery } from '../../../../hooks/reference/refOptionsQueries'
import { parseResponseFormErrors } from '../../../../utils/ErrorUtil'
import CustomSpinner from '../../../../components/spinner/CustomSpinner'

const DefaultModel: GiftFormModel = { goodsId: null, name: '', price: 0 }
type Props = {
  id: string | undefined
  visible: boolean
  close: () => void
  handleAfterSubmit: () => void
}
const RefGiftFormModal = ({ id, visible, close, handleAfterSubmit }: Props) => {
  const [model, setModel] = useState<GiftFormModel>(DefaultModel)
  const [errors, setErrors] = useState<any>({})

  const formQuery = useGiftFormQuery(id, false)
  const saveMutation = useGiftSaveMutation(id)

  const goodsOptionsQuery = useGoodsOptionsQuery({ hasSerial: false }, true)

  useEffect(() => {
    if (id) {
      formQuery.refetch()
        .then(({ data }) => setModel(data || DefaultModel))
    } else {
      setModel(DefaultModel)
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
    title={id ? 'Редактирование подарка' : 'Добавление подарка'}
    handleSubmit={submitForm}
    saving={saveMutation.isLoading}>
    {formQuery.isLoading
      ? <CustomSpinner />
      : <RefGiftForm
        model={model}
        goodsOptions={goodsOptionsQuery.data || []}
        handleChange={handleChange}
        errors={errors}
      />}
  </FormModal>
}

export default RefGiftFormModal