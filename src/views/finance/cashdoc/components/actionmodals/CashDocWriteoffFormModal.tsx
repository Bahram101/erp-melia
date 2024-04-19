import FormModal from '../../../../../components/FormModal'
import { CCol, CRow } from '@coreui/react-pro'
import { DatePickerField } from '../../../../../components/fields/DatePickerField'
import { useCashDocHandleActionQuery } from '../../../../../hooks/finance/financeQueries'
import { useEffect, useState } from 'react'
import { DocAction } from '../../../../../models/CommonModels'
import { RefOptionsField } from '../../../../../components/fields/RefOptionsField'
import { parseResponseError, parseResponseFormErrors } from '../../../../../utils/ErrorUtil'
import { toast } from 'react-toastify'
import { useCashOptionsQuery } from '../../../../../hooks/reference/refOptionsQueries'

type Props = {
  visible: boolean
  onClose: () => void
  handleAfterSubmit: () => void
  docId: string
}
const CashDocWriteoffFormModal = ({ visible, onClose, handleAfterSubmit, docId }: Props) => {
  const [model, setModel] = useState<{
    docDate: string
    fromCashId: string | null
  }>({
    docDate: '',
    fromCashId: null,
  })
  const [errors, setErrors] = useState<any>({})

  const cashOptionsQuery = useCashOptionsQuery({}, true)

  useEffect(() => {
    return () => {
      setErrors({})
      setModel({ docDate: '', fromCashId: null })
    }
  }, [])
  const handleActionQuery = useCashDocHandleActionQuery()
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

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setModel({ ...model, [name]: value })
    setErrors({ ...errors, [name]: null })
  }

  if (!docId) {
    return null
  }

  return <FormModal
    visibleFormModal={visible}
    onClose={onClose}
    title={'Списание денег из кассы'}
    handleSubmit={handleSubmit}
    saving={handleActionQuery.isLoading}>
    <CRow className="mb-3">
      <CCol md={5}>
        <RefOptionsField
          label={'Из кассы'}
          options={cashOptionsQuery.data || []}
          handleChange={handleChange}
          fieldName={'fromCashId'}
          value={model.fromCashId}
          error={errors.fromCashId}
        />
      </CCol>
      <CCol md={5}>
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

export default CashDocWriteoffFormModal