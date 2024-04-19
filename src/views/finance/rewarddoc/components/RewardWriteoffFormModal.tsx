import { CCol, CRow } from '@coreui/react-pro'
import { useRewardDocHandleActionQuery } from '../../../../hooks/finance/financeQueries'
import { RewardDocDetailedModel } from '../../../../models/finance/FinModels'
import { DocAction, RefOptionsModel } from '../../../../models/CommonModels'
import React, { useState } from 'react'
import { parseResponseError, parseResponseFormErrors } from '../../../../utils/ErrorUtil'
import { toast } from 'react-toastify'
import { DatePickerField } from '../../../../components/fields/DatePickerField'
import FormModal from '../../../../components/FormModal'
import { RefOptionsField } from '../../../../components/fields/RefOptionsField'

type Props = {
  visible: boolean
  onClose: () => void
  handleAfterSubmit: () => void
  docId: string
  cashOptions: RefOptionsModel[]
}
const RewardWriteoffFormModal = ({ visible, onClose, handleAfterSubmit, docId, cashOptions }: Props) => {
  const [model, setModel] = useState<{
    docDate: string
    fromCashId: string | null
  }>({
    docDate: '',
    fromCashId: null,
  })
  const [errors, setErrors] = useState<any>({})

  const handleActionQuery = useRewardDocHandleActionQuery()

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setModel({ ...model, [name]: value })
    setErrors({ ...errors, [name]: null })
  }
  const handleSubmit = () => {
    handleActionQuery.mutateAsync({
      form: {
        docId: docId,
        action: DocAction.WRITEOFF,
        addData: model,
      },
    })
      .then(() => {
        handleAfterSubmit()
      })
      .catch((error) => {
        const errorMsg = parseResponseError(error)
        if (errorMsg) {
          toast.error(errorMsg)
        }
        setErrors(parseResponseFormErrors(error))
      })
  }

  if (!docId) {
    return null
  }

  return <FormModal
    visibleFormModal={visible}
    onClose={onClose}
    title={'Списание из кассы'}
    handleSubmit={handleSubmit}
    saving={handleActionQuery.isLoading}>
    <CRow className="mb-3">
      <CCol md={4}>
        <RefOptionsField
          label={'Из кассы'}
          options={cashOptions}
          handleChange={handleChange}
          fieldName={'fromCashId'}
          value={model.fromCashId}
          error={errors.fromCashId}
        />
      </CCol>
      <CCol md={4}>
        <DatePickerField
          label={'Дата списания'}
          placeholder="Дата списания"
          fieldName={'docDate'}
          handleChange={handleChange}
          value={model.docDate}
          error={errors.docDate}
        />
      </CCol>
    </CRow>
  </FormModal>
}

export default RewardWriteoffFormModal