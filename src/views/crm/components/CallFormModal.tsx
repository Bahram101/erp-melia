import { useEffect, useState } from 'react'
import { CallFormModel, DefaultCallFormModel } from '../../../models/crm/CallModels'
import FormModal from '../../../components/FormModal'
import CallForm from './CallForm'
import { useCallFormPatchMutation, useCallFormQuery } from '../../../hooks/crm/callQueries'
import { getCashDocUriPathFromDoctype } from '../../../utils/UrlHelper'
import { parseResponseFormErrors } from '../../../utils/ErrorUtil'

type Props = {
  callId: string | undefined
  visible: boolean
  onClose: () => void
  handleAfterSubmit: () => void
}
const CallFormModal = ({ visible, onClose, callId, handleAfterSubmit }: Props) => {
  const [model, setModel] = useState<CallFormModel>(DefaultCallFormModel)
  const [errors, setErrors] = useState<any>({})
  const callFormQuery = useCallFormQuery(callId, false)
  const patchMutation = useCallFormPatchMutation(callId)

  useEffect(() => {
    if (callId) {
      callFormQuery.refetch()
        .then(({ data }) => {
          setModel(data || DefaultCallFormModel)
        })
    } else {
      setModel(DefaultCallFormModel)
    }
  }, [callId])

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setModel({ ...model, [name]: value })
    setErrors({ ...errors, [name]: null })
  }

  const handleSubmit = () => {
    patchMutation
      .mutateAsync({ form: model })
      .then(() => {
        handleAfterSubmit()
      })
      .catch((error) => {
        setErrors(parseResponseFormErrors(error))
      })
  }

  return <FormModal
    visibleFormModal={visible}
    onClose={onClose}
    title={'Добавление звонка'}
    handleSubmit={handleSubmit}
    saving={patchMutation.isLoading}
  >
    <CallForm
      handleChange={handleChange}
      model={model}
      errors={errors}
    />
  </FormModal>
}

export default CallFormModal